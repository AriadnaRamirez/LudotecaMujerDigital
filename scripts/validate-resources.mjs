import resources from "../src/data/resources.json" with { type: "json" };
import schema from "../src/data/resource-schema.json" with { type: "json" };

const {
  limits,
  enums,
  durationOptions,
  urlRules,
  dateRules,
  uniqueness,
} = schema;

const durationPairs = new Map(
  durationOptions.map((option) => [
    `${option.duration}::${option.durationLabel}`,
    option,
  ])
);

const errors = [];
const idCounts = new Map();
const contributorCounts = new Map();
const urlCounts = new Map();

function pushError(label, message) {
  errors.push(`${label}: ${message}`);
}

function normalizeKey(value) {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function checkTextField(label, resource, field) {
  const limit = limits[field];
  const value = resource[field];

  if (!isNonEmptyString(value)) {
    pushError(label, `falta ${field} (REQUIRED_FIELD).`);
    return;
  }

  const length = value.trim().length;
  if (limit?.minLength && length < limit.minLength) {
    pushError(
      label,
      `${field} tiene ${length} caracteres; mínimo ${limit.minLength} (MIN_LENGTH).`
    );
  }
  if (limit?.maxLength && length > limit.maxLength) {
    pushError(
      label,
      `${field} tiene ${length} caracteres; máximo ${limit.maxLength} (MAX_LENGTH).`
    );
  }
  if (limit?.pattern && !new RegExp(limit.pattern).test(value.trim())) {
    pushError(label, `${field} no cumple el formato requerido (INVALID_ID_FORMAT).`);
  }
}

function parseHttpsUrl(value, { allowHttp = false } = {}) {
  try {
    const url = new URL(value);
    const allowed = allowHttp ? ["http:", "https:"] : ["https:"];
    if (!allowed.includes(url.protocol)) return null;
    return url;
  } catch {
    return null;
  }
}

function hostForbidden(hostname, forbiddenHosts) {
  return forbiddenHosts.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`)
  );
}

function validateResourceUrl(label, value) {
  const rules = urlRules.resourceUrl;
  const url = parseHttpsUrl(value);
  if (!url) {
    pushError(label, "url debe ser HTTPS válida (INVALID_RESOURCE_URL).");
    return;
  }
  if (hostForbidden(url.hostname, rules.forbiddenHosts)) {
    pushError(label, "url usa un host prohibido (INVALID_RESOURCE_URL).");
  }
  if (value.length > limits.url.maxLength) {
    pushError(
      label,
      `url supera ${limits.url.maxLength} caracteres (MAX_LENGTH).`
    );
  }
}

function validateImageUrl(label, value) {
  const rules = urlRules.imageUrl;
  if (!isNonEmptyString(value)) {
    pushError(label, "image es obligatoria y debe ser URL HTTPS (INVALID_IMAGE_URL).");
    return;
  }
  if (rules.forbiddenSchemes.some((scheme) => value.trim().startsWith(scheme))) {
    pushError(
      label,
      "image no puede usar data:, blob: ni file: (INVALID_IMAGE_URL)."
    );
    return;
  }

  const url = parseHttpsUrl(value);
  if (!url) {
    pushError(label, "image debe ser una URL HTTPS pública (INVALID_IMAGE_URL).");
    return;
  }
  if (hostForbidden(url.hostname, rules.forbiddenHosts)) {
    pushError(label, "image usa un host prohibido (INVALID_IMAGE_URL).");
    return;
  }

  const pathname = url.pathname.toLowerCase();
  const hasExtension = rules.allowedExtensions.some((ext) =>
    pathname.endsWith(ext)
  );
  const knownHost = rules.allowKnownImageHostsWithoutExtension.includes(
    url.hostname
  );

  if (!hasExtension && !knownHost) {
    pushError(
      label,
      "image debe terminar en .jpg/.jpeg/.png/.webp/.gif/.svg o usar un host de imágenes permitido (INVALID_IMAGE_URL)."
    );
  }
  if (value.length > limits.image.maxLength) {
    pushError(
      label,
      `image supera ${limits.image.maxLength} caracteres (MAX_LENGTH).`
    );
  }
}

function validateDate(label, field, value) {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value !== "string" || !new RegExp(dateRules.pattern).test(value)) {
    pushError(label, `${field} debe usar formato YYYY-MM-DD (INVALID_DATE).`);
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    pushError(label, `${field} no es una fecha válida (INVALID_DATE).`);
    return false;
  }
  return true;
}

function validateTags(label, tags) {
  if (!Array.isArray(tags)) {
    pushError(label, "tags debe ser un array (REQUIRED_FIELD).");
    return;
  }
  if (
    tags.length < limits.tags.minItems ||
    tags.length > limits.tags.maxItems
  ) {
    pushError(
      label,
      `tags debe tener entre ${limits.tags.minItems} y ${limits.tags.maxItems} elementos.`
    );
  }

  const seen = new Set();
  for (const tag of tags) {
    if (!isNonEmptyString(tag)) {
      pushError(label, "cada tag debe ser texto no vacío.");
      continue;
    }
    const trimmed = tag.trim();
    if (trimmed.startsWith("#")) {
      pushError(label, `tag "${trimmed}" no debe incluir #.`);
    }
    if (
      trimmed.length < limits.tags.itemMinLength ||
      trimmed.length > limits.tags.itemMaxLength
    ) {
      pushError(
        label,
        `tag "${trimmed}" debe tener entre ${limits.tags.itemMinLength} y ${limits.tags.itemMaxLength} caracteres.`
      );
    }
    const key = normalizeKey(trimmed);
    if (seen.has(key)) {
      pushError(label, `tag duplicado "${trimmed}".`);
    }
    seen.add(key);
  }
}

