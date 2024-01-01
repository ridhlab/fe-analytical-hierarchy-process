import { Breadcrumbs } from "@/common/breadcrumb";
import Button from "@/components/shared/Button/Button";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import RowActionButtons from "@/components/shared/Table/RowActionButtons";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IVariableOutput } from "@/interfaces/entities/VariableOutput";
import MainLayout from "@/layouts/MainLayout";
import { Routes } from "@/routes/routes";
import { useVariableOutputQueryIndex } from "@/services/query/VariableOutput";
import { Card } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";

const VariableOutputIndex: React.FC = () => {
    const query = useVariableOutputQueryIndex();
    const columns: ColumnsType<IVariableOutput> = [
        numberColumns(),
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "id",
            render: (id) => (
                <RowActionButtons
                    actions={[
                        {
                            type: "edit",
                            href: parsingRoute(Routes.VariableOutputEdit, {
                                id,
                            }),
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <MainLayout
            title="Variable Output"
            breadcrumbs={Breadcrumbs.VariableOutput.Index()}
        >
            <Card
                extra={
                    <Button href={Routes.VariableOutputCreate} type="primary">
                        Create
                    </Button>
                }
            >
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Table
                        bordered
                        dataSource={query.data.data}
                        columns={columns}
                        pagination={false}
                    />
                )}
            </Card>
        </MainLayout>
    );
};

export default VariableOutputIndex;
