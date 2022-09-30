import { FC } from "react";
import { Form, message, Select } from "antd";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { useEditOrderMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { Client } from "../../../../lib/types/clients";
import ModalWrapper from "../../../Modals/ModalWrapper";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { useForm } from "antd/lib/form/Form";

interface EditOrderPriceProps {
  orderData: any;
  clients?: Client[];
  isVisible: boolean;
  setIsVisible: any;
  setEditData: any;
}

const { Option } = Select;

const EditOrderPrice: FC<EditOrderPriceProps> = ({
  orderData,
  isVisible,
  setIsVisible,
  setEditData
}) => {
  const [editOrder, { isLoading }] = useEditOrderMutation();
  const [form] = useForm();

  const handleCancel = () => {
    setIsVisible(false);
    setEditData(null);
    form.resetFields();
  };

  const handleOnFinish = (values: { amount: number; paymentPlan: string }) => {
    editOrder({
      orderId: orderData?.id,
      data: {
        amount: values.amount || orderData.amount,
        paymentPlan: values.paymentPlan || orderData.paymentPlan
      }
    })
      .unwrap()
      .then((res) => {
        message.success(res.message);
        handleCancel();
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  const initialValues = {
    amount: orderData?.totalAmount,
    paymentPlan: orderData?.paymentPlan
  };

  return (
    <ModalWrapper
      title="EDIT ORDER'S PRICE"
      loading={isLoading}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      destroyOnClose={true}
    >
      <Form
        name="Edit a price"
        form={form}
        initialValues={initialValues}
        onFinish={handleOnFinish}
      >
        <div className="mb-4">
          <Input
            name="amount"
            type="text"
            label="Amount"
            placeholder="4,000"
            isGroupDropdown
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
        <div className="my-10">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default EditOrderPrice;
