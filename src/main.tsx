import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import App from "./App.tsx";
import { LocalStorageProvider } from "./components/localstorage-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LocalStorageProvider>
        <App />
      </LocalStorageProvider>
    </ThemeProvider>
  </StrictMode>
);
