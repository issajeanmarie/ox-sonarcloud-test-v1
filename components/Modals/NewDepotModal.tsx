import { Col, Form, Row } from "antd";
import React, { FC, useEffect, useState } from "react";
import Button from "../Shared/Button";
import ModalWrapper from "./ModalWrapper";
import { requiredField } from "../../lib/validation/InputValidations";
import Input from "../Shared/Input";
import { LatLng } from "use-places-autocomplete";
import {
  useEditDepotMutation,
  useCreateDepotMutation
} from "../../lib/api/endpoints/Depots/depotEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useRouter } from "next/router";
import { GetDepotProfileResponse } from "../../lib/types/depots";

type Types = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing?: boolean;
  currentDepotData?: GetDepotProfileResponse;
};

type FormTypes = {
  name: string;
  coordinates: string;
  location: string;
};

const NewDepotModal: FC<Types> = ({
  isVisible,
  setIsVisible,
  isEditing,
  currentDepotData
}) => {
  const [location, setLocation] = useState<{
    name: string | undefined;
    coordinates: LatLng;
  }>();

  const router = useRouter();

  const { id: depotId } = router.query;

  const handleCancel = () => {
    setIsVisible(false);
  };

  const [createNewDepot, { isLoading }] = useCreateDepotMutation();
  const [editDepot, { isLoading: isEditLoading }] = useEditDepotMutation();

  const [form] = Form.useForm();

  const handleCreateDepotSuccess = () => {
    handleCancel();
  };

  useEffect(() => {
    if (isEditing && currentDepotData) {
      const currentCoordinates = currentDepotData?.payload?.depot?.coordinates;
      const currentName = currentDepotData?.payload?.depot?.name;

      let parsedCoordinates;

      try {
        parsedCoordinates = currentCoordinates
          ? JSON.parse(currentCoordinates)
          : null;
      } catch (error) {
        parsedCoordinates = null;
      }

      setLocation({
        name: currentName,
        coordinates: parsedCoordinates
      });
      form.setFieldsValue({
        name: currentName,
        location: currentDepotData?.payload?.depot?.location
      });
    }
  }, [currentDepotData, form, isEditing]);

  const onFinish = ({ name }: FormTypes) => {
    handleAPIRequests({
      request: isEditing ? editDepot : createNewDepot,
      name,
      id: depotId,
      location: JSON.stringify(location?.name),
      coordinates: JSON.stringify(location?.coordinates),
      showSuccess: true,
      handleSuccess: handleCreateDepotSuccess
    });
  };

  return (
    <ModalWrapper
      title={isEditing ? "Edit depot" : "New depot"}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={isLoading || isEditLoading}
      onCancel={handleCancel}
      footerContent={
        <Button
          form="createNewDepot"
          loading={isLoading || isEditLoading}
          type="primary"
          htmlType="submit"
          disabled={false}
        >
          Save
        </Button>
      }
    >
      <Form
        name="createNewDepot"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        title="New depot"
        id="createNewDepot"
      >
        <Row justify="space-between" gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Input
              name="name"
              type="text"
              label="Name"
              placeholder="Enter depot name"
              rules={requiredField("Depot name")}
            />
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Input
              name="location"
              type="location"
              label="Location"
              placeholder="Search for location"
              setLocation={setLocation}
              location={location}
            />
          </Col>
        </Row>
      </Form>
    </ModalWrapper>
  );
};

export default NewDepotModal;
