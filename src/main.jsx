import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { PokePage } from "./pages/PokePage.jsx";
import PokemonDetail from "./pages/PokemonDetail.jsx";
import "./index.css";

// Creamos un componente principal
function Main() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-black text-red-500 w-screen h-screen">
              <div className="flex justify-center items-center h-screen">
                <Link to="/pokemon">
                  <button className="border border-blue-500 rounded-xl p-4 hover:border hover:border-yellow-500">
                    Go PokeDex
                  </button>
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/pokemon" element={<PokePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </HashRouter>
  );
}

// Renderizamos la app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
