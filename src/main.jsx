import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { KodersList } from "./kodersList";
/* import App from "./App.jsx"; */
/* import AppRHF from "./AppRHF"; */

createRoot(document.getElementById("root")).render(<KodersList />);
