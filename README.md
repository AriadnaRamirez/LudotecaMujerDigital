# Tech Resource Hub (Ludoteca Digital)

Sitio web para organizar y consultar las aportaciones colectivas de la comunidad Mujer Digital mediante búsqueda, filtros y páginas de detalle.

## Guía para participantes

Si vas a compartir tu recurso, lee **[`COMO-ENVIAR-TU-JSON.md`](./COMO-ENVIAR-TU-JSON.md)**.  
Para la entrega del equipo, consulta también [`CONVOCATORIA.md`](./CONVOCATORIA.md).

## Funcionalidades

- **Búsqueda** por título, plataforma, área, etiquetas, autor y participante, sin distinguir mayúsculas/minúsculas ni acentos.
- **Filtros combinables**: tiempo, nivel, tema, tipo, plataforma, idioma, precio y certificado, con opción de limpiar todos los filtros.
- **Ordenamiento**: más recientes, más antiguos, menor/mayor duración, nivel, nombre A-Z/Z-A.
- **Tarjetas de recurso** con imagen, nombre, plataforma, tema, tiempo, nivel, tipo, idioma, etiquetas y acciones para ver y compartir.
- **Página de detalle** con la aportación, información del recurso y recursos relacionados.
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
 │    ├── ResourceCard/
 │    ├── SearchBar/
 │    ├── Filters/
 │    ├── Header/
 │    ├── EmptyState/
 │    ├── Loading/
 │    ├── ShareButton/
 │    ├── Badge/
 │    ├── SortDropdown/
 │    └── ResourceCounter/
 ├── pages/
 │    ├── Home/
 │    └── Detail/
 ├── hooks/
 ├── utils/
 ├── data/
 │    ├── resources.json
 │    └── resource-template.json
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

La validación comprueba campos obligatorios, enlaces válidos y participantes duplicadas. La autenticidad de los textos y el funcionamiento real de cada enlace siempre requieren revisión humana.
