import { Breadcrumbs } from "@/common/breadcrumb";
import Button from "@/components/shared/Button/Button";
import ButtonAction from "@/components/shared/Form/ButtonActions";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import { getRequiredMessage } from "@/helpers/form";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { useFormUtility } from "@/hooks/useFormUtility";
import { IVariableInputStoreUpdateRequest } from "@/interfaces/requests/VariableInput";
import MainLayout from "@/layouts/MainLayout";
import { Routes } from "@/routes/routes";
import {
    useVariableInputMutationStore,
    useVariableInputMutationUpdate,
} from "@/services/mutation/VariableInput";
import { useVariableInputQueryDetail } from "@/services/query/VariableInput";
import { Card, Form, Input } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

interface IProps {
    editPage?: boolean;
}

const schema: yup.ObjectSchema<IVariableInputStoreUpdateRequest> = yup.object({
    name: yup.string().required(getRequiredMessage("Name")),
});

const VariableInputForm: React.FC<IProps> = ({ editPage = false }) => {
    const { id } = useParams();
    const query = useVariableInputQueryDetail(id);

    const { form, yupSync } = useFormUtility({ schema });
    const navigate = useNavigate();

    const mutationUpdate = useVariableInputMutationUpdate(id, {
        onSuccess: ({ message }) => {
            prompNotification({ method: "success", message });
            navigate(Routes.VariableInputIndex);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });
    const mutationStore = useVariableInputMutationStore({
        onSuccess: ({ message }) => {
            prompNotification({ method: "success", message });
            navigate(Routes.VariableInputIndex);
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
            title="Variable Input"
            breadcrumbs={
                editPage
                    ? Breadcrumbs.VariableInput.Edit(id)
                    : Breadcrumbs.VariableInput.Create()
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
                            <Input placeholder="Input name" type="text" />
                        </Form.Item>
                        <ButtonAction
                            actions={[
                                <Button href={Routes.VariableInputIndex}>
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

export default VariableInputForm;
