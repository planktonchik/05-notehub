import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <App />
      <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>
);
