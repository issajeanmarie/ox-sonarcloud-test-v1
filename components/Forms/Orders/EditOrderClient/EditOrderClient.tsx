import { FC } from "react";
import { Form, message } from "antd";
import Button from "../../../Shared/Button";
import { useEditOrderMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { Query } from "../../../../lib/types/shared";
import { Client } from "../../../../lib/types/clients";
import ModalWrapper from "../../../Modals/ModalWrapper";
import ClientSearch from "../../../Shared/Input/ClientSearch";
import { requiredField } from "../../../../lib/validation/InputValidations";

interface EditOrderClientProps {
  orderId: Query;
  existingClient: number;
  closeModal: () => void;
  clients: Client[];
  isEditClientModal: boolean;
  setIsEditClientModal: any;
}

const EditOrderClient: FC<EditOrderClientProps> = ({
  orderId,
  existingClient,
  closeModal,
  isEditClientModal,
  setIsEditClientModal
}) => {
  const [editOrder, { isLoading }] = useEditOrderMutation();

  const handleOnFinish = (values: { clientId: number }) => {
    editOrder({ orderId, data: values })
      .unwrap()
      .then((res) => {
        message.success(res.message);
        closeModal();
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  return (
    <ModalWrapper
      title="EDIT ORDER CLIENT"
      loading={isLoading}
      isModalVisible={isEditClientModal}
      setIsModalVisible={setIsEditClientModal}
    >
      <Form
        initialValues={{ clientId: existingClient }}
        onFinish={handleOnFinish}
      >
        <ClientSearch label="Clients" rules={requiredField("Client")} />
        <div className="my-10">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default EditOrderClient;
