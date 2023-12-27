/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import React, { ReactNode, Suspense } from "react";
import LoaderFullscreen from "@/components/shared/Loader/LoaderFullscreen";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const LoginPage = React.lazy(() => import("@/pages/Auth/Login"));
const RegisterPage = React.lazy(() => import("@/pages/Auth/Register"));
const DashboardPage = React.lazy(() => import("@/pages/Dashboard"));

export const withSuspense = (component: ReactNode) => {
    return <Suspense fallback={<LoaderFullscreen />}>{component}</Suspense>;
};

export const router = createBrowserRouter([
    {
        path: Routes.Dashboard,
        element: withSuspense(
            <PrivateRoute>
                <DashboardPage />
            </PrivateRoute>
        ),
    },
    {
        path: Routes.Login,
        element: withSuspense(
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: Routes.Register,
        element: withSuspense(
            <PublicRoute>
                <RegisterPage />
            </PublicRoute>
        ),
    },
]);
