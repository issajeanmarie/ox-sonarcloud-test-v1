import React from "react";
import LoginForm from "../components/Forms/Auth/Login";
import AuthWrapper from "../components/Shared/AuthWrapper";
import WithPublicRoute from "../components/Shared/Routes/WithPublicRoute";

const Login = () => {
  return (
    <AuthWrapper title="Login">
      <LoginForm />
    </AuthWrapper>
  );
};

export default WithPublicRoute(Login);
