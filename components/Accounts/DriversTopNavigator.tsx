/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row } from "antd";
import React, { useState } from "react";
import Input from "../Shared/Input";
import { FC } from "react";
import { DriversTopNavigatorTypes } from "../../lib/types/pageTypes/Accounts/Drivers/DriversTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewDriver from "../Forms/Accounts/Drivers/AddNewDriver";
import { usePostDriverMutation } from "../../lib/api/endpoints/Accounts/driversEndpoints";
import DropDownSelector from "../Shared/DropDownSelector";
import Navbar from "../Shared/Content/Navbar";
import Button from "../Shared/Button";
import Heading1 from "../Shared/Text/Heading1";
import { localeString } from "../../utils/numberFormatter";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";
import passwordGenerator from "../../utils/passwordGenerator";

const DriversTopNavigator: FC<DriversTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Drivers,
  handleSearch,
  selectedFilter,
  setSelectedFilter,
  selectedSort,
  setSelectedSort
}) => {
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postDriver, { isLoading }] = usePostDriverMutation();
  const dispatch = useDispatch();

  const handleAddDriverSuccess = ({ payload }: any) => {
    form.resetFields();
    setIsModalVisible(false);
    setPhoneNumber("");

    dispatch(displayPaginatedData({ payload }));
  };

  const onAddDriverFinish = (values: any) => {
    phoneNumber &&
      handleAPIRequests({
        request: postDriver,
        names: values?.names,
        email: values?.email,
        phone: phoneNumber,
        password: passwordGenerator(),
        gender: values?.gender,
        showSuccess: true,
        handleSuccess: handleAddDriverSuccess
      });
  };

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle">
        <Col>
          <Heading1>{localeString(Drivers?.totalElements)} Drivers</Heading1>
        </Col>

        <Col>
          <Input
            onChange={handleSearch}
            type="text"
            placeholder="Search driver"
            name="searchDriver"
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

        <Col>
          <DropDownSelector
            label="Filter"
            setDefaultSelected={setSelectedFilter}
            defaultSelected={selectedFilter}
            dropDownContent={[
              { id: 0, name: "All", value: "ALL" },
              { id: 1, name: "Active", value: "ACTIVE" },
              { id: 2, name: "Inactive", value: "INACTIVE" }
            ]}
          />
        </Col>

        <Col>
          <DropDownSelector
            label="Sort"
            setDefaultSelected={setSelectedSort}
            defaultSelected={selectedSort}
            dropDownContent={[
              { id: 0, name: "Z-A (Names)", value: "NAMES_DESC" },
              { id: 1, name: "A-Z (Names)", value: "NAMES_ASC" },
              { id: 2, name: "Z-A (Date)", value: "DATE_DESC" },
              { id: 3, name: "A-Z (Date)", value: "DATE_ASC" }
            ]}
          />
        </Col>
      </Row>
    </Col>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6 w-[120px]">
        <Button type="primary" onClick={showModal}>
          NEW DRIVER
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW DRIVER"
        loading={isLoading}
        footerContent={
          <Button
            form="AddNewDriver"
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            ADD DRIVER
          </Button>
        }
      >
        <AddNewDriver
          onAddDriverFinish={onAddDriverFinish}
          isLoading={isLoading}
          form={form}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default DriversTopNavigator;
