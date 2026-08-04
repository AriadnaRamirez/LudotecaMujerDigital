import resources from "../src/data/resources.json" with { type: "json" };

const requiredTextFields = [
  ["title", "nombre del recurso"],
  ["contributorName", "nombre completo de la participante"],
  ["discoveryContext", "cómo lo descubrió"],
  ["impactReflection", "impacto personal o profesional"],
  ["recommendationReason", "razón para recomendarlo"],
];

function hasDirectLink(value) {
  try {
    const url = new URL(value);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      url.hostname !== "example.com" &&
      !url.hostname.endsWith(".example.com")
    );
  } catch {
    return false;
  }
}

const errors = [];
const contributorCounts = new Map();

for (const [index, resource] of resources.entries()) {
  const label = resource.title || resource.id || `registro ${index + 1}`;

  for (const [field, description] of requiredTextFields) {
    if (!resource[field]?.trim()) {
      errors.push(`${label}: falta ${description} (${field}).`);
    }
  }

  if (!hasDirectLink(resource.url)) {
    errors.push(`${label}: el enlace no es directo o todavía usa example.com.`);
  }

  const contributor = resource.contributorName?.trim();
  if (contributor) {
    const key = contributor
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    contributorCounts.set(key, {
      name: contributor,
      count: (contributorCounts.get(key)?.count ?? 0) + 1,
    });
  }
}

for (const { name, count } of contributorCounts.values()) {
  if (count > 1) {
    errors.push(
      `${name}: aparece en ${count} aportaciones; la convocatoria permite exactamente una.`
    );
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

if (errors.length > 0) {
  console.error(`\nSe encontraron ${errors.length} problemas:\n`);
  errors.forEach((error) => console.error(`- ${error}`));
  console.error(
    "\nLa validación estructural no sustituye la revisión humana de enlaces ni de la autenticidad de los textos."
  );
  process.exitCode = 1;
} else {
  console.log("Validación estructural correcta.");
  console.log(
    "Siguiente paso: abrir cada enlace y confirmar que los textos sean auténticos y propios."
  );
}
