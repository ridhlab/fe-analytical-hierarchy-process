import { colorConfig } from "@/themes/config";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { ModalFuncProps } from "antd";
import confirm from "antd/es/modal/confirm";

export const modalConfirm = (config?: ModalFuncProps) => {
    return confirm({
        title: "Are you sure?",
        icon: (
            <ExclamationCircleFilled
                style={{ color: colorConfig.feedback.warning }}
            />
        ),
        closable: true,
        centered: true,
        ...config,
    });
};
