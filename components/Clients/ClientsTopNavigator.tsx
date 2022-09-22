/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import Input from "../Shared/Input";
import CustomButton from "../Shared/Button/button";

import { FC } from "react";
import { LatLng } from "use-places-autocomplete";
import { ClientsTopNavigatorTypes } from "../../lib/types/pageTypes/Clients/ClientsTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewClient from "../Forms/Clients/AddNewClient";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { usePostClientMutation } from "../../lib/api/endpoints/Clients/clientsEndpoint";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";

const { Text } = Typography;
const { Option } = Select;

type ObjectTypes = {
  id: number;
  name: string;
};

const ClientsTopNavigator: FC<ClientsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  clients,
  isClientsLoading,
  handleSearch,
  isCategoriesLoading,
  categories,
  onCategoryChange,
  onSortChange,
  handleDownloadClients,
  isDownloadingClientsLoading
}) => {
  const [form] = Form.useForm();
  const [offices, setOffices]: any = useState([]);
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();
  const [mainLocation, setMainLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();
  const [officeName, setOfficeName] = useState<{
    name: string;
    coordinates: LatLng;
  }>();
  const [postClient, { isLoading }] = usePostClientMutation();

  // ADD CLIENT
  const createOffices = () => {
    setOffices([
      ...offices,
      {
        id: offices.length + 1,
        location: location ? location?.name : "",
        coordinates: location ? JSON.stringify(location?.coordinates) : "",
        names: officeName ? officeName?.name : ""
        // type: "HQ"
      }
    ]);
    form.resetFields(["officeName"]);
    setLocation(undefined);
  };

  const onAddClientFinish = (values: any) => {
    postClient({
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      source: values?.source,
      offices: offices,
      location: mainLocation?.name,
      coordinates: values?.coordinates,
      tinNumber: values?.tinNumber,
      economicStatus: values?.economicStatus
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setOffices([]);
        setMainLocation(undefined);
        setOfficeName(undefined);
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
          {isClientsLoading ? (
            <span>...</span>
          ) : (
            <>
              {clients?.totalElements !== 0 && (
                <>
                  {clients?.totalElements &&
                    numbersFormatter(clients?.totalElements)}{" "}
                </>
              )}
            </>
          )}
          {clients?.totalElements === 0 ? (
            "No clients"
          ) : (
            <>{clients?.totalElements === 1 ? "Client" : "Clients"}</>
          )}
        </Text>
        <Input
          onChange={handleSearch}
          type="text"
          placeholder="Search name, location or phone"
          name="searchClient"
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
          onChange={onCategoryChange}
          name="categories"
          type="select"
          placeholder="Category: All categories"
          isGroupDropdown
          isLoading={isCategoriesLoading}
          suffixIcon={
            <Image
              preview={false}
              src="/icons/expand_more_black_24dp.svg"
              alt=""
              width={10}
            />
          }
        >
          <Option value="">All categories</Option>
          {categories?.map((item: ObjectTypes) => (
            <Option value={item?.id} key={item?.name}>
              {item?.name}
            </Option>
          ))}
        </Input>

        <Input
          onChange={onSortChange}
          placeholder="Sort: Name (A-Z)"
          type="select"
          label=""
          options={[
            { label: "Z-A (Names)", value: "names__desc" },
            { label: "A-Z (Names)", value: "names__asc" },
            { label: "Z-A (Locations)", value: "location__desc" },
            { label: "A-Z (Locations)", value: "location__asc" }
          ]}
          name="sortClients"
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
        <CustomButton
          onClick={handleDownloadClients}
          loading={isDownloadingClientsLoading}
          type="secondary"
        >
          <span className="text-sm">DOWNLOAD LIST</span>
        </CustomButton>
        <CustomButton onClick={showModal} type="primary">
          <span className="text-sm">NEW CLIENT</span>
        </CustomButton>
      </Col>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW CLIENT"
        loading={isLoading}
      >
        <AddNewClient
          onAddClientFinish={onAddClientFinish}
          createOffices={createOffices}
          offices={offices}
          setOffices={setOffices}
          isLoading={isLoading}
          setLocation={setLocation}
          location={location}
          setMainLocation={setMainLocation}
          mainLocation={mainLocation}
          officeName={officeName}
          setOfficeName={setOfficeName}
          form={form}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientsTopNavigator;
