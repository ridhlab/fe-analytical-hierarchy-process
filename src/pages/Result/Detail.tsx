import { Breadcrumbs } from "@/common/breadcrumb";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import { getDecimalPlace } from "@/helpers/number";
import { IInputValue } from "@/interfaces/entities/InputValues";
import MainLayout from "@/layouts/MainLayout";
import { useResultPredictByresultId } from "@/services/query/Result";
import { Card, Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useParams } from "react-router-dom";

const DetailResultPredict: React.FC = () => {
    const { id } = useParams();
    const query = useResultPredictByresultId(id);
    const columnsResultPredict: ColumnsType = [
        {
            title: "Variable Output",
            dataIndex: "variableOutputName",
        },
        {
            title: "Value",
            dataIndex: "value",
            render: (value) => getDecimalPlace(value, 3),
        },
    ];

    const columnsVariableInput: ColumnsType<IInputValue> = [
        {
            title: "Variable Input",
            render: (_, record) => record?.variableInput?.name,
        },
        {
            title: "Value",
            render: (_, record) => record?.value,
        },
    ];

    const mainContent = (
        <Row gutter={20} justify="start">
            <Col>
                <Table
                    pagination={false}
                    bordered
                    size="small"
                    dataSource={query?.data?.data?.result?.inputValues}
                    columns={columnsVariableInput}
                />
            </Col>
            <Col>
                <Table
                    pagination={false}
                    bordered
                    size="small"
                    dataSource={query?.data?.data?.predict}
                    columns={columnsResultPredict}
                />
            </Col>
        </Row>
    );

    return (
        <MainLayout
            title="Detail Predict"
            breadcrumbs={Breadcrumbs.Result.Detail(id)}
        >
            {query?.isLoading || query?.isFetching ? (
                <LoaderCenter />
            ) : (
                <Card
                    title={`Result predict for ${query?.data?.data?.result?.name}`}
                >
                    {mainContent}
                </Card>
            )}
        </MainLayout>
    );
};

export default DetailResultPredict;
