/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row, Select, Typography } from "antd";
import React from "react";
import Input from "../Shared/Input";
import CustomButton from "../Shared/Button/button";

import { FC } from "react";
import { DriversTopNavigatorTypes } from "../../lib/types/pageTypes/Drivers/DriversTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewDriver from "../Forms/Drivers/AddNewDriver";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { usePostDriverMutation } from "../../lib/api/endpoints/Accounts/driversEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";

const { Text } = Typography;
const { Option } = Select;

const DriversTopNavigator: FC<DriversTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Drivers,
  isDriversLoading,
  handleSearch,
  onFilterChange,
  onSortChange
}) => {
  const [form] = Form.useForm();
  const [postDriver, { isLoading }] = usePostDriverMutation();

  const onAddDriverFinish = (values: any) => {
    postDriver({
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      drivingLicense: values?.drivingLicense,
      password: values?.password,
      gender: values?.gender
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(
          err?.data?.payload
            ? err?.data?.payload[0]?.messageError
            : err?.data?.message
        )
      );
  };

  return (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1]"
    >
      <Col className="flex items-center gap-4">
        <Text className="heading2 flex items-center">
          {isDriversLoading ? (
            <span>...</span>
          ) : (
            <>
              {Drivers?.totalElements !== 0 && (
                <>
                  {Drivers?.totalElements &&
                    numbersFormatter(Drivers?.totalElements)}{" "}
                </>
              )}
            </>
          )}
          {Drivers?.totalElements === 0 ? (
            "No Drivers"
          ) : (
            <>{Drivers?.totalElements === 1 ? "Driver" : "Drivers"}</>
          )}
        </Text>
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

        <Input
          onChange={onFilterChange}
          name="status"
          type="select"
          placeholder="Filter: All drivers"
          isGroupDropdown
          suffixIcon={
            <Image
              preview={false}
              src="/icons/expand_more_black_24dp.svg"
              alt=""
              width={10}
            />
          }
        >
          <Option value="ALL">All drivers</Option>
          <Option value="ACTIVE">Active</Option>
          <Option value="INACTIVE">Inactive</Option>
        </Input>

        <Input
          onChange={onSortChange}
          placeholder="Sort: Names (A-Z)"
          type="select"
          label=""
          options={[
            { label: "Z-A (Names)", value: "NAMES_DESC" },
            { label: "A-Z (Names)", value: "NAMES_ASC" },
            { label: "Z-A (Date)", value: "DATE_DESC" },
            { label: "A-Z (Date)", value: "DATE_ASC" }
          ]}
          name="sortDrivers"
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

      <Col className="flex items-center gap-4">
        <CustomButton onClick={showModal} type="primary">
          <span className="text-sm">NEW DRIVER</span>
        </CustomButton>
      </Col>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW DRIVER"
        loading={isLoading}
      >
        <AddNewDriver
          onAddDriverFinish={onAddDriverFinish}
          isLoading={isLoading}
          form={form}
        />
      </ModalWrapper>
    </Row>
  );
};

export default DriversTopNavigator;
