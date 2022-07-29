import AuthLayout from "../features/auth/components/auth.layout";
import RegisterationFromCompoenet from "../features/auth/components/registaration-form.components";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterationFromCompoenet />
    </AuthLayout>
  );
};

export default RegisterPage;
