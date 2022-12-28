import { Col, Image, Row } from "antd";
import { useRouter } from "next/router";
import React from "react";
import CustomButton from "../components/Shared/Button/button";
import Layout from "../components/Shared/Layout";
import Heading1 from "../components/Shared/Text/Heading1";
import { routes } from "../config/route-config";

const Custom404 = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="h-[92vh] w-[100%] flex items-center justify-center">
        <Row gutter={46}>
          <Col>
            <Image src="/404.svg" alt="404 Page" preview={false} height={180} />
          </Col>

          <Col className="w-[300px] border-l border-dark">
            <Heading1 className="mb-6 block text-[32px]">Oops!</Heading1>

            <Heading1 className="mb-12 block normalText opacity_56">
              The page you are looking for is not available, make sure you used
              the correct link.
            </Heading1>

            <CustomButton
              onClick={() => router.push(routes.Orders.url)}
              type="primary"
              size="small"
            >
              Go home
            </CustomButton>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Custom404;
