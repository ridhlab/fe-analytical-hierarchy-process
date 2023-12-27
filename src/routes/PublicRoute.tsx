import LoaderFullscreen from "@/components/shared/Loader/LoaderFullscreen";
import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";
import { Routes } from "./routes";

interface IProps {
    children: React.ReactNode;
}

const PublicRoute = ({ children }: IProps) => {
    const { isLoading, isAuthenticate } = useAuthContext();
    if (isLoading) return <LoaderFullscreen />;
    return isAuthenticate ? <Navigate to={Routes.Dashboard} /> : children;
};

export default PublicRoute;
