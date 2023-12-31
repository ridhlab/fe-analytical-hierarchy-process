import { Breadcrumbs } from "@/common/breadcrumb";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "antd";
import React from "react";

const Dashboard: React.FC = () => {
    return (
        <MainLayout title="Dashboard" breadcrumbs={Breadcrumbs.Dashboard()}>
            <Card></Card>
        </MainLayout>
    );
};

export default Dashboard;
