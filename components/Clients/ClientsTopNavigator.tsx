/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Row } from "antd";
import React, { useState } from "react";
import Input from "../Shared/Input";
import { FC } from "react";
import { LatLng } from "use-places-autocomplete";
import { ClientsTopNavigatorTypes } from "../../lib/types/pageTypes/Clients/ClientsTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewClient from "../Forms/Clients/AddNewClient";
import { usePostClientMutation } from "../../lib/api/endpoints/Clients/clientsEndpoint";
import DropDownSelector from "../Shared/DropDownSelector";
import Navbar from "../Shared/Content/Navbar";
import Heading1 from "../Shared/Text/Heading1";
import Button from "../Shared/Button";
import { localeString } from "../../utils/numberFormatter";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";

const ClientsTopNavigator: FC<ClientsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  clients,
  handleSearch,
  categories,
  handleDownloadClients,
  isDownloadingClientsLoading,
  defaultSelected,
  setDefaultSelected,
  sort,
  setSort,
  setCurrentPages
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
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  // ADD CLIENT
  const createOffices = () => {
    setOffices([
      ...offices,
      {
        id: offices.length + 1,
        location: location ? location?.name : "",
        coordinates: location ? JSON.stringify(location?.coordinates) : "",
        names: officeName
      }
    ]);
    form.resetFields(["officeName"]);
    setLocation(undefined);
  };

  const handleChangeOfficeName = (value: string) => {
    setOfficeName(value);
  };

  const handlePostClientSuccess = ({ payload }: any) => {
    setPhoneNumber("");
    setOffices([]);
    setMainLocation(undefined);
    form.resetFields();
    setIsModalVisible(false);

    dispatch(displayPaginatedData({ payload }));
  };

  const onAddClientFinish = (values: any) => {
    phoneNumber &&
      handleAPIRequests({
        request: postClient,
        names: values?.names,
        email: values?.email,
        phone: phoneNumber,
        source: values?.source,
        offices: offices,
        location: mainLocation?.name,
        coordinates: values?.coordinates,
        tinNumber: values?.tinNumber,
        economicStatus: values?.economicStatus,
        showSuccess: true,
        handleSuccess: handlePostClientSuccess
      });
  };

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>
          <Heading1>{localeString(clients?.totalElements)} Clients</Heading1>
        </Col>

        <Col>
          <Input
            onChange={handleSearch}
            type="text"
            placeholder="Search name, location or phone"
            name="searchClient"
            allowClear
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
            handleStateChange={() => setCurrentPages(1)}
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
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6 w-[120px]">
        <Button
          onClick={handleDownloadClients}
          loading={isDownloadingClientsLoading}
          type="secondary"
        >
          DOWNLOAD LIST
        </Button>
      </div>

      <div className="flex items-center gap-6 w-[120px]">
        <Button type="primary" onClick={showModal}>
          NEW CLIENT
        </Button>
      </div>
    </div>
  );

  return (
    <>
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
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>

      <Navbar type="CENTER" LeftSide={LeftSide} RightSide={RightSide} />
    </>
  );
};

export default ClientsTopNavigator;
