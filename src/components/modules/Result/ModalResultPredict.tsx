import Button from "@/components/shared/Button/Button";
import { getDecimalPlace } from "@/helpers/number";
import { parsingRoute } from "@/helpers/route";
import { IPredict } from "@/interfaces/responses/Result";
import { Routes } from "@/routes/routes";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

interface IProps {
    open: boolean;
    closeModal: () => void;
    dataPredict: IPredict;
}

const ModalResultPredict: React.FC<IProps> = ({
    open,
    closeModal,
    dataPredict,
}) => {
    const footer = (
        <Space>
            <Button onClick={closeModal}>Close</Button>
            <Button
                icon={<EyeOutlined />}
                href={parsingRoute(Routes.ResultDetail, {
                    id: dataPredict?.resultId,
                })}
            >
                See Detail
            </Button>
        </Space>
    );

    const columns: ColumnsType = [
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

    return (
        <Modal
            open={open}
            centered
            closable={false}
            title={`Result predict for ${dataPredict?.name}`}
            footer={footer}
        >
            <Table
                bordered
                pagination={false}
                size="small"
                dataSource={dataPredict?.predict}
                columns={columns}
            />
        </Modal>
    );
};

export default ModalResultPredict;
