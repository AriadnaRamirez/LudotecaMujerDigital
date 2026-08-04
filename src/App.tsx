import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { Detail } from "./pages/Detail/Detail";

function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 py-24 text-center">
      <p className="text-5xl" aria-hidden="true">
        🧭
      </p>
      <h1 className="text-xl font-bold text-slate-900">Página no encontrada</h1>
      <p className="text-sm text-slate-500">
        La página que buscas no existe o fue movida.
      </p>
      <a href="/" className="mt-2 text-sm font-medium text-brand-600 hover:underline">
        Volver al inicio
      </a>
    </div>
  );
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recurso/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-400">
        Tech Resource Hub · Ludoteca Digital
      </footer>
    </div>
  );
}

export default App;
