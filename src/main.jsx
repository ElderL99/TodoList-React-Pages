import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import { PokePage } from "./pages/PokePage.jsx";
import PokemonDetail from "./pages/PokemonDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="bg-black text-red-500 w-screen h-screen">
        <div className="flex justify-center items-center h-screen">
          <Link to="/pokemon">
            <button className="border border-blue-500 rounded-xl p-4 hover:translate-x-2 transition-transform">
              Go PokeDex
            </button>
          </Link>
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
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
