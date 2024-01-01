import { Breadcrumbs } from "@/common/breadcrumb";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import RowActionButtons from "@/components/shared/Table/RowActionButtons";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IVariableInput } from "@/interfaces/entities/VariableInput";
import MainLayout from "@/layouts/MainLayout";
import { Routes } from "@/routes/routes";
import { useVariableInputQueryIndex } from "@/services/query/VariableInput";
import { Card } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";

const MatrixCompareIndex: React.FC = () => {
    const query = useVariableInputQueryIndex();
    const columns: ColumnsType<IVariableInput> = [
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
                            href: parsingRoute(Routes.MatrixComparesEdit, {
                                inputId: id,
                            }),
                        },
                    ]}
                />
            ),
        },
    ];
    return (
        <MainLayout
            title="Matrix Compares"
            breadcrumbs={Breadcrumbs.MatrixCompare.Index()}
        >
            <Card>
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

export default MatrixCompareIndex;
