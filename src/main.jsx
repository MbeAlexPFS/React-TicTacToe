import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Background from "./components/Background.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Background />
    <App />
  </StrictMode>
);
