import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import { DashboardHeader } from "./style";
import { StyledImageContainer, Text } from "../../themes/globalStyles";

const AppHeader = () => {
  return (
    <DashboardHeader justify="space-between" align="middle">
      <Col flex="auto">
        <Image
          src="/icons/OX_Logo.svg"
          alt="OX Delivery Logo"
          preview={false}
          style={{ width: "50px" }}
        />
      </Col>

      <Col flex="none">
        <Row align="middle" gutter={3}>
          <Col style={{ marginRight: "32px" }}>
            <Image
              src="/icons/ic-actions-notifications@4x.png"
              alt="OX Delivery Logo"
              width={24}
              preview={false}
            />
          </Col>
          <Col>
            <Image
              src="/icons/Social media icon.jpg"
              alt="OX Delivery Logo"
              style={{
                width: "36px",
                height: "36px",
                objectFit: "cover",
                borderRadius: "6px"
              }}
              preview={false}
            />
          </Col>

          <Col style={{ margin: "0 6px 0 12px" }}>
            <Text weight="700">Yves Honore</Text>
          </Col>

          <Col>
            <StyledImageContainer>
              <Image
                src="/icons/expand_more_black_24dp.svg"
                alt="OX Delivery Logo"
                preview={false}
                width={10}
              />
            </StyledImageContainer>
          </Col>
        </Row>
      </Col>
    </DashboardHeader>
  );
};

export default AppHeader;
