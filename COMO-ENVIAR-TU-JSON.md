# Cómo enviar tu aportación en JSON

Guía para las participantes de **Ludoteca Mujer Digital**.  
Cada una comparte **un solo recurso** completando un objeto JSON. No necesitas saber programar: copia la plantilla, rellénala y envíasela al **equipo de revisión**.

Para límites exactos (máximos de caracteres, enums, duraciones y URLs), lee también:

**[`GUIA-ESQUEMA-JSON.md`](./GUIA-ESQUEMA-JSON.md)**

## 1. Qué vas a entregar

Un archivo (o un mensaje) con **un objeto JSON**. Es la ficha de tu recurso.

Plantilla lista:

`src/data/resource-template.json`

## 2. Plantilla para copiar

```json
{
  "id": "tu-nombre-apellido-recurso",
  "title": "Nombre oficial del recurso",
  "description": "Breve descripción con tus palabras (entre 40 y 400 caracteres).",
  "contributorName": "Tu nombre completo",
  "discoveryContext": "¿Cómo lo descubriste? (mínimo 30 caracteres)",
  "impactReflection": "¿Cómo contribuyó —o habría contribuido— a tu desarrollo personal o profesional?",
  "recommendationReason": "¿Por qué lo recomendarías a otra participante de Mujer Digital?",
  "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
  "platform": "YouTube",
  "topic": "Productividad",
  "type": "Video",
  "difficulty": "Principiante",
  "duration": 30,
  "durationLabel": "30 min",
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

## 3. Resumen de campos

### Obligatorios

| Campo | Regla rápida |
| --- | --- |
| `id` | minúsculas + guiones, 3–80 caracteres |
| `title` | 5–120 caracteres |
| `description` | 40–400 caracteres, con tus palabras |
| `contributorName` | nombre completo, 5–80 caracteres |
| `discoveryContext` | 30–500 caracteres |
| `impactReflection` | 30–500 caracteres |
| `recommendationReason` | 30–500 caracteres |
| `image` | **URL HTTPS pública** (no base64, no archivo local, no vacía) |
| `platform` | una opción de la lista |
| `topic` | una opción de la lista |
| `type` | una opción de la lista |
| `difficulty` | `Principiante`, `Intermedio` o `Avanzado` |
| `duration` + `durationLabel` | un par del catálogo de duraciones |
| `language` | `Español` o `Inglés` |
| `price` | `Gratis` o `Pago` |
| `certificate` | `true` o `false` sin comillas |
| `tags` | 2 a 5 textos, cada uno 2–30 caracteres |
| `url` | enlace HTTPS directo y funcional |

### Opcionales

| Campo | Regla |
| --- | --- |
| `author` | 2–80 caracteres |
| `publishedAt` | `YYYY-MM-DD` |
| `updatedAt` | `YYYY-MM-DD` (igual o después de `publishedAt`) |

## 4. Duraciones permitidas (elige una)

| hours | duration | durationLabel |
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

Ejemplo de 0.5 horas:

```json
"duration": 30,
"durationLabel": "30 min"
```

Ejemplo de 1 hora:

```json
"duration": 60,
"durationLabel": "1 h"
```

Ejemplo de 3 horas:

```json
"duration": 180,
"durationLabel": "3 h"
```

## 5. Listas permitidas

### `type`

```json
["Libro", "Podcast", "Canal de YouTube", "Curso", "Comunidad", "Blog", "Herramienta digital", "Aplicación", "Plantilla", "PDF", "Laboratorio", "Video", "Artículo", "Cheat Sheet"]
```

### `topic`

```json
["Organización y técnicas de estudio", "Bienestar emocional", "Finanzas personales", "Aprendizaje de idiomas", "Creatividad y diseño gráfico", "Productividad", "Habilidades de comunicación", "Tecnología avanzada", "Desarrollo de hábitos", "Ciberseguridad", "Redes", "Linux", "Cloud", "Python", "IA", "Soft Skills", "Empleabilidad", "Desarrollo Web"]
```

### `platform`

```json
["YouTube", "Coursera", "Cisco", "TryHackMe", "Hack The Box", "AWS Skill Builder", "Microsoft Learn", "Google", "Udemy", "edX", "LinkedIn Learning", "Spotify", "Notion", "Medium", "GitHub", "Otro"]
```

## 6. Imagen: solo URL

Correcto:

```json
"image": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg"
```

Incorrecto:

```json
"image": ""
```

```json
"image": "data:image/png;base64,...."
```

```json
"image": "./mi-foto.png"
```

## 7. Reglas importantes

1. **Una aportación por persona.**
2. **Escribe con tus propias palabras** (sin IA para buscar/redactar las respuestas personales).
3. **El enlace y la imagen deben funcionar** al abrirlos en el navegador.
4. Usa comillas dobles `"así"`.
5. `true` / `false` y números van **sin comillas**.
6. No inventes valores fuera de las listas.

## 8. Cómo enviarlo

Envía al **equipo de revisión** una de estas opciones:

1. El texto JSON pegado en el canal del equipo (WhatsApp, Discord, Slack o correo).
2. Un archivo `tu-nombre.json` (ejemplo: `ana-ruiz.json`).

Incluye:

- Tu nombre completo
- Confirmación de que abriste el `url` y la `image`
- Confirmación de que las respuestas son tuyas

## 9. Checklist antes de mandarlo

- [ ] Completé todos los campos obligatorios
- [ ] Respeté mínimos y máximos de caracteres
- [ ] `image` es una URL `https://...`
- [ ] Elegí un par válido de duración
- [ ] `difficulty`, `language`, `price`, `topic`, `type` y `platform` están en las listas
- [ ] `certificate` es `true` o `false`
- [ ] Tengo entre 2 y 5 tags
- [ ] Mis respuestas personales están escritas por mí
- [ ] Revisé ortografía

Cuando el **equipo de revisión** reciba e integre los JSON en `src/data/resources.json`, el sitio mostrará la ludoteca completa.
