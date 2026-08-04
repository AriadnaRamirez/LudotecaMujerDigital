# Guía de esquema JSON — restricciones por entrada

Contrato de datos para cada objeto de `src/data/resources.json`.  
Aunque la fuente siga siendo un archivo JSON (sin base de datos), **cada entrada se trata como si viniera de un backend real**: tipos fijos, longitudes máximas, enums cerrados y URLs válidas.

Documentos relacionados:

- Plantilla: [`src/data/resource-template.json`](./src/data/resource-template.json)
- Esquema máquina: [`src/data/resource-schema.json`](./src/data/resource-schema.json)
- Guía práctica para participantes: [`COMO-ENVIAR-TU-JSON.md`](./COMO-ENVIAR-TU-JSON.md)

Validación automática:

```bash
npm run validate:data
```

---

## 1. Reglas globales (colección)

1. El archivo raíz debe ser un **array JSON** de objetos.
2. Cada participante registra **exactamente una** entrada.
3. `id` debe ser único en todo el archivo.
4. `contributorName` debe ser único (sin importar mayúsculas ni acentos).
5. No se permiten propiedades desconocidas (solo las del esquema).
6. No se permiten valores `null`. Usa string vacío solo donde el esquema lo permita (hoy: ningún campo obligatorio vacío).
7. Codificación UTF-8, comillas dobles, sin comentarios JSON.
8. Textos personales: escritos por la autora, sin IA generativa.

---

## 2. Campos obligatorios y límites

| Campo | Tipo | Mín | Máx | Notas |
| --- | --- | ---: | ---: | --- |
| `id` | string | 3 | 80 | Solo `a-z`, `0-9` y guiones. Sin espacios ni mayúsculas. |
| `title` | string | 5 | 120 | Nombre oficial del recurso. |
| `description` | string | 40 | 400 | Resumen propio, 2–4 oraciones. |
| `contributorName` | string | 5 | 80 | Nombre completo visible. |
| `discoveryContext` | string | 30 | 500 | ¿Cómo lo descubriste? |
| `impactReflection` | string | 30 | 500 | Impacto personal/profesional. |
| `recommendationReason` | string | 30 | 500 | Por qué lo recomiendas. |
| `image` | string (URL HTTPS) | 12 | 500 | **Obligatoria. Debe ser URL https pública.** |
| `platform` | string (enum) | — | 60 | Una de las plataformas permitidas. |
| `topic` | string (enum) | — | — | Una de las áreas permitidas. |
| `type` | string (enum) | — | — | Uno de los formatos permitidos. |
| `difficulty` | string (enum) | — | — | Exactamente una opción. |
| `duration` | number (entero) | 15 | 360 | Minutos. Debe coincidir con `durationOptions`. |
| `durationLabel` | string (enum pareja) | — | 20 | Debe emparejar con `duration`. |
| `language` | string (enum) | — | — | `Español` o `Inglés`. |
| `price` | string (enum) | — | — | `Gratis` o `Pago`. |
| `certificate` | boolean | — | — | `true` o `false` **sin comillas**. |
| `tags` | string[] | 2 ítems | 5 ítems | Cada tag: 2–30 caracteres. |
| `url` | string (URL HTTPS) | 12 | 500 | Enlace directo al recurso. |

### Campos opcionales

| Campo | Tipo | Mín | Máx | Notas |
| --- | --- | ---: | ---: | --- |
| `author` | string | 2 | 80 | Autora/creador del recurso. |
| `publishedAt` | string fecha | — | — | Formato `YYYY-MM-DD`. |
| `updatedAt` | string fecha | — | — | Formato `YYYY-MM-DD`. Si ambos existen, `updatedAt >= publishedAt`. |

---

## 3. `id` — identificador

**Patrón obligatorio:**

```text
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

**Reglas:**

- Minúsculas solamente.
- Separar palabras con `-`.
- Recomendado: `nombre-apellido-tema-corto`.
- No terminar ni empezar con guion.
- No usar caracteres especiales (`_`, `.`, `#`, espacios).

**Ejemplos válidos**

```text
ana-ruiz-tecnica-pomodoro
maria-lopez-notion-estudio
```

**Ejemplos inválidos**

```text
Ana_Ruiz
ana ruiz
-ana-
ANA-RUIZ
```

---

## 4. Duración — opciones cerradas (array oficial)

`duration` y `durationLabel` **siempre viajan juntos**. Elige **una fila** de esta tabla:

| hours | duration (minutos) | durationLabel |
| ---: | ---: | --- |
| 0.25 | 15 | `15 min` |
| 0.5 | 30 | `30 min` |
| 0.75 | 45 | `45 min` |
| 1 | 60 | `1 h` |
| 1.5 | 90 | `1.5 h` |
| 2 | 120 | `2 h` |
| 2.5 | 150 | `2.5 h` |
| 3 | 180 | `3 h` |
| 4 | 240 | `4 h` |
| 5 | 300 | `5 h` |
| 6 | 360 | `6 h` |

