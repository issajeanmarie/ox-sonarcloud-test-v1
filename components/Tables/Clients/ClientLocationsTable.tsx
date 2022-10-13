/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientLocationsTableTypes } from "../../../lib/types/pageTypes/Clients/ClientLocationsTableTypes";
import RowsWrapper from "../RowsWrapper";
import { FC, useState } from "react";
import { Button, Form } from "antd";
import {
  useDeleteClientLocationMutation,
  useEditClientLocationMutation
} from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import ActionModal from "../../Shared/ActionModal";
import { useRouter } from "next/router";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditClientLocation from "../../Forms/Clients/EditClientLocation";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import Image from "next/image";
import { LatLng } from "use-places-autocomplete";
import { RemoveCircleOutlineIcon } from "../../Icons";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const { Text } = Typography;

type ClientLocationsTypes = {
  offices: any;
  isClientFetching: boolean;
};

const ClientLocationsTable: FC<ClientLocationsTypes> = ({
  offices,
  isClientFetching
}) => {
  const { query } = useRouter();
  const [form] = Form.useForm();

  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const [itemToDelete, setItemToDelete]: any = useState();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = (record: any) => {
    setItemToDelete(record);
    setIsModalVisible(true);
  };

  const [deleteClientLocation, { isLoading }] =
    useDeleteClientLocationMutation();

  const handleDeleteClientLocationSuccess = () => {
    setIsModalVisible(false);
  };

  const handleDeleteClientLocation = () => {
    handleAPIRequests({
      request: deleteClientLocation,
      clientId: query?.client,
      officeId: itemToDelete?.id,
      showSuccess: true,
      handleSuccess: handleDeleteClientLocationSuccess
    });
  };

  const handleEditClientLocationSuccess = () => {
    setIsEditModalVisible(false);
  };

  const [editClientLocation, { isLoading: isEditing }] =
    useEditClientLocationMutation();

  const onEditClientLocationFinish = (values: any) => {
    handleAPIRequests({
      request: editClientLocation,
      clientId: query?.client,
      officeId: itemToEdit?.id,
      location: location ? location?.name : "",
      coordinates: location ? JSON.stringify(location?.coordinates) : "",
      names: values?.names,
      type: itemToEdit?.type,
      showSuccess: true,
      handleSuccess: handleEditClientLocationSuccess
    });
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>office</span>
        </div>
      ),
      key: "office",
      render: (
        text: ClientLocationsTableTypes,
        record: ClientLocationsTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">
                {record?.names}{" "}
                {record?.type && (
                  <>
                    - <span className="yellow_faded_text">{record?.type}</span>
                  </>
                )}
              </Text>
              <Text className="normalText opacity_56">{record?.location}</Text>
            </div>
          </div>
        </RowsWrapper>
      )
    },

    {
      title: "action",
      key: "action",
      render: (
        text: ClientLocationsTableTypes,
        record: ClientLocationsTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex justify-end items-center gap-8">
            <Button
              onClick={() => showEditModal(record)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              <Image
                className="pointer"
                src="/icons/ic-contact-edit.svg"
                alt="Backspace icon"
                width={18}
                height={18}
              />
            </Button>
            <Button
              onClick={() => showModal(record)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              {RemoveCircleOutlineIcon}
            </Button>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <>
      <Table
        className="data_table  noborder"
        columns={columns}
        dataSource={offices && offices}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        showHeader={false}
        loading={TableOnActionLoading(isClientFetching)}
      />

      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteClientLocation()}
        loading={isLoading}
      />

      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT CLIENT LOCATION"
        loading={isEditing}
      >
        <EditClientLocation
          onEditClientLocationFinish={onEditClientLocationFinish}
          isLoading={isEditing}
          form={form}
          setLocation={setLocation}
          location={location}
        />
      </ModalWrapper>
    </>
  );
};

export default ClientLocationsTable;
