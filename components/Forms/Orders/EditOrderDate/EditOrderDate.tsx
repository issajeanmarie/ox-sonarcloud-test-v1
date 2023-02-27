import { FC, useEffect } from "react";
import { Form } from "antd";
import Button from "../../../Shared/Button";
import { useEditOrderMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { Query } from "../../../../lib/types/shared";
import ModalWrapper from "../../../Modals/ModalWrapper";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import Input from "../../../Shared/Input";
import moment from "moment";

interface EditOrderDateProps {
  orderId: Query;
  existingDate: string;
  closeModal: () => void;
  isEditDateModal: boolean;
  setIsEditDateModal: any;
}

const EditOrderDate: FC<EditOrderDateProps> = ({
  orderId,
  existingDate,
  closeModal,
  isEditDateModal,
  setIsEditDateModal
}) => {
  const [editOrder, { isLoading }] = useEditOrderMutation();
  const [form] = Form.useForm();

  const handleEditOrderSuccess = () => {
    closeModal();
  };

  const handleOnFinish = (values: { startDateTime: string }) => {
    handleAPIRequests({
      request: editOrder,
      orderId,
      ...values,
      showSuccess: true,
      handleSuccess: handleEditOrderSuccess
    });
  };

  useEffect(() => {
    form.setFieldsValue({ startDateTime: moment(existingDate) });
  }, [existingDate, form]);

  return (
    <ModalWrapper
      footerContent={
        <Button
          form="EditOrderDate"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Save
        </Button>
      }
      title="EDIT ORDER DATE"
      loading={isLoading}
      isModalVisible={isEditDateModal}
      setIsModalVisible={setIsEditDateModal}
    >
      <Form id="EditOrderDate" form={form} onFinish={handleOnFinish}>
        <Input
          rules={requiredField("Depot")}
          type="date"
          label="Date"
          placeholder="Select depot"
          name="startDateTime"
        />
      </Form>
    </ModalWrapper>
  );
};

export default EditOrderDate;
