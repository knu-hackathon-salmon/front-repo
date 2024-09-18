import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { queryClient } from "./api/instance/index.ts";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </ChakraProvider>
    </StrictMode>,
);
