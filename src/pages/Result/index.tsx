import { Breadcrumbs } from "@/common/breadcrumb";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import RowActionButtons from "@/components/shared/Table/RowActionButtons";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IResult } from "@/interfaces/entities/Results";
import MainLayout from "@/layouts/MainLayout";
import { Routes } from "@/routes/routes";
import { useResultByUserLoginQuery } from "@/services/query/Result";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

const ResultIndex: React.FC = () => {
    const query = useResultByUserLoginQuery();
    const columns: ColumnsType<IResult> = [
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
                            type: "detail",
                            href: parsingRoute(Routes.ResultDetail, { id }),
                        },
                    ]}
                />
            ),
        },
    ];
    return (
        <MainLayout title="Result" breadcrumbs={Breadcrumbs.Result.Index()}>
            <Card>
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Table
                        bordered
                        columns={columns}
                        dataSource={query?.data?.data}
                        pagination={false}
                    />
                )}
            </Card>
        </MainLayout>
    );
};

export default ResultIndex;
