import Image from "next/image";
import React from "react";
import AuthWrapper from "../components/Shared/AuthWrapper";
import Button from "../components/Shared/Button";
import WithPublicRoute from "../components/Shared/Routes/WithPublicRoute";

const ResetPasswordSent = () => {
  return (
    <AuthWrapper title="">
      <div className="mt-20 flex justify-center items-center flex-col">
        <Image src="/mail_sent.svg" alt="" width="100px" height="100px" />
        <div className="mt-4 text-center">
          <span className="text-black">
            A link to reset your password <br /> was sent to your mail box
          </span>

          <a href="https://gmail.com/" target="_blank" rel="noreferrer">
            <Button type="primary" className="mt-5" htmlType="submit">
              Open Gmail
            </Button>
          </a>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default WithPublicRoute(ResetPasswordSent);
