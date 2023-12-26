import { Row } from "antd";
import React, { ReactNode } from "react";

interface IProps {
    children: ReactNode;
}

export const AuthLayout: React.FC<IProps> = ({ children }) => {
    return (
        <Row style={{ height: "100vh" }} justify="center">
            <Row align="middle" style={{ height: "100vh" }}>
                {children}
            </Row>
        </Row>
    );
};
