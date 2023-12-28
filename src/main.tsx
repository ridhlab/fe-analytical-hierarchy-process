import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import LoaderFullscreen from "./components/shared/Loader/LoaderFullscreen";
import { ConfigProvider } from "antd";
import { colorConfig } from "./themes/config";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Suspense fallback={<LoaderFullscreen />}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: colorConfig.primary.main,
                        },
                    }}
                >
                    <AuthContextProvider>
                        <RouterProvider router={router} />
                    </AuthContextProvider>
                </ConfigProvider>
            </QueryClientProvider>
        </Suspense>
    </React.StrictMode>
);
