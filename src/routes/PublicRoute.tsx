import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";
import { Routes } from "./routes";

interface IProps {
    children: React.ReactNode;
}

const PublicRoute = ({ children }: IProps) => {
    const { isAuthenticate } = useAuthContext();
    return isAuthenticate ? <Navigate to={Routes.Dashboard} /> : children;
};

export default PublicRoute;
