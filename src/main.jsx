import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { PokePage } from "./pages/PokePage.jsx";
import PokemonDetail from "./pages/PokemonDetail.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="bg-black text-red-500 w-screen h-screen">
        <div className="flex justify-center items-center h-screen">
          <Link to="/pokemon">
            <button className="border border-blue-500 rounded-xl p-4 hover:border hover:border-yellow-500">
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
