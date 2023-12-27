import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";

const Dashboard: React.FC = () => {
    const { user } = useAuthContext();
    return JSON.stringify(user);
};

export default Dashboard;
