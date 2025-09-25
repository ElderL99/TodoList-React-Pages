import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import { PokePage } from "./pages/PokePage.jsx";
import PokemonDetail from "./pages/PokemonDetail.jsx";

/* import App from "./App.jsx"; */
/* import AppRHF from "./AppRHF"; */

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="bg-black text-red-500  w-screen h-screen">
        <div className="flex justify-center items-center h-screen ">
          <a href="/pokemon" className="hover:translate-x-96">
            <button className="border  border-blue-500 rounded-xl p-4 ">
              Go pokeDex
            </button>
          </a>
        </div>
      </div>
    ),
  },
  {
    path: "/pokemon",
    element: <PokePage />,
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetail />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
