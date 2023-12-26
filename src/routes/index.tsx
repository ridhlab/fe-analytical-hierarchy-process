/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import React, { ReactNode, Suspense } from "react";
import { Spin } from "antd";

const LoginPage = React.lazy(() => import("@/pages/Auth/Login"));
const RegisterPage = React.lazy(() => import("@/pages/Auth/Register"));

export const withSuspense = (component: ReactNode) => {
    return <Suspense fallback={<Spin fullscreen></Spin>}>{component}</Suspense>;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: "Home",
    },
    {
        path: Routes.Login,
        element: withSuspense(<LoginPage />),
    },
    {
        path: Routes.Register,
        element: withSuspense(<RegisterPage />),
    },
]);
