import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import App from "./App.tsx";
import { LocalStorageProvider } from "./components/localstorage-provider.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <LocalStorageProvider>
          <App />
        </LocalStorageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
