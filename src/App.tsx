import { Link, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { Detail } from "./pages/Detail/Detail";

function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-4 py-28 text-center animate-rise">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brass">
        404
      </p>
      <h1 className="font-display text-3xl font-semibold text-ink">
        Página no encontrada
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        La ruta que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="mt-3 rounded-sm bg-brand-800 px-4 py-2 text-sm font-medium text-surface transition hover:bg-brand-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recurso/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="border-t border-line/80 py-6 text-center text-[11px] tracking-[0.12em] uppercase text-muted">
        Ludoteca Digital
      </footer>
    </div>
  );
}

export default App;
