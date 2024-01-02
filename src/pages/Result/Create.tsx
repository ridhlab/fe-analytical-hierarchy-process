import { Breadcrumbs } from "@/common/breadcrumb";
import ModalResultPredict from "@/components/modules/Result/ModalResultPredict";
import Button from "@/components/shared/Button/Button";
import ButtonAction from "@/components/shared/Form/ButtonActions";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import { getRequiredMessage } from "@/helpers/form";
import { modalConfirm } from "@/helpers/modal-confirm";
import { useFormUtility } from "@/hooks/useFormUtility";
import { IPredictRequest } from "@/interfaces/requests/Result";
import { IPredict } from "@/interfaces/responses/Result";
import MainLayout from "@/layouts/MainLayout";
import { Routes } from "@/routes/routes";
import { useResultPredictMutation } from "@/services/mutation/Result";
import { useVariableInputQueryIndex } from "@/services/query/VariableInput";
import { Card, Flex, Form, Input, InputNumber } from "antd";
import React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(getRequiredMessage("Name")),
    dataInput: yup
        .array()
        .of(
            yup.object().shape({
                variableInputId: yup
                    .number()
                    .required(getRequiredMessage("Variable Input"))
                    .defined(),
                value: yup
                    .number()
                    .required(getRequiredMessage("Value"))
                    .defined(),
            })
        )
        .required(),
});

const ResultCreate: React.FC = () => {
    const { form, yupSync } = useFormUtility({ schema });
    const queryVariableInput = useVariableInputQueryIndex();

    const [openModalResultPredict, setOpenModalResultPredict] =
        React.useState(false);
    const [resultPredict, setResultPredict] = React.useState<IPredict>(null);

    const mutationPredict = useResultPredictMutation({
        onSuccess: ({ data }) => {
            setOpenModalResultPredict(true);
            setResultPredict(data);
        },
    });

    const closeModal = () => {
        setOpenModalResultPredict(false);
        setResultPredict(null);
    };

    const onFinish = async () => {
        await form.validateFields();
        modalConfirm({
            onOk: () => {
                const dataSubmitted = form.getFieldsValue();
                mutationPredict.mutate(dataSubmitted as IPredictRequest);
            },
        });
    };

    const getLabelOutput = (idContext) => {
        return queryVariableInput?.data?.data?.find(
            ({ id }) => id === idContext
        )?.name;
    };

    const formListDataInput = (
        <Form.List name="dataInput">
            {(fields) =>
                fields.map((field) => (
                    <React.Fragment key={field.key}>
                        <Form.Item
                            required
                            label={getLabelOutput(
                                form.getFieldValue([
                                    "dataInput",
                                    field.name,
                                    "variableInputId",
                                ])
                            )}
                            name={[field.name, "value"]}
                            rules={[yupSync]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={[field.name, "variableInputId"]}
                        ></Form.Item>
                    </React.Fragment>
                ))
            }
        </Form.List>
    );

    return (
        <MainLayout title="Predict" breadcrumbs={Breadcrumbs.Result.Create()}>
            <Card>
                {queryVariableInput.isLoading ||
                queryVariableInput.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        initialValues={{
                            name: "",
                            dataInput: queryVariableInput?.data?.data?.map(
                                ({ id }) => ({ variableInputId: id, value: 0 })
                            ),
                        }}
                    >
                        <Form.Item
                            required
                            label="Name"
                            name="name"
                            rules={[yupSync]}
                        >
                            <Input />
                        </Form.Item>
                        <Flex wrap="wrap" style={{ columnGap: "1rem" }}>
                            {formListDataInput}
                        </Flex>
                        <ButtonAction
                            actions={[
                                <Button href={Routes.ResultIndex}>
                                    Cancel
                                </Button>,
                                <Button type="primary" htmlType="submit">
                                    Predict
                                </Button>,
                            ]}
                        />
                    </Form>
                )}
            </Card>
            <ModalResultPredict
                open={openModalResultPredict}
                closeModal={closeModal}
                dataPredict={resultPredict}
            />
        </MainLayout>
    );
};

export default ResultCreate;