**Array listo para copiar:**

```json
[
  { "hours": 0.25, "duration": 15, "durationLabel": "15 min" },
  { "hours": 0.5, "duration": 30, "durationLabel": "30 min" },
  { "hours": 0.75, "duration": 45, "durationLabel": "45 min" },
  { "hours": 1, "duration": 60, "durationLabel": "1 h" },
  { "hours": 1.5, "duration": 90, "durationLabel": "1.5 h" },
  { "hours": 2, "duration": 120, "durationLabel": "2 h" },
  { "hours": 2.5, "duration": 150, "durationLabel": "2.5 h" },
  { "hours": 3, "duration": 180, "durationLabel": "3 h" },
  { "hours": 4, "duration": 240, "durationLabel": "4 h" },
  { "hours": 5, "duration": 300, "durationLabel": "5 h" },
  { "hours": 6, "duration": 360, "durationLabel": "6 h" }
]
```

**Prohibido:**

- `duration: 35` con label inventado.
- `durationLabel: "1 hora"` (usar `1 h`).
- `duration: "60"` (debe ser número, no string).
- Duraciones fuera de 15–360 minutos o no listadas.

Si el recurso dura, por ejemplo, 70 minutos, redondea a la opción más cercana (`1 h` o `1.5 h`) y explícalo en la descripción si hace falta.

---

## 5. Enums cerrados

### `difficulty`

```json
["Principiante", "Intermedio", "Avanzado"]
```

### `language`

```json
["Español", "Inglés"]
```

### `price`

```json
["Gratis", "Pago"]
```

### `certificate`

```json
[true, false]
```

Sin comillas. Correcto: `"certificate": false`. Incorrecto: `"certificate": "false"`.

### `topic`

```json
[
  "Organización y técnicas de estudio",
  "Bienestar emocional",
  "Finanzas personales",
  "Aprendizaje de idiomas",
  "Creatividad y diseño gráfico",
  "Productividad",
  "Habilidades de comunicación",
  "Tecnología avanzada",
  "Desarrollo de hábitos",
  "Ciberseguridad",
  "Redes",
  "Linux",
  "Cloud",
  "Python",
  "IA",
  "Soft Skills",
  "Empleabilidad",
  "Desarrollo Web"
]
```

Copia el valor **exacto** (mayúsculas, tildes y espacios).

### `type`

```json
[
  "Libro",
  "Podcast",
  "Canal de YouTube",
  "Curso",
  "Comunidad",
  "Blog",
  "Herramienta digital",
  "Aplicación",
  "Plantilla",
  "PDF",
  "Laboratorio",
  "Video",
  "Artículo",
  "Cheat Sheet"
]
```

### `platform`

```json
[
  "YouTube",
  "Coursera",
  "Cisco",
  "TryHackMe",
  "Hack The Box",
  "AWS Skill Builder",
  "Microsoft Learn",
  "Google",
  "Udemy",
  "edX",
  "LinkedIn Learning",
  "Spotify",
  "Notion",
  "Medium",
  "GitHub",
  "Otro"
]
```

Si tu plataforma no está, usa `"Otro"` y nómbrala en `description` o `author`.

---

## 6. Imagen (`image`) — solo URL HTTPS

La imagen **no puede** ir vacía, ni en base64, ni como archivo local.

**Reglas:**

1. Protocolo obligatorio: `https:`
2. Prohibido: `http:`, `data:`, `blob:`, `file:`
3. Hosts prohibidos: `example.com`, `localhost`, `127.0.0.1`
4. Debe terminar en extensión de imagen **o** venir de un host de imágenes conocido:

**Extensiones permitidas**

```json
[".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]
```

**Hosts permitidos sin extensión en la URL**

```json
[
  "images.unsplash.com",
  "i.ytimg.com",
  "img.youtube.com",
  "raw.githubusercontent.com",
  "cdn.jsdelivr.net"
]
```

**Ejemplos válidos**

```json
"image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200"
```

```json
"image": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg"
```

```json
"image": "https://cdn.ejemplo.org/portadas/recurso.png"
```

**Ejemplos inválidos**

```json
"image": ""
```

```json
"image": "data:image/svg+xml;base64,...."
```

```json
"image": "./foto.png"
```

```json
"image": "http://mi-sitio.com/foto.png"
```

Recomendación de tamaño visual: proporción cercana a **16:9**, al menos 640×360.

---

## 7. URL del recurso (`url`)

1. Solo `https:`
2. Debe abrir sin login corporativo ni permisos especiales.
3. Prohibido `example.com` y subdominios.
4. Máximo 500 caracteres.
5. Idealmente única en el catálogo.

---

## 8. Tags

```json
"tags": ["productividad", "enfoque", "estudio"]
```

