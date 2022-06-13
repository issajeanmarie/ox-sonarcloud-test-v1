import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "antd/lib/layout";
import Space from "antd/lib/space";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import { getMenuFold, setMenuFold } from "../../helpers/handleLocalStorage";
import AppSider from "./AppSider";
import AppHeader from "./AppHeader";
import CustomPhoneInput from "../Custom/CustomPhoneInput";
import CircleCheckbox from "../Custom/CircleCheckbox";
import DriversTable from "../DriversTable";
import OrdersTable from "../OrdersTable";
import TopNavigator from "../Shared/TopNavigator";
import { Header_Links } from "../../lib/types/links";
import CustomInput from "../Shared/Input";
import { PlusOutlined } from "@ant-design/icons";
import CustomButton from "../Shared/Button/button";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validatePhone] = useState(false);

  const Links: Header_Links[] = [
    {
      label: "TRUCKS",
      id: "trucks"
    },
    {
      label: "REVENUES",
      id: "revenues"
    },
    {
      label: "MAP",
      id: "map"
    }
  ];

  useEffect(() => {
    const menuRes = getMenuFold();
    setCollapsed(menuRes);
  }, []);

  const toggle = () => {
    setMenuFold({ menuFold: !collapsed });
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <AppSider collapsed={collapsed} />

      <Layout>
        <AppHeader collapsed={collapsed} toggle={toggle} />

        <Content className="bg-ox-white text-black contents_container">
          {/* PAGES NAVIGATION */}
          <TopNavigator headerLinks={Links} />
          {/*
           ***
           FIRST SECTION
           **
           */}

          <Row className="pad24" gutter={160}>
            {/* FORMS */}
            <Col
              sm={{ span: 20 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
              className="mb32"
            >
              {/* NORMAL INPUT */}
              <Row gutter={24} align="bottom">
                <Col sm={{ span: 24 }} xl={{ span: 16 }}>
                  <CustomInput type="text" name="Name" label="Label" />
                </Col>

                <Col sm={{ span: 24 }} xl={{ span: 8 }}>
                  <CustomInput
                    type="text"
                    placeholder="Placeholder"
                    name="search"
                    size="small"
                    suffixIcon={
                      <Image
                        width={10}
                        src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                        preview={false}
                        alt=""
                      />
                    }
                  />
                </Col>
              </Row>

              {/* SELECT AND OPTIONS */}
              <Row gutter={24} align="bottom">
                <Col span={16}>
                  <CustomInput
                    type="select"
                    label="Label"
                    placeholder="Choose user"
                    options={[
                      { label: "Lionel Mpfizi", value: "lm" },
                      { label: "KBM", value: "kbm" },
                      { label: "Issa J Marie", value: "Ijm" }
                    ]}
                    name="users"
                    suffixIcon={
                      <Image
                        preview={false}
                        src="/icons/expand_more_black_24dp.svg"
                        alt=""
                        width={10}
                      />
                    }
                  />
                </Col>

                {/* <Col style={{ width: "200px" }}>
                  <Form.Item name="name">
                    <Select
                      className="my_input sm"
                      showSearch
                      placeholder="Select"
                      size="large"
                      prefixCls="hello"
                      suffixIcon={
                        <Image
                          preview={false}
                          src="/icons/expand_more_black_24dp.svg"
                          alt=""
                          width={10}
                        />
                      }
                    />
                  </Form.Item>
                </Col> */}
              </Row>

              {/* TEXT AREA */}
              <Row gutter={24} align="bottom">
                <Col sm={{ span: 24 }} xl={{ span: 16 }}>
                  <CustomInput type="text_area" label="Label" name="message" />
                </Col>
              </Row>

              {/* DATEPICKER */}
              <Row gutter={24} align="bottom">
                <Col sm={{ span: 24 }} xl={{ span: 16 }}>
                  <CustomInput
                    type="date"
                    label="Date picker"
                    suffixIcon={
                      <Image
                        preview={false}
                        src="/icons/ic-actions-calendar.svg"
                        alt=""
                        width={18}
                      />
                    }
                    name="date"
                  />
                </Col>

                <Col sm={{ span: 25 }} xl={{ span: 8 }}>
                  <CustomInput
                    type="date"
                    name="date"
                    size="small"
                    suffixIcon={
                      <Image
                        preview={false}
                        src="/icons/ic-actions-calendar.svg"
                        alt=""
                        width={18}
                      />
                    }
                  />
                </Col>
              </Row>

              {/* PHONE NUMBER */}
              <Title className="text16 black fowe700">Phone number</Title>
              <Row gutter={24} align="top">
                <Col span={16}>
                  <Form.Item className="mb12" name="verifyAccountPhone">
                    <CustomPhoneInput
                      width=""
                      name="verifyAccountPhone"
                      validatePhone={validatePhone}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                    />
                  </Form.Item>
                </Col>

                <Col xl={{ span: 24 }} xxl={{ span: 8 }}>
                  <Row gutter={32} align="top">
                    <Col>
                      <CustomButton
                        type="secondary"
                        size="icon"
                        loading={false}
                        icon={<PlusOutlined />}
                      />
                    </Col>

                    {/* BUTTON WITH CANCEL */}
                    <Col>
                      <Space>
                        <Row
                          className="bg_white_input radius5"
                          style={{ padding: "8px 0" }}
                          align="middle"
                          justify="space-between"
                          gutter={32}
                        >
                          <Col className="uppercase fowe700 text12">Button</Col>
                          <Col>
                            <Image
                              className="pointer"
                              width={12}
                              src="/icons/ic-actions-close-simple.svg"
                              preview={false}
                              alt=""
                            />
                          </Col>
                        </Row>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            {/* OTHER SIDE OF COMPONENTS */}
            <Col flex="auto" className="mb32">
              {/* BUTTONS  */}
              <Row align="bottom" gutter={24} className="mb24">
                <Col sm={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 12 }}>
                  <CustomButton type="primary">BUTTON</CustomButton>
                </Col>

                <Col sm={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
                  <CustomButton type="primary" size="small">
                    BUTTON
                  </CustomButton>
                </Col>
              </Row>

              <Row align="bottom" gutter={24} className="mb24">
                <Col sm={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 12 }}>
                  <CustomButton type="secondary">BUTTON</CustomButton>
                </Col>

                <Col sm={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
                  <CustomButton type="secondary" size="small">
                    BUTTON
                  </CustomButton>
                </Col>
              </Row>

              <Link href="#">
                <a className="link animate">Forgot password?</a>
              </Link>

              {/* TEXTURE  */}
              <div className="mt-10">
                <div className="flex flex-col gap-2">
                  <Text className="heading1">HEADING 1</Text>
                  <Text className="heading2">Heading 2</Text>
                  <Text className="normalText">Normal text</Text>
                  <Text className="captionText block">caption text</Text>
                  <Text className="normalText">Normal text</Text>
                </div>

                <div className="mt-3">
                  <CircleCheckbox
                    defaultValue={true}
                    checked={checkbox}
                    setState={setCheckbox}
                    state={checkbox}
                  />
                </div>
              </div>

              {/* DAYS */}
              <Row gutter={24} align="middle" className="mt64">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <Col key={`${index * 2}-${day}`}>
                    <Title className="fowe400 pointer text14 radius50 bg_white_input pad12 day_circle">
                      {day}
                    </Title>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          {/* BREADCUMB */}
          <Row
            className="dashboard_header shadow mb32"
            align="middle"
            justify="space-between"
            style={{ padding: "12px 24px" }}
          >
            {/* RIGHT SIDE  */}
            <Col>
              <div className="flex items-center gap-4">
                <Image
                  className="pointer"
                  src="/icons/keyboard_backspace_black_24dp.svg"
                  alt="OX Delivery Logo"
                  width={20}
                  preview={false}
                />

                <Text className="heading2">Level 1</Text>

                <Text className="heading2">/</Text>

                <Text className="heading2">Level 2</Text>

                <Text className="heading2">/</Text>

                <Text className="opacity_56 normalText">Current</Text>
              </div>
            </Col>

            {/* LEFT SIDE */}
            <Col span={3}>
              <CustomButton type="primary">ACTION</CustomButton>
            </Col>
          </Row>

          {/* DRIVERS TABLE */}
          <DriversTable />

          <div style={{ width: "12%", margin: "32px auto" }}>
            <CustomButton type="secondary">Load more</CustomButton>
          </div>

          {/*
           ***
           SECOND SECTION
           **
           */}

          {/* FILTERS */}
          <div className="flex items-center justify-between dashboard_header shadow p-4">
            {/* LEFT SIDE  */}
            <div className="flex items-center gap-4">
              <Text className="heading2 ">2,645 Orders</Text>
              <CustomInput
                type="date"
                name="date"
                size="small"
                suffixIcon={
                  <Image
                    preview={false}
                    src="/icons/ic-actions-calendar.svg"
                    alt=""
                    width={18}
                  />
                }
              />

              <CustomInput
                type="date"
                name="date"
                size="small"
                suffixIcon={
                  <Image
                    preview={false}
                    src="/icons/ic-actions-calendar.svg"
                    alt=""
                    width={18}
                  />
                }
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
              <CustomInput
                type="text"
                name="search"
                size="small"
                placeholder="Placeholder"
                suffixIcon={
                  <Image
                    width={14}
                    src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                    preview={false}
                    alt=""
                  />
                }
              />

              <CustomButton type="secondary" size="small">
                DOWNLOAD REPORT
              </CustomButton>

              <CustomButton type="primary" size="small">
                NEW ORDER
              </CustomButton>
            </div>
          </div>

          {/* DRIVERS TABLE */}
          <OrdersTable />

          {/*
           ***
           THIRD SECTION
           **
           */}

          <Row className="pad24 mt32" align="top" gutter={64}>
            <Col>
              <Card
                className="radius4"
                headStyle={{ border: "none", marginBottom: "0" }}
                bodyStyle={{ padding: "0 24px 24px 24px" }}
                style={{ width: 300 }}
                title={
                  <Title className="text16 black fowe400 mt0">
                    Normal text
                  </Title>
                }
                extra={
                  <Image
                    width={18}
                    src="/icons/more_vert_FILL0_wght400_GRAD0_opsz48.svg"
                    preview={false}
                    alt=""
                  />
                }
              >
                <Title className="text24 yellow">5,000,000 Rwf</Title>
                <Title className="text14 black fowe400 opacity_56 italic">
                  Caption text
                </Title>
              </Card>
            </Col>

            {/* YELLOW CARD  */}
            <Col>
              <Card
                className="radius4"
                headStyle={{ border: "none", marginBottom: "0" }}
              >
                <Row align="middle" gutter={64}>
                  <Col flex="auto">
                    <Row align="middle" gutter={24}>
                      <Col>
                        <Image
                          width={24}
                          src="/icons/description_FILL0_wght400_GRAD0_opsz48.svg"
                          preview={false}
                          alt=""
                        />
                      </Col>

                      <Col>
                        <Title className="text16 black fowe400 mb0">
                          Yellow card
                        </Title>
                      </Col>
                    </Row>
                  </Col>

                  <Col flex="none">
                    <Row align="middle" gutter={16}>
                      <Col>
                        <Image
                          className="pointer"
                          width={18}
                          src="/icons/download.svg"
                          preview={false}
                          alt=""
                        />
                      </Col>

                      <Col>
                        <Image
                          className="pointer"
                          width={18}
                          src="/icons/download.svg"
                          preview={false}
                          alt=""
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* UPLOAD CARD */}
            <Col>
              <Space className="upload_card flex align_center justify_center flex_column radius5 pointe4">
                <Input className="upload_input" type="file" />
                <Image
                  width={32}
                  src="/icons/add_photo_alternate_FILL0_wght400_GRAD0_opsz48.svg"
                  preview={false}
                  alt=""
                />

                <Title className="text14 black fowe400">Add image</Title>
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
