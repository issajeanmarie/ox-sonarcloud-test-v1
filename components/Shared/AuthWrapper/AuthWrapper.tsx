import React from "react";
import { Col, Row } from "antd";
import Router from "next/router";
import Image from "antd/lib/image";
import { AuthWrapperTypes } from "../../../lib/types/components/AuthWrapperTypes";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";

const AuthWrapper = ({ children, title }: AuthWrapperTypes) => {
  return (
    <Row style={{ height: "100vh" }} className="bg_dark">
      <Col className="auth_left" xs={24} sm={24} md={16} lg={16} xl={16} />

      <Col className="auth_right" xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="form_container">
          <Row
            justify={`${
              Router.pathname === routes.ResetPasswordSent.url
                ? "center"
                : "end"
            }`}
            className="mb64"
          >
            <Col>
              <Image
                className="cursor-pointer"
                onClick={() => changeRoute(routes.login.url)}
                width={100}
                src="/icons/OX_Logo.svg"
                preview={false}
                alt=""
              />
            </Col>
          </Row>

          <div className="heading1 uppercase my-10 text-2xl">{title}</div>
          {children}
        </div>
      </Col>
    </Row>
  );
};

export default AuthWrapper;
