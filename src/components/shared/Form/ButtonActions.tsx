import { Row, Space } from "antd";
import React from "react";

interface IProps {
    actions: React.ReactNode[];
}

const ButtonAction: React.FC<IProps> = ({ actions }) => {
    return (
        <Row justify="end">
            <Space>{actions.map((action) => action)}</Space>
        </Row>
    );
};

export default ButtonAction;
