import AuthLayout from "../features/auth/components/auth.layout";
import SignInFormComponent from "../features/auth/components/SigninFrom.component";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignInFormComponent />
    </AuthLayout>
  );
};

export default SignInPage;
