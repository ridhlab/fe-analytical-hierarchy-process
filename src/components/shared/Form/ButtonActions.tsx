import { Row, Space } from "antd";
import React from "react";

interface IProps {
    actions: React.ReactNode[];
}

const ButtonAction: React.FC<IProps> = ({ actions }) => {
    return (
        <Row justify="end">
            <Space>
                {actions.map((action, index) => (
                    <React.Fragment key={index}>{action}</React.Fragment>
                ))}
            </Space>
        </Row>
    );
};

export default ButtonAction;
