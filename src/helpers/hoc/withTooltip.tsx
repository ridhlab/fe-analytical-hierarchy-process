import { Tooltip } from "antd";
import React from "react";

const withTooltip = (component: React.ReactNode, title: React.ReactNode) => {
    return <Tooltip title={title}>{component}</Tooltip>;
};

export default withTooltip;
