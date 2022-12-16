import React from "react";
import ForgetPasswordForm from "../components/Forms/Auth/ForgetPassword";
import AuthWrapper from "../components/Shared/AuthWrapper";
import WithPublicRoute from "../components/Shared/Routes/WithPublicRoute";

const ForgotPassword = () => {
  return (
    <AuthWrapper title="Forgot password">
      <ForgetPasswordForm />
    </AuthWrapper>
  );
};

export default WithPublicRoute(ForgotPassword);
