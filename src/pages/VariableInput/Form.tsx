import { Breadcrumbs } from "@/common/breadcrumb";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

interface IProps {
    editPage?: boolean;
}

const VariableInputForm: React.FC<IProps> = ({ editPage = false }) => {
    const { id } = useParams();
    return (
        <MainLayout
            title="Variable Input"
            breadcrumbs={
                editPage
                    ? Breadcrumbs.VariableInput.Edit(id)
                    : Breadcrumbs.VariableInput.Create()
            }
        >
            <Card></Card>
        </MainLayout>
    );
};

export default VariableInputForm;
