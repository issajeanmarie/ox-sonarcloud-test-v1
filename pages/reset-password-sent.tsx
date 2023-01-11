import Image from "antd/lib/image";
import Link from "next/link";
import React from "react";
import { Button as AntButton } from "antd";
import AuthWrapper from "../components/Shared/AuthWrapper";
import Button from "../components/Shared/Button";
import WithPublicRoute from "../components/Shared/Routes/WithPublicRoute";
import { routes } from "../config/route-config";

const ResetPasswordSent = () => {
  return (
    <AuthWrapper title="">
      <div className="mt-20 flex justify-center items-center flex-col">
        <Image
          src="/mail_sent.svg"
          alt=""
          width="100px"
          height="100px"
          preview={false}
        />
        <div className="mt-4 text-center">
          <span className="text-black">
            A link to reset your password <br /> was sent to your mail box
          </span>

          <a href="https://gmail.com/" target="_blank" rel="noreferrer">
            <Button type="primary" className="mt-5" htmlType="submit">
              Open Gmail
            </Button>
          </a>
          <Link href={routes.login.url} passHref>
            <AntButton type="text" className="mt-4" htmlType="button">
              Not now?
            </AntButton>
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default WithPublicRoute(ResetPasswordSent);
