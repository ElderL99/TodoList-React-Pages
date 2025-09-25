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
    element: <HomePage />,
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
