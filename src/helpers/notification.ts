import { notification } from "antd";

type TConfig = {
    method: "success" | "info" | "warning" | "error";
    message: string;
};

export const prompNotification = (config: TConfig) => {
    const { message, method } = config;
    notification[method]({
        message,
    });
};
