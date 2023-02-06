import React from "react";
import VerifyAccount from "../components/Forms/Auth/VerifyAccount";
import AuthWrapper from "../components/Shared/AuthWrapper";
import WithPublicRoute from "../components/Shared/Routes/WithPublicRoute";

const ForgotPassword = () => {
  return (
    <AuthWrapper title="Verify account">
      <VerifyAccount />
    </AuthWrapper>
  );
};

export default WithPublicRoute(ForgotPassword);
