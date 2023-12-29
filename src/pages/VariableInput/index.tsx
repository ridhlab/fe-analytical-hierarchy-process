import { Breadcrumbs } from "@/common/breadcrumb";
import Button from "@/components/shared/Button/Button";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import RowActionButtons from "@/components/shared/Table/RowActionButtons";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IVariableInput } from "@/interfaces/entities/VariableInput";
import MainLayout from "@/layouts/MainLayout";
import { Routes } from "@/routes/routes";
import { useVariableInputQueryIndex } from "@/services/query/VariableInput";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

const VariableInputIndex: React.FC = () => {
    const query = useVariableInputQueryIndex();
    const columns: ColumnsType<IVariableInput> = [
        numberColumns(),
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Actions",
            dataIndex: "id",
            render: (id) => (
                <RowActionButtons
                    actions={[
                        {
                            type: "edit",
                            href: parsingRoute(Routes.VariableInputEdit, {
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
            title="Variable Input"
            breadcrumbs={Breadcrumbs.VariableInput.Index()}
        >
            <Card
                extra={[
                    <Button href={Routes.VariableInputCreate} type="primary">
                        Create
                    </Button>,
                ]}
            >
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Table
                        dataSource={query.data.data}
                        columns={columns}
                        pagination={false}
                    />
                )}
            </Card>
        </MainLayout>
    );
};

export default VariableInputIndex;
