import { Space } from "antd";
import React from "react";
import Button from "../Button/Button";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

interface IButtonAction {
    type: "detail" | "edit" | "delete" | "custom";
    href?: string;
    button?: React.ReactNode;
    onClick?: () => void;
}

interface IProps {
    actions: IButtonAction[];
}

const RowActionButtons: React.FC<IProps> = ({ actions }) => {
    const renderButtonAction = (action: IButtonAction) => {
        switch (action.type) {
            case "detail":
                return (
                    action.button ?? (
                        <Button
                            icon={<EyeOutlined />}
                            href={action.href}
                        ></Button>
                    )
                );
            case "edit":
                return (
                    action.button ?? (
                        <Button
                            icon={<EditOutlined />}
                            href={action.href}
                        ></Button>
                    )
                );
            case "delete":
                return (
                    action.button ?? (
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={action.onClick}
                        ></Button>
                    )
                );
            case "custom":
                return action.button;
            default:
                return <React.Fragment></React.Fragment>;
        }
    };
    return <Space>{actions.map((action) => renderButtonAction(action))}</Space>;
};

export default RowActionButtons;
