import { FC, useEffect } from "react";
import { Form, Select } from "antd";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { useEditOrderMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { Client } from "../../../../lib/types/clients";
import ModalWrapper from "../../../Modals/ModalWrapper";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { useForm } from "antd/lib/form/Form";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";

interface EditOrderPriceProps {
  orderData: any;
  clients?: Client[];
  isVisible: boolean;
  setIsVisible: any;
  totalWeight: number;
}

const { Option } = Select;

const EditOrderPrice: FC<EditOrderPriceProps> = ({
  orderData,
  isVisible,
  setIsVisible,
  totalWeight
}) => {
  const [editOrder, { isLoading }] = useEditOrderMutation();
  const [form] = useForm();

  const handleCancel = () => {
    setIsVisible(false);
    form.resetFields();
  };

  const handleEditPriceSuccess = () => {
    handleCancel();
  };

  const handleOnFinish = (values: { amount: number; paymentPlan: string }) => {
    handleAPIRequests({
      request: editOrder,
      orderId: orderData?.id,
      data: {
        amount: values.amount || orderData.amount,
        paymentPlan: values.paymentPlan || orderData.paymentPlan
      },
      showSuccess: true,
      handleSuccess: handleEditPriceSuccess
    });
  };

  useEffect(() => {
    if (orderData) {
      form.setFieldsValue({
        amount:
          orderData?.paymentPlan === "PAY_BY_KG"
            ? Math.round(orderData?.totalAmount / totalWeight)
            : orderData?.totalAmount,
        paymentPlan: orderData?.paymentPlan
      });
    }
  }, [orderData, form, totalWeight]);

  return (
    <ModalWrapper
      footerContent={
        <Button
          form="EditOrderPrice"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Save
        </Button>
      }
      title="EDIT ORDER'S PRICE"
      loading={isLoading}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      destroyOnClose={true}
    >
      <Form id="EditOrderPrice" form={form} onFinish={handleOnFinish}>
        <div className="mb-4">
          <Input
            name="amount"
            type="text"
            inputType="number"
            label="Amount"
            placeholder="Enter amount"
            rules={requiredField("Amount")}
          />
        </div>

        <div>
          <Input
            name="paymentPlan"
            type="select"
            label="Payment plan"
            placeholder="Select a client"
            isGroupDropdown
          >
            <Option value="PAY_BY_KG">Pay by KG</Option>
            <Option value="PAY_BY_JOB">Pay by job</Option>
          </Input>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default EditOrderPrice;
