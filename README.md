# Tech Resource Hub (Ludoteca Digital)

Sitio web para organizar y consultar las aportaciones colectivas de la comunidad Mujer Digital mediante búsqueda, filtros y páginas de detalle.

## Guías para el equipo

| Documento | Para quién | Contenido |
| --- | --- | --- |
| [`COMO-ENVIAR-TU-JSON.md`](./COMO-ENVIAR-TU-JSON.md) | Participantes | Cómo armar y enviar su JSON al equipo de revisión |
| [`GUIA-ESQUEMA-JSON.md`](./GUIA-ESQUEMA-JSON.md) | Todo el equipo | Restricciones tipo backend: máximos, enums, duraciones, URLs |
| [`CONVOCATORIA.md`](./CONVOCATORIA.md) | Entrega final | Checklist de la convocatoria |

Esquema máquina: [`src/data/resource-schema.json`](./src/data/resource-schema.json)  
Plantilla: [`src/data/resource-template.json`](./src/data/resource-template.json)

## Funcionalidades

- **Búsqueda** por título, plataforma, área, etiquetas, autor y participante, sin distinguir mayúsculas/minúsculas ni acentos.
- **Filtros combinables**: tiempo, nivel, tema, tipo, plataforma, idioma, precio y certificado, con opción de limpiar todos los filtros.
- **Ordenamiento**: más recientes, más antiguos, menor/mayor duración, nivel, nombre A-Z/Z-A.
- **Tarjetas de recurso** alimentadas por el JSON: muestran imagen, id, título, descripción, participante, autor, plataforma, tema, tipo, nivel, duración, idioma, precio, certificado, etiquetas, fechas, respuestas personales, URL y acciones.
- **Página de detalle** con la aportación completa, todos los campos del esquema y recursos relacionados.
- **Compartir** mediante la Web Share API, con fallback a copiar el enlace al portapapeles y confirmación visual.
- **Contador de resultados** ("X recursos encontrados" y "Mostrando N de M recursos").
- **Estado vacío** y **estados de carga** (skeleton cards).
- **Responsive** (desktop, tablet, mobile) y **accesible** (navegación por teclado, ARIA, foco visible, contraste adecuado).

## Tecnologías

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- JSON como fuente de datos (`src/data/resources.json`)

## Estructura de carpetas

```
src/
 ├── assets/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── utils/
 ├── data/
 │    ├── resources.json
 │    ├── resource-template.json
 │    └── resource-schema.json
 ├── types/
 └── App.tsx
```

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

Para GitHub Pages (base del repo):

```bash
VITE_BASE=/LudotecaMujerDigital/ npm run build
```

## Deploy

Cada push a `main` publica el sitio en GitHub Pages con el workflow `.github/workflows/deploy-pages.yml`.

URL esperada:

`https://ariadnaramirez.github.io/LudotecaMujerDigital/`

## Lint

```bash
npm run lint
```

## Validación de datos

```bash
npm run validate:data
EXPECTED_PARTICIPANTS=25 npm run validate:data
```

La validación aplica el contrato de `resource-schema.json`: campos obligatorios, máximos de caracteres, enums, pares de duración, imagen/URL HTTPS y participantes duplicadas. El **equipo de revisión** confirma además la autenticidad de los textos y que cada enlace e imagen carguen bien.

El `resources.json` actual incluye un **demo de 18 aportaciones** que ya pasa `npm run validate:data`. Debe reemplazarse por las aportaciones reales del equipo antes de la entrega final.
