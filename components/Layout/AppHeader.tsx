/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Space from "antd/lib/space";
import Dropdown from "antd/lib/dropdown";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader = ({ collapsed, toggle }: any) => {
  const userProfile = (
    <Space className="bg_white radius5 ">
      <Row gutter={24} align="middle" className="pad24">
        <Col>
          <Image
            className="radius8 img_fit"
            width={64}
            height={64}
            src="/icons/Social media icon.jpg"
            preview={false}
            alt=""
          />
        </Col>

        <Col>
          <Row>
            <Col>
              <Title className="text16 fowe700">Yves honore</Title>
              <Text className="text14 dark fowe400 opacity_56">
                yveshonore14@gmail.com
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={16} style={{ padding: "6px 24px" }}>
        <Col>
          <Image
            width={14}
            src="/icons/ic-actions-user_black.svg"
            preview={false}
            alt=""
          />
        </Col>
        <Col>
          <Text className="text14 dark fowe400 ">My account</Text>
        </Col>
      </Row>

      <Row gutter={16} style={{ padding: "6px 24px" }}>
        <Col>
          <Image
            width={14}
            src="/icons/ic-editor-block.svg"
            preview={false}
            alt=""
          />
        </Col>
        <Col>
          <Text className="text14 dark fowe400 ">Help</Text>
        </Col>
      </Row>

      <Row
        gutter={16}
        style={{
          padding: "12px 24px",
          marginTop: "12px",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          width: "100%"
        }}
      >
        <Col>
          <Image
            width={14}
            src="/icons/ic-actions-log-out.svg"
            preview={false}
            alt=""
          />
        </Col>
        <Col>
          <Text className="text14 dark fowe400 ">Logout</Text>
        </Col>
      </Row>
    </Space>
  );

  return (
    <Header
      className="bg_white black"
      style={{
        padding: "0",
        height: "fit-content"
      }}
    >
      <Row
        align="middle"
        justify="space-between"
        className="shadow"
        style={{ padding: "3px 24px" }}
      >
        <Col>
          <Row gutter={24} align="middle">
            <Col>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle
                }
              )}
            </Col>

            <Col>
              <Image
                width={54}
                src="/icons/OX_Logo.svg"
                preview={false}
                alt=""
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Row align="middle" gutter={42}>
            <Col>
              <Image
                className="radius8 img_fit"
                width={18}
                src="/icons/bell.svg"
                preview={false}
                alt=""
              />
            </Col>

            <Col>
              <Dropdown
                overlay={userProfile}
                placement="bottomRight"
                className="pointer"
              >
                <Row align="middle" gutter={12}>
                  <Col>
                    <Image
                      className="radius8 img_fit"
                      width={38}
                      height={38}
                      src="/icons/Social media icon.jpg"
                      preview={false}
                      alt=""
                    />
                  </Col>

                  <Col>
                    <Text className="black fowe700 text16">Yves Honore</Text>
                  </Col>

                  <Col>
                    <Image
                      className="radius8 img_fit"
                      width={8}
                      src="/icons/expand_more_black_24dp.svg"
                      preview={false}
                      alt=""
                    />
                  </Col>
                </Row>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
