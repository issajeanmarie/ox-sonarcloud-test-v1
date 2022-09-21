/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Form, Image, Popover, Row } from "antd";
import React, { FC, useState } from "react";
import { LatLng } from "use-places-autocomplete";
import { usePostClientLocationMutation } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { ClientLocationsTypes } from "../../../../lib/types/pageTypes/Clients/ClientLocationsTypes";
import Button from "../../../Shared/Button";
import AddClientLocation from "../../../Forms/Clients/AddClientLocation";
import ModalWrapper from "../../../Modals/ModalWrapper";
import CustomButton from "../../../Shared/Button/button";
import { SmallSpinLoader } from "../../../Shared/Loaders/Loaders";
import ClientLocationsTable from "../../../Tables/Clients/ClientLocationsTable";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";

const ClientLocations: FC<ClientLocationsTypes> = ({
  client,
  isClientFetching
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();
  const [locationName, setLocationName] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [postClientLocation, { isLoading: isPostingLocation }] =
    usePostClientLocationMutation();

  const handleAddClientLocationSuccess = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLocation(undefined);
  };

  const onAddClientLocationFinish = (value: any) => {
    handleAPIRequests({
      request: postClientLocation,
      id: client?.id,
      location: location ? location?.name : "",
      coordinates: location ? JSON.stringify(location?.coordinates) : "",
      names: value?.names,
      type: "BRANCH",
      showSuccess: true,
      handleSuccess: handleAddClientLocationSuccess
    });
  };

  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">LOCATIONS</span>
          </div>
        </Col>

        <Col flex="none">
          <CustomButton
            onClick={showModal}
            type="secondary"
            size="icon"
            icon={
              <Image
                src="/icons/ic-actions-add-simple.svg"
                alt=""
                width={12}
                preview={false}
              />
            }
          />
        </Col>
      </Row>
      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="w-full p-8">
        {client?.offices?.length === 0 ? (
          <>
            {isClientFetching ? (
              <SmallSpinLoader />
            ) : (
              <span className="font-light">Locations will appear here</span>
            )}
          </>
        ) : (
          <ClientLocationsTable
            offices={client?.offices}
            isClientFetching={isClientFetching}
          />
        )}
      </div>
      <ModalWrapper
        footerContent={
          <>
            {!location ? (
              <Popover
                placement="left"
                content={
                  <div className="flex flex-col">
                    <span className="font-light">Select location </span>
                    <span className="font-light">and names</span>
                  </div>
                }
                title={false}
                trigger="click"
              >
                <Button
                  form="AddClientLocation"
                  type="primary"
                  htmlType="submit"
                >
                  ADD LOCATION
                </Button>
              </Popover>
            ) : (
              <Button
                form="AddClientLocation"
                loading={isPostingLocation}
                type="primary"
                htmlType="submit"
              >
                ADD LOCATION
              </Button>
            )}
          </>
        }
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="CLIENT LOCATION"
        loading={isPostingLocation}
      >
        <AddClientLocation
          onAddClientLocationFinish={onAddClientLocationFinish}
          isLoading={isPostingLocation}
          setLocation={setLocation}
          location={location}
          setLocationName={setLocationName}
          locationName={locationName}
          form={form}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientLocations;
