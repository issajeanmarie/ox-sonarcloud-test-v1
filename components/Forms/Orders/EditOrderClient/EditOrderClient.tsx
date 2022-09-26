import { FC } from "react";
import { Form, message, Select } from "antd";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { useEditOrderMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { Query } from "../../../../lib/types/shared";
import { Client } from "../../../../lib/types/clients";
import ModalWrapper from "../../../Modals/ModalWrapper";

interface EditOrderClientProps {
  orderId: Query;
  existingClient: number;
  closeModal: () => void;
  clients: Client[];
  isEditClientModal: boolean;
  setIsEditClientModal: any;
}

const { Option } = Select;

const EditOrderClient: FC<EditOrderClientProps> = ({
  orderId,
  existingClient,
  clients,
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
        <Input
          name="clientId"
          type="select"
          label="Clients"
          placeholder="Select a client"
          isGroupDropdown
          rules={[{ required: true, message: "Select a client to continue" }]}
        >
          {clients &&
            clients?.map((el: Client) => (
              <Option value={el.id} key={el.id} title={el.names}>
                {el.names}
              </Option>
            ))}
        </Input>
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
