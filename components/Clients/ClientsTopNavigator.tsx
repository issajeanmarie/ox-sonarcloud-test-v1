/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Image, Popover, Row } from "antd";
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
import FilterOrdersModal from "../../components/Shared/Modal";
import FilterClientForm from "../Forms/Clients/FilterClientForm";
import CircleCheckbox from "../Shared/Custom/CircleCheckbox";

const ClientsTopNavigator: FC<ClientsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  clients,
  handleSearch,
  categories,
  handleDownloadClients,
  isDownloadingClientsLoading,
  setDefaultSelected,
  sort,
  setSort,
  setCurrentPages,
  setStart,
  setEnd
}) => {
  const [receiveNotification, setReceiveNotification] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
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
  const [phoneNumber, setPhoneNumber] = useState("");

  const [postClient, { isLoading }] = usePostClientMutation();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  // ADD CLIENT
  const createOffices = () => {
    setOffices([
      ...offices,
      {
        id: offices?.length + 1,
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
    setReceiveNotification(false);

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
        receiveNotification: receiveNotification,
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
            label="Sort"
            dropDownContent={[
              { id: 0, name: "Z-A (Names)", value: "names__desc" },
              { id: 1, name: "A-Z (Names)", value: "names__asc" },
              { id: 2, name: "Z-A (Locations)", value: "location__desc" },
              { id: 3, name: "A-Z (Locations)", value: "location__asc" },
              {
                id: 4,
                name: "Z-A (Pending payment)",
                value: "pending_amount__desc"
              },
              {
                id: 5,
                name: "A-Z (Pending payment)",
                value: "pending_amount__asc"
              }
            ]}
            defaultSelected={sort}
            setDefaultSelected={setSort}
          />
        </Col>

        <Col>
          <div
            className={` rounded p-3 flex items-center justify-center ${
              isFiltered ? "border border-ox-yellow" : "border border-gray-200 "
            } `}
          >
            <Image
              width={16}
              height={16}
              src="/icons/filter.svg"
              data-test-id="order-filter"
              onClick={() => setIsVisible(true)}
              className="cursor-pointer"
              alt="Filter icon"
              preview={false}
            />
          </div>
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
      <FilterOrdersModal
        isModalVisible={isVisible}
        setIsModalVisible={setIsVisible}
      >
        <FilterClientForm
          categories={categories}
          setStart={setStart}
          setEnd={setEnd}
          setDefaultSelected={setDefaultSelected}
          setIsVisible={setIsVisible}
          setCurrentPages={setCurrentPages}
          setIsFiltered={setIsFiltered}
        />
      </FilterOrdersModal>

      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW CLIENT"
        loading={isLoading}
        footerWidth={24}
        footerContent={
          <Row className="w-[100%]" justify="space-between" align="middle">
            <Col>
              <div className="flex items-center gap-4">
                <div className="text-sm underline font-bold">
                  Receive notification
                </div>
                <div>
                  <CircleCheckbox
                    defaultValue={false}
                    checked={receiveNotification}
                    setState={setReceiveNotification}
                    state={receiveNotification}
                  />
                </div>
              </div>
            </Col>

            <Col>
              {!mainLocation ? (
                <Popover
                  placement="left"
                  content={
                    <div className="flex flex-col">
                      <span className="font-light"> Add main location</span>
                    </div>
                  }
                  title={false}
                  trigger="click"
                >
                  <Button form="AddNewClient" type="primary">
                    ADD CLIENT
                  </Button>
                </Popover>
              ) : (
                <Button
                  form="AddNewClient"
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                >
                  ADD CLIENT
                </Button>
              )}
            </Col>
          </Row>
        }
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
