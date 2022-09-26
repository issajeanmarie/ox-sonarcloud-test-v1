/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row, Typography } from "antd";
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
import DropDownSelector from "../Shared/DropDownSelector";

const { Text } = Typography;

const ClientsTopNavigator: FC<ClientsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  clients,
  isClientsLoading,
  handleSearch,
  categories,
  handleDownloadClients,
  isDownloadingClientsLoading,
  defaultSelected,
  setDefaultSelected,
  sort,
  setSort
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
  const [officeName, setOfficeName] = useState("");
  const [postClient, { isLoading }] = usePostClientMutation();

  // ADD CLIENT
  const createOffices = () => {
    setOffices([
      ...offices,
      {
        id: offices.length + 1,
        location: location ? location?.name : "",
        coordinates: location ? JSON.stringify(location?.coordinates) : "",
        names: officeName
        // type: "HQ"
      }
    ]);
    form.resetFields(["officeName"]);
    setLocation(undefined);
  };

  const handleChangeOfficeName = (value: string) => {
    setOfficeName(value);
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
      className="bg-white py-3 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1]"
    >
      <Col className="flex items-center gap-4">
        <Row gutter={24} align="middle" wrap={false}>
          <Col>
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
          </Col>

          <Col>
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
          </Col>

          <Col>
            <DropDownSelector
              label="Category"
              dropDownContent={
                categories
                  ? [{ name: "All categories", id: undefined }, ...categories]
                  : []
              }
              defaultSelected={defaultSelected}
              setDefaultSelected={setDefaultSelected}
            />
          </Col>

          <Col>
            <DropDownSelector
              label="Sort"
              dropDownContent={[
                { id: 0, name: "Z-A (Names)", value: "names__desc" },
                { id: 1, name: "A-Z (Names)", value: "names__asc" },
                { id: 2, name: "Z-A (Locations)", value: "location__desc" },
                { id: 3, name: "A-Z (Locations)", value: "location__asc" }
              ]}
              defaultSelected={sort}
              setDefaultSelected={setSort}
            />
          </Col>
        </Row>
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
          handleChangeOfficeName={handleChangeOfficeName}
          form={form}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientsTopNavigator;
