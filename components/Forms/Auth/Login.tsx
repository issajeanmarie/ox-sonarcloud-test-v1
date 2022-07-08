import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Form from "antd/lib/form";
import {
  emailValidation,
  passwordValidation
} from "../../../lib/validation/InputValidations";
import { routes } from "../../../config/route-config";
import { LoginTypes } from "../../../lib/types/LoginTypes";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";

const Login = () => {
  const router = useRouter();
  const onFinish = (values: LoginTypes) => {
    router.push(routes.Orders.url);
    return values;
  };

  return (
    <Form name="Login" onFinish={onFinish} layout="vertical" title="Login">
      <div className="flex flex-col gap-5">
        <div>
          <Input
            name="username"
            type="text"
            label="Email"
            placeholder="example@gmail.com"
            rules={emailValidation}
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="heading2">Password</div>
            <div>
              <Link href={routes.ForgetPassword.url}>
                <a className="link animate">Forgot password?</a>
              </Link>
            </div>
          </div>
          <Input
            name="password"
            placeholder="***********"
            type="password"
            rules={passwordValidation}
          />
        </div>
        <Button type="primary" className="mt-5" htmlType="submit">
          LOGIN
        </Button>
      </div>
    </Form>
  );
};

export default Login;
