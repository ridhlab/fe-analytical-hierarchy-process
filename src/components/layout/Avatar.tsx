import { removeAuthCookie } from "@/helpers/cookie";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { Routes } from "@/routes/routes";
import { useLogoutMutation } from "@/services/mutation/Auth";
import { colorConfig } from "@/themes/config";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar as AvatarAntd, Dropdown, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import React from "react";

const Avatar: React.FC = () => {
    const logoutMutation = useLogoutMutation({
        onSuccess: (response) => {
            removeAuthCookie();
            setTimeout(() => {
                window.location.replace(Routes.Login);
            }, 1000);
            prompNotification({ method: "success", message: response.message });
        },
    });

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
            onClick: () =>
                modalConfirm({
                    onOk: () => {
                        logoutMutation.mutate({});
                    },
                }),
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
