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
import CircleCheckbox from "../Custom/CircleCheckbox";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

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

      <Layout className="site-layout">
        <AppHeader collapsed={collapsed} toggle={toggle} />

        <Content className="bg_white black contents_container">
          {/* PAGES NAVIGATION */}
          <Row
            className="dashboard_header shadow"
            align="middle"
            justify="space-between"
          >
            {/* RIGHT SIDE  */}
            <Col>
              <Row align="middle" gutter={32}>
                <Col>
                  <Title className="black text14 fowe300 pointer lineh_normal mb0 dashboard_menu dashboard_menu_active">
                    TRUCKS
                  </Title>
                </Col>

                <Col>
                  <Title className="black text14 fowe300 pointer lineh0 mb0 dashboard_menu">
                    REVENUES
                  </Title>
                </Col>

                <Col>
                  <Title className="black text14 fowe300 pointer lineh0 mb0 dashboard_menu">
                    MAP
                  </Title>
                </Col>
              </Row>
            </Col>

            {/* LEFT SIDE */}
            <Col>Left side</Col>
          </Row>

          {/*
           ***
           FIRST SECTION
           **
           */}

          <Row className="pad24" gutter={100}>
            {/* FORMS */}
            <Col span={10}>
              {/* NORMAL INPUT */}
              <Row gutter={24} align="bottom">
                <Col span={16}>
                  <Form.Item className="mb12" name="name">
                    <Title className="text16 black fowe700">Label</Title>

                    <Input.Password
                      className="my_input"
                      placeholder="*** *** ***"
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="name">
                    <Input
                      style={{ height: "2.8rem" }}
                      className="my_input"
                      placeholder="Placeholder"
                      suffix={
                        <Image
                          width={14}
                          src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                          preview={false}
                          alt=""
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* SELECT AND OPTIONS */}
              <Row gutter={24} align="bottom">
                <Col span={16}>
                  <Form.Item name="name">
                    <Title className="text16 black fowe700">Label</Title>

                    <Select
                      showSearch
                      placeholder="Select someone"
                      size="large"
                      suffixIcon={
                        <Image
                          preview={false}
                          src="/icons/expand_more_black_24dp.svg"
                          alt=""
                          width={10}
                        />
                      }
                    >
                      <Option value="yves">Yves Bisemage</Option>
                      <Option value="lionel">Lionel Mpfizi</Option>
                      <Option value="issa">Issa Jean Marie</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col style={{ width: "200px" }}>
                  <Form.Item name="name">
                    <Row
                      wrap={false}
                      className="radius5"
                      align="middle"
                      style={{
                        border: "1px solid #dbdbdb",
                        padding: "4px 0 4px 12px",
                        height: "2.8rem"
                      }}
                    >
                      <Col span={6}>
                        <span className="fowe700 text14">Metric:</span>
                      </Col>

                      <Col span={18}>
                        <Select
                          className="except"
                          showSearch
                          placeholder="Select"
                          size="large"
                          suffixIcon={
                            <Image
                              preview={false}
                              src="/icons/expand_more_black_24dp.svg"
                              alt=""
                              width={10}
                            />
                          }
                        >
                          <Option value="yves">Option</Option>
                          <Option value="lionel">Option</Option>
                          <Option value="issa">Option</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>

              {/* TEXT AREA */}
              <Row gutter={24} align="bottom">
                <Col span={16}>
                  <Form.Item name="name">
                    <Title className="text16 black fowe700">Label</Title>

                    <Input.TextArea
                      className="my_input"
                      placeholder="Text area"
                      style={{ minHeight: "124px", padding: "12px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* DATEPICKER */}
              <Row gutter={24} align="bottom">
                <Col span={16}>
                  <Form.Item className="mb12" name="date">
                    <Title className="text16 black fowe700">Date picker</Title>

                    <DatePicker
                      className="my_datepicker"
                      allowClear={false}
                      name="date"
                      suffixIcon={
                        <Image
                          preview={false}
                          src="/icons/ic-actions-calendar.svg"
                          alt=""
                          width={22}
                        />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="name">
                    <DatePicker
                      className="my_datepicker"
                      allowClear={false}
                      name="date"
                      style={{ height: "2.8rem" }}
                      suffixIcon={
                        <Image
                          preview={false}
                          src="/icons/ic-actions-calendar.svg"
                          alt=""
                          width={18}
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* PHONE NUMBER */}
              <Title className="text16 black fowe700">Phone number</Title>
              <Row gutter={24} align="top">
                <Col span={16}>
                  <Form.Item className="mb12" name="date">
                    <DatePicker
                      className="my_datepicker"
                      allowClear={false}
                      name="date"
                      suffixIcon={
                        <Image
                          preview={false}
                          src="/icons/ic-actions-calendar.svg"
                          alt=""
                          width={22}
                        />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Row gutter={32} align="top">
                    <Col>
                      <Space className="pad12 radius5 bg_white_yellow">
                        <Image
                          width={18}
                          height={18}
                          src="/icons/ic-actions-add-simple.svg"
                          preview={false}
                          alt=""
                        />
                      </Space>
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
            <Col flex="auto">
              {/* BUTTONS  */}
              <Row align="bottom" gutter={24} className="mb24">
                <Col span={12}>
                  <Button className="my_button bg_yellow">BUTTON</Button>
                </Col>

                <Col span={6}>
                  <Button className="my_button sm bg_yellow">BUTTON</Button>
                </Col>
              </Row>

              <Row align="bottom" gutter={24} className="mb24">
                <Col span={12}>
                  <Button className="my_button bg_white_yellow yellow">
                    BUTTON
                  </Button>
                </Col>

                <Col span={6}>
                  <Button className="my_button sm bg_white_yellow yellow">
                    BUTTON
                  </Button>
                </Col>
              </Row>

              <Link href="#">
                <a className="black text16 underline ">Forgot password?</a>
              </Link>

              {/* TEXTURE  */}
              <Row align="bottom" gutter={32}>
                <Col>
                  <Title className="text24 black mt64">HEADING 1</Title>
                  <Title className="text18 black fowe300">Heading 2</Title>
                  <Title className="text16 black fowe400">Normal text</Title>
                  <Title className="text14 black fowe400 opacity_56 italic">
                    Caption text
                  </Title>
                  <Title className="text16 black fowe400">Normal text</Title>
                </Col>

                <Col>
                  <CircleCheckbox
                    defaultValue={true}
                    checked={checkbox}
                    setState={setCheckbox}
                    state={checkbox}
                  />
                </Col>
              </Row>

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
            className="dashboard_header shadow"
            align="middle"
            justify="space-between"
            style={{ padding: "12px 24px", marginTop: "120px" }}
          >
            {/* RIGHT SIDE  */}
            <Col>
              <Row gutter={20} align="middle">
                <Col>
                  <Image
                    className="pointer"
                    src="/icons/keyboard_backspace_black_24dp.svg"
                    alt="OX Delivery Logo"
                    width={24}
                    preview={false}
                  />
                </Col>

                <Col>
                  <Title className="black text16 mb0">Level 1</Title>
                </Col>

                <Col>
                  <Title className="black text16 mb0">/</Title>
                </Col>

                <Col>
                  <Title className="black text16 mb0">Level 2</Title>
                </Col>

                <Col>
                  <Title className="black text16 mb0">/</Title>
                </Col>

                <Col>
                  <Title className="opacity_56 black text16 mb0">Current</Title>
                </Col>
              </Row>
            </Col>

            {/* LEFT SIDE */}
            <Col span={3}>
              <Button className="my_button sm bg_yellow">ACTION</Button>
            </Col>
          </Row>

          <div style={{ width: "12%", margin: "64px auto" }}>
            <Button className="my_button sm bg_white_yellow yellow">
              Load more
            </Button>
          </div>

          {/*
           ***
           SECOND SECTION
           **
           */}

          {/* FILTERS */}
          <Row
            className="dashboard_header shadow mg_auto"
            align="middle"
            justify="space-between"
            style={{ padding: "12px 24px", width: "97%" }}
          >
            {/* RIGHT SIDE  */}
            <Col>
              <Row align="middle" gutter={24}>
                <Col>
                  <Title className="text16 fowe700 black mb0">
                    2,645 Orders
                  </Title>
                </Col>

                <Col style={{ width: "200px" }}>
                  <Form.Item name="name" className="mb0">
                    <Row
                      wrap={false}
                      className="radius5"
                      align="middle"
                      style={{
                        border: "1px solid #dbdbdb",
                        padding: "4px 0 4px 12px",
                        height: "2.8rem"
                      }}
                    >
                      <Col span={6}>
                        <span className="fowe700 text14">Filter:</span>
                      </Col>

                      <Col span={18}>
                        <Select
                          className="except"
                          showSearch
                          placeholder="Select"
                          size="large"
                          suffixIcon={
                            <Image
                              preview={false}
                              src="/icons/expand_more_black_24dp.svg"
                              alt=""
                              width={10}
                            />
                          }
                        >
                          <Option value="yves">Option</Option>
                          <Option value="lionel">Option</Option>
                          <Option value="issa">Option</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col>
                  <Form.Item name="name" className="mb0">
                    <DatePicker
                      className="my_datepicker"
                      allowClear={false}
                      placeholder="Start"
                      name="date"
                      style={{ height: "2.8rem" }}
                      suffixIcon={
                        <Image
                          preview={false}
                          src="/icons/ic-actions-calendar.svg"
                          alt=""
                          width={18}
                        />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col>
                  <Form.Item name="name" className="mb0">
                    <DatePicker
                      className="my_datepicker"
                      allowClear={false}
                      placeholder="End"
                      name="date"
                      style={{ height: "2.8rem" }}
                      suffixIcon={
                        <Image
                          preview={false}
                          src="/icons/ic-actions-calendar.svg"
                          alt=""
                          width={18}
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* LEFT SIDE */}
            <Col span={10}>
              <Row gutter={24} align="middle" justify="end">
                <Col span={6}>
                  <Form.Item name="name" className="mb0">
                    <Input
                      style={{ height: "2.8rem", margin: "0" }}
                      className="my_input"
                      placeholder="Placeholder"
                      suffix={
                        <Image
                          width={14}
                          src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                          preview={false}
                          alt=""
                        />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={9}>
                  <Button className="my_button sm bg_white_yellow yellow">
                    DOWNLOAD REPORT
                  </Button>
                </Col>

                <Col span={9}>
                  <Button className="my_button sm bg_yellow">NEW ORDER</Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/*
           ***
           THIRD SECTION
           **
           */}

          <Row className="pad24" align="top" gutter={64}>
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
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
