import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PokoPage } from "./pages/PokeApi";
/* import App from "./App.jsx"; */
/* import AppRHF from "./AppRHF"; */

createRoot(document.getElementById("root")).render(<PokoPage />);
