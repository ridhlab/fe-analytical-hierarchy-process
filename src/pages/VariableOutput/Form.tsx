import { Breadcrumbs } from "@/common/breadcrumb";
import Button from "@/components/shared/Button/Button";
import ButtonAction from "@/components/shared/Form/ButtonActions";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import { getRequiredMessage } from "@/helpers/form";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { useFormUtility } from "@/hooks/useFormUtility";
import { IVariableOutputStoreUpdateRequest } from "@/interfaces/requests/VariableOutput";
import MainLayout from "@/layouts/MainLayout";
import { Routes } from "@/routes/routes";
import {
    useVariableOutputMutationStore,
    useVariableOutputMutationUpdate,
} from "@/services/mutation/VariableOutput";
import { useVariableOutputQueryDetail } from "@/services/query/VariableOutput";
import { Card, Form, Input } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

interface IProps {
    editPage?: boolean;
}

const schema: yup.ObjectSchema<IVariableOutputStoreUpdateRequest> = yup.object({
    name: yup.string().required(getRequiredMessage("Name")),
});

const VariableOutputForm: React.FC<IProps> = ({ editPage = false }) => {
    const { id } = useParams();
    const query = useVariableOutputQueryDetail(id);

    const { form, yupSync } = useFormUtility({ schema });
    const navigate = useNavigate();

    const mutationUpdate = useVariableOutputMutationUpdate(id, {
        onSuccess: ({ message }) => {
            prompNotification({ method: "success", message });
            navigate(Routes.VariableOutputIndex);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });
    const mutationStore = useVariableOutputMutationStore({
        onSuccess: ({ message }) => {
            prompNotification({ method: "success", message });
            navigate(Routes.VariableOutputIndex);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const onFinish = () => {
        modalConfirm({
            onOk: async () => {
                await form.validateFields();
                const payload = form.getFieldsValue();
                editPage
                    ? mutationUpdate.mutate(payload)
                    : mutationStore.mutate(payload);
            },
        });
    };

    return (
        <MainLayout
            title="Variable Output"
            breadcrumbs={
                editPage
                    ? Breadcrumbs.VariableOutput.Edit(id)
                    : Breadcrumbs.VariableOutput.Create()
            }
        >
            <Card>
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        initialValues={{ ...query?.data?.data }}
                    >
                        <Form.Item name="name" label="Name" rules={[yupSync]}>
                            <Input placeholder="Iutput name" type="text" />
                        </Form.Item>
                        <ButtonAction
                            actions={[
                                <Button href={Routes.VariableOutputIndex}>
                                    Cancel
                                </Button>,
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>,
                            ]}
                        />
                    </Form>
                )}
            </Card>
        </MainLayout>
    );
};

export default VariableOutputForm;
