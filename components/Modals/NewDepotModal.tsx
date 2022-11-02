import { Col, Form, Row } from "antd";
import React, { FC, useState } from "react";
import Button from "../Shared/Button";
import ModalWrapper from "./ModalWrapper";
import { requiredField } from "../../lib/validation/InputValidations";
import Input from "../Shared/Input";
import { LatLng } from "use-places-autocomplete";
import { useCreateDepotMutation } from "../../lib/api/endpoints/Depots/depotEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";

type Types = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormTypes = {
  name: string;
  coordinates: string;
  location: string;
};

const NewDepotModal: FC<Types> = ({ isVisible, setIsVisible }) => {
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const handleCancel = () => {
    setIsVisible(false);
  };

  const [createNewDepot, { isLoading }] = useCreateDepotMutation();

  const handleCreateDepotSuccess = () => {
    handleCancel();
  };

  const onFinish = ({ name }: FormTypes) => {
    handleAPIRequests({
      request: createNewDepot,
      name,
      location: JSON.stringify(location?.name),
      coordinates: JSON.stringify(location?.coordinates),
      showSuccess: true,
      handleSuccess: handleCreateDepotSuccess
    });
  };

  const [form] = Form.useForm();

  return (
    <ModalWrapper
      title="New depot"
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={isLoading}
      onCancel={handleCancel}
      footerContent={
        <Button
          form="createNewDepot"
          loading={isLoading}
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
