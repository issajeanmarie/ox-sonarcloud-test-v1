import React from "react";
import ResetPasswordForm from "../components/Forms/Auth/ResetPasswordForm";
import AuthWrapper from "../components/Shared/AuthWrapper";
import WithPublicRoute from "../components/Shared/Routes/WithPublicRoute";

const ResetPassword = () => {
  return (
    <AuthWrapper title="Reset password">
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default WithPublicRoute(ResetPassword);
