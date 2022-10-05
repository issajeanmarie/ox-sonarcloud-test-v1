import { FC, useEffect } from "react";
import { Form } from "antd";
import Button from "../../../Shared/Button";
import { useEditOrderMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { Query } from "../../../../lib/types/shared";
import ModalWrapper from "../../../Modals/ModalWrapper";
import ClientSearch from "../../../Shared/Input/ClientSearch";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";

interface EditOrderClientProps {
  orderId: Query;
  existingClient: { id: number };
  closeModal: () => void;
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
  const [form] = Form.useForm();

  const handleEditOrderSuccess = () => {
    closeModal();
  };

  const handleOnFinish = (values: { clientId: number }) => {
    handleAPIRequests({
      request: editOrder,
      orderId,
      data: values,
      showSuccess: true,
      handleSuccess: handleEditOrderSuccess
    });
  };

  useEffect(() => {
    form.setFieldsValue({ clientId: existingClient?.id });
  }, [existingClient, form]);

  return (
    <ModalWrapper
      title="EDIT ORDER CLIENT"
      loading={isLoading}
      isModalVisible={isEditClientModal}
      setIsModalVisible={setIsEditClientModal}
    >
      <Form form={form} onFinish={handleOnFinish}>
        <ClientSearch
          label="Clients"
          rules={requiredField("Client")}
          name="clientId"
          existingValue={existingClient}
        />

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
