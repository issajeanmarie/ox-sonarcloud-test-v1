/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Image, Row } from "antd";
import React, { FC, useState } from "react";
import { usePostClientLocationMutation } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { ClientLocationsTypes } from "../../../../lib/types/pageTypes/Clients/ClientLocationsTypes";
import {
  BackendErrorTypes,
  GenericResponse
} from "../../../../lib/types/shared";
import AddClientLocation from "../../../Forms/Clients/AddClientLocation";
import ModalWrapper from "../../../Modals/ModalWrapper";
import CustomButton from "../../../Shared/Button/button";
import { ErrorMessage } from "../../../Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../../../Shared/Messages/SuccessMessage";
import ClientLocationsTable from "../../../Tables/Clients/ClientLocationsTable";

const ClientLocations: FC<ClientLocationsTypes> = ({
  client,
  isClientFetching
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [postClientLocation, { isLoading: isPostingLocation }] =
    usePostClientLocationMutation();

  const onAddClientLocationFinish = (values: any) => {
    postClientLocation({
      id: client?.id,
      location: values?.location,
      coordinates: "",
      names: values?.names,
      type: values?.type
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
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
                alt="OX Delivery Logo"
                width={12}
                preview={false}
              />
            }
          />
        </Col>
      </Row>
      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="w-full p-8">
        <ClientLocationsTable
          offices={client?.offices}
          isClientFetching={isClientFetching}
        />
      </div>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW CLIENT LOCATION"
        loading={isPostingLocation}
      >
        <AddClientLocation
          onAddClientLocationFinish={onAddClientLocationFinish}
          isLoading={isPostingLocation}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientLocations;
