import { matrixCompareOptions } from "@/helpers/select-options/matrix-compares";
import { IFormSchemaMatrixCompares } from "@/pages/MatrixCompares/EditByInputId";
import { Form, Input, Select, Space } from "antd";
import React from "react";

interface IProps {
    output1Id: number;
    output2Id: number;
    indexRow: number;
    indexCol: number;
    valueMatrixCompare: number;
    valueNormalization: number;
}

const CellMatrixCompare: React.FC<IProps> = ({
    output1Id,
    output2Id,
    indexCol,
    indexRow,
    valueMatrixCompare,
    valueNormalization,
}) => {
    const form = Form.useFormInstance<IFormSchemaMatrixCompares>();

    const handleChange = (value: number) => {
        const matrixCompares = form.getFieldsValue().matrixCompares;

        const newMatrixCompares = matrixCompares.map((matrixCompare) => {
            if (
                matrixCompare.compare1VariableOutputId === output1Id &&
                matrixCompare.compare2VariableOutputId === output2Id
            ) {
                return { ...matrixCompare, value };
            }
            if (
                matrixCompare.compare1VariableOutputId === output2Id &&
                matrixCompare.compare2VariableOutputId === output1Id
            ) {
                return { ...matrixCompare, value: 1 / value };
            }
            return matrixCompare;
        });

        form.setFieldsValue({ matrixCompares: newMatrixCompares });
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Select
                options={matrixCompareOptions}
                allowClear={false}
                style={{ width: "100%" }}
                onChange={(value) => handleChange(value)}
                disabled={indexCol <= indexRow}
                value={valueMatrixCompare}
            />
            <Input readOnly value={valueNormalization} />
        </Space>
    );
};

export default CellMatrixCompare;
