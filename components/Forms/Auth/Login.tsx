import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Form from "antd/lib/form";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import {
  emailValidation,
  passwordValidation
} from "../../../lib/validation/InputValidations";
import { routes } from "../../../config/route-config";
import { LoginTypes } from "../../../lib/types/LoginTypes";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { useLoginMutation } from "../../../lib/api/endpoints/Auth/authEndpoints";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { setCredentials } from "../../../lib/redux/slices/authSlice";
import { LoginResponse } from "../../../lib/types/auth";
import { BackendErrorTypes } from "../../../lib/types/shared";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = (values: LoginTypes) => {
    login(values)
      .unwrap()
      .then((res: LoginResponse) => {
        if (res.payload) {
          dispatch(setCredentials(res));
        }
        router.push(routes.Orders.url);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <Form name="Login" onFinish={onFinish} layout="vertical" title="Login">
      <Row>
        <Col flex="auto">
          <Input
            name="username"
            type="text"
            label="Email"
            placeholder="example@gmail.com"
            rules={emailValidation}
          />
        </Col>
        <Col flex="auto" className="mt-6">
          <div className="flex items-center justify-between mb-[8px]">
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="mt-6">
          <Button
            loading={isLoading}
            type="primary"
            className="mt-5"
            htmlType="submit"
            id="login_button"
          >
            LOGIN
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