function validateUnknownKeys(label, resource) {
  const allowed = new Set([
    ...schema.required,
    "author",
    "publishedAt",
    "updatedAt",
  ]);
  for (const key of Object.keys(resource)) {
    if (!allowed.has(key)) {
      pushError(label, `propiedad desconocida "${key}" (UNKNOWN_PROPERTY).`);
    }
  }
}

if (!Array.isArray(resources)) {
  console.error("resources.json debe ser un array de objetos.");
  process.exit(1);
}

for (const [index, resource] of resources.entries()) {
  const label = resource?.title || resource?.id || `registro ${index + 1}`;

  if (!resource || typeof resource !== "object" || Array.isArray(resource)) {
    pushError(label, "la entrada debe ser un objeto JSON.");
    continue;
  }

  validateUnknownKeys(label, resource);

  for (const field of [
    "id",
    "title",
    "description",
    "contributorName",
    "discoveryContext",
    "impactReflection",
    "recommendationReason",
    "platform",
  ]) {
    checkTextField(label, resource, field);
  }

  if (isNonEmptyString(resource.id)) {
    const key = resource.id.trim();
    idCounts.set(key, (idCounts.get(key) ?? 0) + 1);
  }

  if (isNonEmptyString(resource.contributorName)) {
    const key = normalizeKey(resource.contributorName.trim());
    const current = contributorCounts.get(key);
    contributorCounts.set(key, {
      name: resource.contributorName.trim(),
      count: (current?.count ?? 0) + 1,
    });
  }

  if (!enums.difficulty.includes(resource.difficulty)) {
    pushError(label, `difficulty inválida (INVALID_ENUM).`);
  }
  if (!enums.language.includes(resource.language)) {
    pushError(label, `language inválido (INVALID_ENUM).`);
  }
  if (!enums.price.includes(resource.price)) {
    pushError(label, `price inválido (INVALID_ENUM).`);
  }
  if (!enums.topic.includes(resource.topic)) {
    pushError(label, `topic inválido (INVALID_ENUM).`);
  }
  if (!enums.type.includes(resource.type)) {
    pushError(label, `type inválido (INVALID_ENUM).`);
  }
  if (!enums.platform.includes(resource.platform)) {
    pushError(label, `platform inválida (INVALID_ENUM).`);
  }
  if (typeof resource.certificate !== "boolean") {
    pushError(label, "certificate debe ser true o false (INVALID_BOOLEAN).");
  }

  const pairKey = `${resource.duration}::${resource.durationLabel}`;
  if (!durationPairs.has(pairKey)) {
    pushError(
      label,
      `duration/durationLabel fuera del catálogo (INVALID_DURATION_PAIR). Usa una opción de GUIA-ESQUEMA-JSON.md.`
    );
  }

  validateImageUrl(label, resource.image);
  validateResourceUrl(label, resource.url);
  validateTags(label, resource.tags);

  if (isNonEmptyString(resource.url)) {
    const key = resource.url.trim();
    urlCounts.set(key, (urlCounts.get(key) ?? 0) + 1);
  }

  if (resource.author !== undefined && resource.author !== "") {
    checkTextField(label, { author: resource.author }, "author");
  }

  const publishedOk = validateDate(label, "publishedAt", resource.publishedAt);
  const updatedOk = validateDate(label, "updatedAt", resource.updatedAt);
  if (
    publishedOk &&
    updatedOk &&
    isNonEmptyString(resource.publishedAt) &&
    isNonEmptyString(resource.updatedAt) &&
    resource.updatedAt < resource.publishedAt
  ) {
    pushError(
      label,
      "updatedAt no puede ser anterior a publishedAt (INVALID_DATE)."
    );
  }
}

if (uniqueness.id === "global") {
  for (const [id, count] of idCounts.entries()) {
    if (count > 1) {
      pushError(id, `id duplicado (${count}) (DUPLICATE_ID).`);
    }
  }
}

for (const { name, count } of contributorCounts.values()) {
  if (count > 1) {
    pushError(
      name,
      `aparece en ${count} aportaciones (DUPLICATE_CONTRIBUTOR).`
    );
  }
}

if (uniqueness.url === "recommended-unique") {
  for (const [url, count] of urlCounts.entries()) {
    if (count > 1) {
      pushError(url, `url repetida en ${count} entradas (recomendado única).`);
    }
  }
}

const expectedParticipants = Number(process.env.EXPECTED_PARTICIPANTS);
if (
  Number.isInteger(expectedParticipants) &&
  expectedParticipants > 0 &&
  resources.length !== expectedParticipants
) {
  errors.push(
    `Hay ${resources.length} aportaciones, pero EXPECTED_PARTICIPANTS=${expectedParticipants}.`
  );
}

console.log(`Aportaciones revisadas: ${resources.length}`);
console.log(`Esquema: src/data/resource-schema.json`);

if (errors.length > 0) {
  console.error(`\nSe encontraron ${errors.length} problemas:\n`);
  errors.forEach((error) => console.error(`- ${error}`));
  console.error(
    "\nConsulta GUIA-ESQUEMA-JSON.md. La validación automática no sustituye la revisión humana de autenticidad."
  );
  process.exitCode = 1;
} else {
  console.log("Validación estructural correcta.");
  console.log(
    "Siguiente paso: el equipo de revisión abre cada enlace e imagen y confirma textos auténticos."
  );
}
