import { Col, Image, Row, Typography } from "antd";
import React from "react";
import Input from "../Shared/Input";
import CustomButton from "../Shared/Button/button";

import { FC } from "react";
import { ClientsTopNavigatorTypes } from "../../lib/types/pageTypes/Clients/ClientsTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewClient from "../Forms/Clients/AddNewClient";

const { Text } = Typography;

const ClientsTopNavigator: FC<ClientsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible
}) => {
  return (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1]"
    >
      <Col className="flex items-center gap-4">
        <Text className="heading2">520 Clients</Text>
        <Input
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
          placeholder="Category: All categories"
          type="select"
          label=""
          options={[
            { label: "Item one", value: "Item one" },
            { label: "Item two", value: "Item two" },
            { label: "Item three", value: "Item three" }
          ]}
          name="chooseCategory"
          suffixIcon={
            <Image
              preview={false}
              src="/icons/expand_more_black_24dp.svg"
              alt=""
              width={10}
            />
          }
        />
        <Input
          placeholder="Sort: Name (A-Z)"
          type="select"
          label=""
          options={[
            { label: "Item one", value: "Item one" },
            { label: "Item two", value: "Item two" },
            { label: "Item three", value: "Item three" }
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
        <CustomButton type="secondary">
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
      >
        <AddNewClient />
      </ModalWrapper>
    </Row>
  );
};

export default ClientsTopNavigator;
