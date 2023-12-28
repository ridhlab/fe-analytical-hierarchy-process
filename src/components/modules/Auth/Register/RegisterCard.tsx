import { setAuthCookie } from "@/helpers/cookie";
import { getMinCharMessage, getRequiredMessage } from "@/helpers/form";
import { prompNotification } from "@/helpers/notification";
import { hasNumberRegex } from "@/helpers/validation";
import { useFormUtility } from "@/hooks/useFormUtility";
import { IRegisterRequest } from "@/interfaces/requests/Auth";
import { Routes } from "@/routes/routes";
import { useRegisterMutation } from "@/services/mutation/Auth";
import { Button, Card, Input, Row, Space, Typography, Form } from "antd";
import { Link } from "react-router-dom";
import * as yup from "yup";

interface IRegisterForm extends IRegisterRequest {
    passwordConfirmation: string;
}

const schema: yup.ObjectSchema<IRegisterForm> = yup.object({
    name: yup.string().required(getRequiredMessage("Name")),
    email: yup
        .string()
        .email("Email must be valid email")
        .required(getRequiredMessage("Email")),
    password: yup
        .string()
        .min(8, getMinCharMessage("Password", 8))
        .matches(hasNumberRegex, {
            message: "Password must contain at least number",
        })
        .required(getRequiredMessage("Password")),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(getRequiredMessage("Password Confirmation")),
});

export const RegisterCard = () => {
    const { form, yupSync } = useFormUtility<IRegisterForm>({ schema });
    const watch = Form.useWatch([], form);

    const mutation = useRegisterMutation({
        onError: (error) => {
            prompNotification({ method: "error", message: error.message });
        },
        onSuccess: (response) => {
            const {
                data: { token },
            } = response;
            setAuthCookie(token);
            setTimeout(() => {
                window.location.replace(Routes.Dashboard);
            }, 1000);
            prompNotification({
                method: "success",
                message: "Register successfully",
            });
        },
    });

    const onFinish = async () => {
        await form.validateFields();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordConfirmation, ...payload } = form.getFieldsValue();
        mutation.mutate(payload);
    };

    const title = (
        <Row justify="center">
            <Space
                direction="vertical"
                align="center"
                size={0}
                style={{ padding: ".5rem 0" }}
            >
                <img src="/vite.svg" />
                <Typography.Title level={4}>Create Account</Typography.Title>
            </Space>
        </Row>
    );

    return (
        <Card style={{ width: 500 }} title={title}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="Name" name="name" rules={[yupSync]}>
                        <Input placeholder="Input name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[yupSync]}>
                        <Input type="email" placeholder="Input email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[yupSync]}
                    >
                        <Input.Password placeholder="Input password" />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="passwordConfirmation"
                        rules={[yupSync]}
                    >
                        <Input.Password placeholder="Input password confirmation" />
                    </Form.Item>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        loading={mutation.isPending}
                        disabled={!schema.isValidSync(watch)}
                    >
                        Register
                    </Button>
                </Form>
                <Row justify="center">
                    <Typography.Text>
                        Already have account?{" "}
                        <Link to={Routes.Login}>Login</Link>
                    </Typography.Text>
                </Row>
            </Space>
        </Card>
    );
};
