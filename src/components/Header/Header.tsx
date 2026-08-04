import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-surface/80 backdrop-blur-md">
      <a href="#main-content" className="sr-only-focusable">
        Saltar al contenido principal
      </a>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-4 sm:px-7">
        <NavLink
          to="/"
          className="group flex items-center gap-3 rounded-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <span
            className="flex h-9 w-9 items-center justify-center border border-brand-300 bg-brand-50 text-[11px] font-semibold tracking-[0.14em] text-brand-800"
            aria-hidden="true"
          >
            LD
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold tracking-tight">
              Ludoteca Digital
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-muted sm:block">
              Recursos curados
            </span>
          </span>
        </NavLink>

        <nav aria-label="Navegación principal" className="ml-auto self-stretch">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex h-full items-center border-b px-2 text-sm font-medium tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                isActive
                  ? "border-brand-700 text-ink"
                  : "border-transparent text-muted hover:text-brand-800"
              }`
            }
          >
            Catálogo
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
