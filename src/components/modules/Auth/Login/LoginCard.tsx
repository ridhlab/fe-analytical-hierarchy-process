import { useAuthContext } from "@/contexts/AuthContext";
import { setAuthCookie } from "@/helpers/cookie";
import { getMinCharMessage, getRequiredMessage } from "@/helpers/form";
import { prompNotification } from "@/helpers/notification";
import { hasNumberRegex } from "@/helpers/validation";
import { useFormUtility } from "@/hooks/useFormUtility";
import { ILoginRequest } from "@/interfaces/requests/Auth";
import { Routes } from "@/routes/routes";
import { useLoginMutation } from "@/services/mutation/Auth";
import { Button, Card, Input, Row, Space, Typography, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<ILoginRequest> = yup.object({
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
});

export const LoginCard = () => {
    const { form, yupSync } = useFormUtility<ILoginRequest>({ schema });
    const watch = Form.useWatch([], form);
    const { afterLoginRegister } = useAuthContext();

    const navigate = useNavigate();

    const mutation = useLoginMutation({
        onError: (error) => {
            prompNotification({ method: "error", message: error.message });
        },
        onSuccess: (response) => {
            const {
                data: { token, user },
            } = response;
            setAuthCookie(token);
            afterLoginRegister(user);
            navigate(Routes.Dashboard, { replace: true });
            prompNotification({
                method: "success",
                message: "Login successfully",
            });
        },
    });

    const onFinish = async () => {
        await form.validateFields();
        const payload = form.getFieldsValue();
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
                <Typography.Title level={4}>Welcome Back !</Typography.Title>
            </Space>
        </Row>
    );

    return (
        <Card style={{ width: 500 }} title={title}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="Email" name="email" rules={[yupSync]}>
                        <Input placeholder="Input email" type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[yupSync]}
                    >
                        <Input.Password placeholder="Input password" />
                    </Form.Item>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        disabled={!schema.isValidSync(watch)}
                    >
                        Login
                    </Button>
                </Form>
                <Row justify="center">
                    <Typography.Text>
                        Not have account?{" "}
                        <Link to={Routes.Register}>Register</Link>
                    </Typography.Text>
                </Row>
            </Space>
        </Card>
    );
};
