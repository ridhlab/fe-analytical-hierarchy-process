import { Breadcrumbs } from "@/common/breadcrumb";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "antd";
import React from "react";

const ResultIndex: React.FC = () => {
    return (
        <MainLayout title="Result" breadcrumbs={Breadcrumbs.Result.Index()}>
            <Card></Card>
        </MainLayout>
    );
};

export default ResultIndex;
