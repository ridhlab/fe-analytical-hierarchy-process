import { colorConfig } from "@/themes/config";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar as AvatarAntd, Dropdown, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import React from "react";

const Avatar: React.FC = () => {
    const items: ItemType[] = [
        {
            key: "profile",
            label: (
                <Space>
                    <UserOutlined style={{ color: colorConfig.neutral.gray }} />
                    Profile
                </Space>
            ),
        },
        {
            key: "logout",
            label: (
                <Space>
                    <LogoutOutlined
                        style={{ color: colorConfig.neutral.gray }}
                    />
                    Logout
                </Space>
            ),
        },
    ];

    return (
        <Dropdown
            placement="bottomRight"
            menu={{
                items,
            }}
        >
            <AvatarAntd
                size={50}
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
            />
        </Dropdown>
    );
};

export default Avatar;
