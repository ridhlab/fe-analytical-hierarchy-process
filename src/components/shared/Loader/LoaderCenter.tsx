import { Row, Spin } from "antd";
import React from "react";

const LoaderCenter: React.FC = () => {
    return (
        <Row justify="center">
            <Spin size="large"></Spin>
        </Row>
    );
};

export default LoaderCenter;
