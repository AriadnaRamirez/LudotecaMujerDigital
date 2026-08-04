import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dfe4e8] bg-white shadow-[0_1px_3px_rgba(20,55,70,0.06)]">
      <a href="#main-content" className="sr-only-focusable">
        Saltar al contenido principal
      </a>
      <div className="mx-auto flex h-[58px] max-w-[1440px] items-center gap-8 px-4 sm:px-7">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 rounded text-[#174554] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <svg
            viewBox="0 0 42 42"
            className="h-9 w-9"
            aria-hidden="true"
          >
            <path d="M3 10 18 3v15L3 10Z" fill="#08a7b2" />
            <path d="m22 3 16 7-16 8V3Z" fill="#176175" />
            <path d="m3 14 15 8v16L3 30V14Z" fill="#14738a" />
            <path d="m22 22 16-8v16l-16 8V22Z" fill="#00a8b5" />
            <path d="m18 22-7 4 7 4v-8ZM22 22l7 4-7 4v-8Z" fill="#fff" />
          </svg>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-bold tracking-tight sm:text-base">
              Ludoteca Digital
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-brand-600 sm:block">
              Tech Resource Hub
            </span>
          </span>
        </NavLink>

        <nav aria-label="Navegación principal" className="ml-auto self-stretch">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 px-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                isActive
                  ? "border-brand-500 text-[#173e4b]"
                  : "border-transparent text-slate-500 hover:text-brand-700"
              }`
            }
          >
            Recursos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
