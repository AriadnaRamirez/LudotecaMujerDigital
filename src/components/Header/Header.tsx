import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <a href="#main-content" className="sr-only-focusable">
        Saltar al contenido principal
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 rounded-lg text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white shadow-sm"
            aria-hidden="true"
          >
            📚
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold sm:text-lg">Tech Resource Hub</span>
            <span className="hidden text-xs font-medium text-slate-400 sm:block">
              Ludoteca Digital
            </span>
          </span>
        </NavLink>

        <nav aria-label="Navegación principal" className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              `flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <span aria-hidden="true">❤️</span>
            <span className="hidden sm:inline">Favoritos</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
