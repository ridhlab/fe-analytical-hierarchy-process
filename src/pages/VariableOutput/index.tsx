import { Breadcrumbs } from "@/common/breadcrumb";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "antd";
import React from "react";

const VariableOutputIndex: React.FC = () => {
    return (
        <MainLayout
            title="Variable Output"
            breadcrumbs={Breadcrumbs.VariableOutput.Index()}
        >
            <Card></Card>
        </MainLayout>
    );
};

export default VariableOutputIndex;
