import React from "react";
import LoginForm from "../components/Forms/Auth/Login";
import AuthWrapper from "../components/Shared/AuthWrapper";

const Login = () => {
  return (
    <AuthWrapper title="Login">
      <LoginForm />
    </AuthWrapper>
  );
};

export default Login;
