# Cómo enviar tu aportación en JSON

Guía para las participantes de **Ludoteca Mujer Digital**.  
Cada una comparte **un solo recurso** completando un objeto JSON. No necesitas saber programar: copia la plantilla, rellénala y envíasela a la líder del equipo.

## 1. Qué vas a entregar

Un archivo (o un mensaje) con **un objeto JSON** como este. Es la ficha de tu recurso.

Usa la plantilla lista en:

`src/data/resource-template.json`

## 2. Plantilla para copiar

Copia esto en un bloc de notas (Notepad, Notes, Google Docs, Word, etc.) y completa los espacios:

```json
{
  "id": "tu-nombre-corto-del-recurso",
  "title": "Nombre oficial del recurso",
  "description": "Breve descripción con tus palabras (2 a 4 oraciones).",
  "contributorName": "Tu nombre completo",
  "discoveryContext": "¿Cómo lo descubriste?",
  "impactReflection": "¿Cómo contribuyó —o habría contribuido— a tu desarrollo personal o profesional?",
  "recommendationReason": "¿Por qué lo recomendarías a otra participante de Mujer Digital?",
  "image": "",
  "platform": "YouTube",
  "topic": "Productividad",
  "type": "Curso",
  "difficulty": "Principiante",
  "duration": 45,
  "durationLabel": "45 min",
  "language": "Español",
  "price": "Gratis",
  "certificate": false,
  "tags": ["productividad", "organización"],
  "url": "https://enlace-real-del-recurso.com",
  "author": "Nombre de quien creó el recurso",
  "publishedAt": "2024-01-15",
  "updatedAt": "2025-06-01"
}
```

## 3. Qué significa cada campo

### Obligatorios (no pueden quedar vacíos)

| Campo | Qué poner |
| --- | --- |
| `id` | Identificador único, en minúsculas y con guiones. Ejemplo: `maria-lopez-notion-para-estudiar` |
| `title` | Nombre oficial del recurso |
| `description` | Resumen corto, escrito por ti |
| `contributorName` | Tu nombre completo (como quieres que aparezca en el sitio) |
| `discoveryContext` | Cómo lo encontraste (clase, amiga, búsqueda, comunidad, etc.) |
| `impactReflection` | Qué te aportó o te habría aportado |
| `recommendationReason` | Por qué se lo recomendarías a otra compañera |
| `url` | Enlace web directo y que abra sin pedir permisos especiales |
| `platform` | Dónde está (YouTube, Coursera, Notion, Spotify, etc.) |
| `topic` | Área o tema (ver lista abajo) |
| `type` | Formato (ver lista abajo) |
| `difficulty` | Solo una opción: `Principiante`, `Intermedio` o `Avanzado` |
| `duration` | Duración en **minutos** (número). Ejemplo: 90 |
| `durationLabel` | Texto legible. Ejemplos: `15 min`, `1 h 30 min`, `3 h` |
| `language` | Solo: `Español` o `Inglés` |
| `price` | Solo: `Gratis` o `Pago` |
| `certificate` | `true` si da certificado, `false` si no |
| `tags` | 2 a 4 palabras clave entre comillas, separadas por comas |

### Opcionales

| Campo | Qué poner |
| --- | --- |
| `image` | URL de una imagen del recurso. Si no tienes, déjalo `""` y la líder puede poner una |
| `author` | Autora o creador del recurso |
| `publishedAt` | Fecha de publicación en formato `AAAA-MM-DD` |
| `updatedAt` | Fecha de actualización en formato `AAAA-MM-DD` |

## 4. Valores sugeridos

### Formatos (`type`)

- Libro
- Podcast
- Canal de YouTube
- Curso
- Comunidad
- Blog
- Herramienta digital
- Aplicación
- Plantilla
- PDF
- Laboratorio
- Video

### Áreas (`topic`)

- Organización y técnicas de estudio
- Bienestar emocional
- Finanzas personales
- Aprendizaje de idiomas
- Creatividad y diseño gráfico
- Productividad
- Habilidades de comunicación
- Tecnología avanzada
- Desarrollo de hábitos
- Ciberseguridad
- Redes
- Linux
- Cloud
- Python
- IA
- Soft Skills
- Empleabilidad
- Desarrollo Web

Si tu recurso no encaja perfecto, elige el tema más cercano o usa uno claro y corto.

## 5. Ejemplo completo (de referencia)

```json
{
  "id": "ana-ruiz-pomodoro-technique",
  "title": "La técnica Pomodoro explicada",
  "description": "Video corto que explica cómo estudiar o trabajar en bloques de 25 minutos con descansos. Me ayudó a concentrarme sin agotarme.",
  "contributorName": "Ana Ruiz Hernández",
  "discoveryContext": "Lo conocí cuando una mentora del bootcamp lo recomendó para organizar las sesiones de estudio.",
  "impactReflection": "Me ayudó a mantener el foco en tareas largas y a reducir la procrastinación cuando preparaba proyectos.",
  "recommendationReason": "Es simple, gratis y sirve tanto para estudiar como para trabajo remoto. Ideal si sientes que el tiempo se te va.",
  "image": "",
  "platform": "YouTube",
  "topic": "Productividad",
  "type": "Video",
  "difficulty": "Principiante",
  "duration": 12,
  "durationLabel": "12 min",
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

## 6. Reglas importantes

1. **Una aportación por persona.** No envíes dos recursos.
2. **Escribe con tus propias palabras.** La convocatoria no permite usar IA para buscar el recurso, redactar la descripción ni inventar las respuestas personales.
3. **El enlace debe funcionar.** Ábrelo tú misma en una ventana privada antes de enviarlo.
4. **Usa comillas dobles** `"así"` en todos los textos del JSON.
5. **No borres comas ni llaves** `{ }` `[ ]`. Un JSON mal cerrado no se puede cargar.
6. **`true` / `false` van sin comillas.** Ejemplo: `"certificate": false`
7. **Los números tampoco llevan comillas.** Ejemplo: `"duration": 45`

## 7. Cómo enviarlo

Envía a la líder del equipo **una** de estas opciones:

1. El texto JSON pegado en WhatsApp, Discord, Slack o correo.
2. Un archivo llamado `tu-nombre.json` (por ejemplo `ana-ruiz.json`).

Incluye también:

- Tu nombre completo
- Confirmación de que abriste el enlace y funciona
- Confirmación de que las respuestas son tuyas

## 8. Checklist antes de mandarlo

- [ ] Completé todos los campos obligatorios
- [ ] Mi `contributorName` tiene nombre y apellido
- [ ] El `url` abre bien
- [ ] `difficulty` es Principiante, Intermedio o Avanzado
- [ ] `language` es Español o Inglés
- [ ] `price` es Gratis o Pago
- [ ] `certificate` es true o false
- [ ] `duration` está en minutos (número)
- [ ] Mis respuestas personales están escritas por mí
- [ ] Revisé ortografía

## 9. Errores comunes

| Error | Cómo evitarlo |
| --- | --- |
| Olvidar una coma entre campos | Revisa que cada línea (excepto la última del objeto) termine en `,` |
| Usar comillas simples `'texto'` | Usa siempre comillas dobles `"texto"` |
| Poner `certificate: "false"` | Debe ser `false` o `true` sin comillas |
| Dejar `url` vacío o inventado | Pon el enlace real del recurso |
| Copiar el mismo `id` que otra compañera | Usa un `id` con tu nombre + el recurso |

Cuando la líder reciba todos los JSON, los integrará en `src/data/resources.json` y el sitio mostrará la ludoteca completa.
