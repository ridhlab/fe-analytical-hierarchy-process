import { RegisterCard } from "@/components/modules/Auth/Register/RegisterCard";
import { AuthLayout } from "@/layouts/AuthLayout";

const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterCard />
        </AuthLayout>
    );
};

export default RegisterPage;
