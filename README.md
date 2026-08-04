# Tech Resource Hub (Ludoteca Digital)

Aplicación web que permite a estudiantes de tecnología, personas en cursos de ciberseguridad, bootcampers y autodidactas encontrar recursos de aprendizaje de forma rápida mediante filtros inteligentes, búsqueda y organización personal (favoritos y completados).

## ✨ Funcionalidades

- **Búsqueda** por título, plataforma, categoría, etiquetas y autor, sin distinguir mayúsculas/minúsculas ni acentos.
- **Filtros combinables**: tiempo, nivel, tema, tipo, plataforma, idioma, precio, certificado y estado (todos/favoritos/completados), con opción de limpiar todos los filtros.
- **Ordenamiento**: más recientes, más antiguos, menor/mayor duración, nivel, nombre A-Z/Z-A.
- **Tarjetas de recurso** con imagen, nombre, plataforma, tema, tiempo, nivel, tipo, idioma, etiquetas y acciones (ver recurso, favorito, compartir, completado).
- **Página de detalle** con toda la información del recurso y recursos relacionados (mínimo 3).
- **Favoritos y Completados** persistidos en `LocalStorage`.
- **Compartir** mediante la Web Share API, con fallback a copiar el enlace al portapapeles y confirmación visual.
- **Contador de resultados** ("X recursos encontrados" y "Mostrando N de M recursos").
- **Estado vacío** y **estados de carga** (skeleton cards).
- **Responsive** (desktop, tablet, mobile) y **accesible** (navegación por teclado, ARIA, foco visible, contraste adecuado).

## 🛠️ Tecnologías

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- LocalStorage
- JSON como fuente de datos (`src/data/resources.json`)

## 📁 Estructura de carpetas

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
 │    ├── FavoriteButton/
 │    ├── ShareButton/
 │    ├── Badge/
 │    ├── SortDropdown/
 │    └── ResourceCounter/
 ├── pages/
 │    ├── Home/
 │    ├── Detail/
 │    └── Favorites/
 ├── hooks/
 ├── utils/
 ├── data/
 │    └── resources.json
 ├── types/
 └── App.tsx
```

## 🚀 Desarrollo

```bash
npm install
npm run dev
```

## 📦 Build de producción

```bash
npm run build
npm run preview
```

## 🔍 Lint

```bash
npm run lint
```
