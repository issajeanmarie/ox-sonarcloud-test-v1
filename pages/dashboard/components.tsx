/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Link from "next/link";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import Form from "antd/lib/form";
import { PlusOutlined } from "@ant-design/icons";
import CustomPhoneInput from "../../components/Shared/Custom/CustomPhoneInput";
import CircleCheckbox from "../../components/Shared/Custom/CircleCheckbox";
import DriversTable from "../../components/DriversTable";
import TopNavigator from "../../components/Shared/TopNavigator";
import { Header_Links } from "../../lib/types/links";
import CustomInput from "../../components/Shared/Input";
import CustomButton from "../../components/Shared/Button/button";
import Layout from "../../components/Shared/Layout";
import ImageUploader from "../../components/Shared/Input/imageUploader";

const { Text } = Typography;

const Comopnents = () => {
  const [checkbox, setCheckbox] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDepot, setSelectedDepot] = useState();
  const [lastWeek, setLastWeek] = useState("");
  const [validatePhone] = useState(false);
  const [startD, setStartDate] = useState("");
  const [endD, setEndDate] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadFailure, setUploadFailure] = useState(null);
  const [uploadedPicInfo, setUploadedPicInfo] = useState();
  const [, setUploadSuccess] = useState(false);
  const [allIMGs, setAllIMGs] = useState([]);

  const Links: Header_Links[] = [
    {
      label: "TRUCKS",
      id: "trucks"
    },
    {
      label: "REVENUE",
      id: "revenue"
    },
    {
      label: "MAP",
      id: "map"
    }
  ];

  const [active, setActive] = useState<string>("trucks");

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
    return startD;
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
    return endD;
  };
  const onLastWeekChange = (_: string, date: string) => {
    setLastWeek(date);
    return lastWeek;
  };

  const handleDepotChange = (value: any) => {
    setSelectedDepot(value);
    return selectedDepot;
  };

  return (
    <Layout>
      {/* PAGES NAVIGATION */}
      <TopNavigator
        headerLinks={Links}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onLastWeekChange={onLastWeekChange}
        handleDepotChange={handleDepotChange}
      />
      {/*
           ***
           FIRST SECTION
           **
           */}

      <Row className="p-5" gutter={160}>
        {/* FORMS */}
        <Col
          sm={{ span: 20 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
          className="mb32"
        >
          {/* NORMAL INPUT */}
          <Row gutter={24} align="bottom" className="mb-5">
            <Col sm={{ span: 24 }} xl={{ span: 16 }}>
              <CustomInput
                type="password"
                name="Name"
                label="Label"
                placeholder="*********"
              />
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
          <Row gutter={24} align="bottom" className="mb-5">
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
          <Row gutter={24} align="bottom" className="mb-4">
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
          <Text className="heading2 my-3">Phone number</Text>
          <div className="flex items-center gap-3 w-full">
            <Form.Item name="verifyAccountPhone">
              <CustomPhoneInput
                width=""
                name="verifyAccountPhone"
                validatePhone={validatePhone}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            </Form.Item>

            <CustomButton
              type="secondary"
              size="icon"
              loading={false}
              icon={<PlusOutlined />}
            />

            {/* BUTTON WITH CANCEL */}
            <div className="flex items-center bg_white_input radius5 py-[8px] gap-3 px-3 rounded cursor-pointer">
              <Text className="heading2">Button</Text>
              <Image
                className="pointer"
                width={12}
                src="/icons/ic-actions-close-simple.svg"
                preview={false}
                alt=""
              />
            </div>
          </div>
        </Col>

        {/* OTHER SIDE OF COMPONENTS */}
        <Col>
          {/* BUTTONS  */}
          <Row align="bottom" gutter={24} className="my-5">
            <Col sm={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 12 }}>
              <CustomButton type="primary">BUTTON</CustomButton>
            </Col>

            <Col sm={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
              <CustomButton type="primary" size="small">
                BUTTON
              </CustomButton>
            </Col>
          </Row>

          <Row align="bottom" gutter={24} className="my-5">
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
          <Row gutter={24} align="middle" className="mt-10">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <Col key={`${index * 2}-${day}`}>
                <Text className="rounded-full bg_white_input day_circle cursor-pointer">
                  {day}
                </Text>
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
      {/* <OrdersTable /> */}

      {/*
           ***
           THIRD SECTION
           **
           */}

      <Row className="p-5 mt-5" gutter={64}>
        <Col>
          <Card
            className="radius4"
            headStyle={{ border: "none", marginBottom: "0" }}
            bodyStyle={{ padding: "0 24px 24px 24px" }}
            style={{ width: 300 }}
            title={<Text className="normalText">Normal text</Text>}
            extra={
              <Image
                width={18}
                src="/icons/more_vert_FILL0_wght400_GRAD0_opsz48.svg"
                preview={false}
                alt=""
              />
            }
          >
            <Text className="text-2xl font-semibold block yellow mb-3">
              5,000,000 Rwf
            </Text>
            <Text className="captionText">Caption text</Text>
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
                    <Text className="normalText">Yellow card</Text>
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
          <ImageUploader
            uploadLoading={uploadLoading}
            setUploadLoading={setUploadLoading}
            uploadFailure={uploadFailure}
            setUploadFailure={setUploadFailure}
            uploadedPicInfo={uploadedPicInfo}
            setUploadedPicInfo={setUploadedPicInfo}
            setUploadSuccess={setUploadSuccess}
            allIMGs={allIMGs}
            setAllIMGs={setAllIMGs}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Comopnents;
