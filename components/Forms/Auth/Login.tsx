import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import {
  emailValidation,
  passwordValidation
} from "../../../lib/validation/InputValidations";
import { routes } from "../../../config/route-config";
import { LoginTypes } from "../../../lib/types/LoginTypes";

const { Title } = Typography;

const Login = () => {
  const router = useRouter();
  const onFinish = (values: LoginTypes) => {
    router.push(routes.Orders.url);
    return values;
  };

  return (
    <Form name="Login" onFinish={onFinish} layout="vertical" title="Login">
      <Title className="text16 black fowe700">Email</Title>
      <Form.Item name="username" rules={emailValidation}>
        <Input className="my_input" placeholder="example@gmail.com" />
      </Form.Item>

      <Row align="top" justify="space-between">
        <Col>
          <Title className="text16 black fowe700">Password</Title>
        </Col>

        <Col>
          <Link href={routes.ForgetPassword.url}>
            <a className="black text16 underline">Forgot password?</a>
          </Link>
        </Col>
      </Row>

      <Form.Item name="password" rules={passwordValidation} className="mb42">
        <Input.Password
          className="my_input"
          placeholder="* * * * * * * *"
          name="password"
        />
      </Form.Item>

      <Button className="my_button bg_yellow" htmlType="submit">
        LOGIN
      </Button>
    </Form>
  );
};

export default Login;
