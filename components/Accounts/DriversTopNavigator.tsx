/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row, Typography } from "antd";
import React from "react";
import Input from "../Shared/Input";
import CustomButton from "../Shared/Button/button";
import { FC } from "react";
import { DriversTopNavigatorTypes } from "../../lib/types/pageTypes/Accounts/Drivers/DriversTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewDriver from "../Forms/Accounts/Drivers/AddNewDriver";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { usePostDriverMutation } from "../../lib/api/endpoints/Accounts/driversEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";
import DropDownSelector from "../Shared/DropDownSelector";

const { Text } = Typography;

const DriversTopNavigator: FC<DriversTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Drivers,
  isDriversLoading,
  handleSearch,
  selectedFilter,
  setSelectedFilter,
  selectedSort,
  setSelectedSort
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
        <Row gutter={24} align="middle">
          <Col>
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
