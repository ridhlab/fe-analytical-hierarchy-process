import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginCard } from "@/components/modules/Auth/Login/LoginCard";

const LoginPage = () => {
    return (
        <AuthLayout>
            <LoginCard />
        </AuthLayout>
    );
};

export default LoginPage;