| Regla | Valor |
| --- | --- |
| Cantidad | 2 a 5 |
| Longitud por tag | 2 a 30 |
| Formato | minúsculas recomendadas; sin `#` |
| Espacios | preferible una sola palabra o `kebab-case` |
| Duplicados | no repetir el mismo tag |

---

## 9. Fechas

Formato estricto:

```text
YYYY-MM-DD
```

Ejemplos: `2024-01-15`, `2025-06-01`.

Si envías ambas:

- `updatedAt` debe ser igual o posterior a `publishedAt`.

---

## 10. Respuestas personales (texto libre con límites)

| Campo | Mín | Máx | Qué responde |
| --- | ---: | ---: | --- |
| `discoveryContext` | 30 | 500 | Cómo lo descubriste |
| `impactReflection` | 30 | 500 | Impacto en tu desarrollo |
| `recommendationReason` | 30 | 500 | Por qué lo recomiendas |

Reglas de contenido:

- Primera persona, experiencia real.
- Sin pegar párrafos generados por IA.
- Sin datos sensibles de terceros (teléfonos, correos privados, contraseñas).
- Sin insultos ni contenido ofensivo.

---

## 11. Objeto de ejemplo válido (referencia backend)

```json
{
  "id": "ana-ruiz-tecnica-pomodoro",
  "title": "La técnica Pomodoro explicada",
  "description": "Video corto que explica cómo estudiar o trabajar en bloques de 25 minutos con descansos. Útil para mantener el foco sin agotarse.",
  "contributorName": "Ana Ruiz Hernández",
  "discoveryContext": "Lo conocí cuando una mentora del bootcamp lo recomendó para organizar las sesiones de estudio semanales.",
  "impactReflection": "Me ayudó a mantener el foco en tareas largas y a reducir la procrastinación cuando preparaba proyectos.",
  "recommendationReason": "Es simple, gratis y sirve tanto para estudiar como para trabajo remoto. Ideal si sientes que el tiempo se te va.",
  "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200",
  "platform": "YouTube",
  "topic": "Productividad",
  "type": "Video",
  "difficulty": "Principiante",
  "duration": 30,
  "durationLabel": "30 min",
  "language": "Español",
  "price": "Gratis",
  "certificate": false,
  "tags": ["productividad", "enfoque", "estudio"],
  "url": "https://www.youtube.com/watch?v=ejemplo",
  "author": "Canal Ejemplo",
  "publishedAt": "2023-05-10",
  "updatedAt": "2024-11-02"
}
```

---

## 12. Errores que el “backend” rechazaría

| Código conceptual | Causa |
| --- | --- |
| `REQUIRED_FIELD` | Falta un campo obligatorio o está en blanco |
| `MAX_LENGTH` | Texto supera el máximo de caracteres |
| `MIN_LENGTH` | Texto no alcanza el mínimo |
| `INVALID_ENUM` | Valor fuera de la lista permitida |
| `INVALID_DURATION_PAIR` | `duration` y `durationLabel` no coinciden con el catálogo |
| `INVALID_IMAGE_URL` | Imagen vacía, `data:`, `http:` o sin extensión/host válido |
| `INVALID_RESOURCE_URL` | URL inválida, no https o `example.com` |
| `INVALID_ID_FORMAT` | `id` con mayúsculas, espacios o símbolos |
| `DUPLICATE_ID` | Ya existe ese `id` |
| `DUPLICATE_CONTRIBUTOR` | Ya existe esa participante |
| `INVALID_BOOLEAN` | `certificate` no es boolean real |
| `INVALID_DATE` | Fecha fuera de `YYYY-MM-DD` |
| `UNKNOWN_PROPERTY` | Campo no declarado en el esquema |

---

## 13. Checklist de aceptación (equipo de revisión)

Antes de integrar una entrada en `resources.json`:

- [ ] JSON parsea sin errores
- [ ] Cumple mínimos/máximos de caracteres
- [ ] Enums exactos (topic, type, platform, difficulty, language, price)
- [ ] Par `duration` + `durationLabel` del catálogo
- [ ] `image` es URL `https` pública y carga en el navegador
- [ ] `url` abre en ventana privada
- [ ] Tags: 2–5, sin `#`
- [ ] `id` y `contributorName` únicos
- [ ] Textos personales auténticos
- [ ] `npm run validate:data` termina sin errores

---

## 14. Mantenimiento futuro

1. Si se agrega un nuevo `topic`, `type`, `platform` o duración, actualiza **a la vez**:
   - `src/data/resource-schema.json`
   - esta guía
   - `COMO-ENVIAR-TU-JSON.md`
   - `scripts/validate-resources.mjs` / `src/utils/constants.ts`
2. No aflojes límites “por una excepción”: ajusta el esquema y documenta el cambio.
3. El JSON permanece como fuente de verdad hasta que exista una API; el esquema ya define el contrato.
