import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";
import './services/i18n.js';

// ← Captura o evento antes de qualquer render
window.__deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    window.__deferredPrompt = e;
});

registerSW({
  onOfflineReady() {
    console.log("PWA pronto para uso offline");
  },
  onNeedRefresh() {
    console.log("Nova versão disponível");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);