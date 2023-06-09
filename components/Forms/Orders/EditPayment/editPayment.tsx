/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Form } from "antd";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import {
  EditTransactionRequest,
  Transaction
} from "../../../../lib/types/orders";
import { useEditTransactionMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { useForm } from "antd/lib/form/Form";
import ModalWrapper from "../../../Modals/ModalWrapper";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";

interface EditPaymentProps {
  tx?: Transaction;
  orderId: number;
  isEditPayment: boolean;
  setIsEditPayment: any;
}

const EditPayment: FC<EditPaymentProps> = ({
  tx,
  orderId,
  isEditPayment,
  setIsEditPayment
}) => {
  const [editTransaction, { isLoading }] = useEditTransactionMutation();

  const [form] = useForm();

  const handleEditTransactionSuccess = () => {
    setIsEditPayment(false);
  };

  const onFinish = (values: EditTransactionRequest) => {
    handleAPIRequests({
      request: editTransaction,
      data: values,
      orderId,
      transactionId: tx?.id,
      showSuccess: true,
      handleSuccess: handleEditTransactionSuccess
    });
  };

  useEffect(() => {
    if (tx) {
      form.setFieldsValue({ amount: tx.amount, momoRefCode: tx?.momoRefCode });
    }
  }, [tx]);

  return (
    <ModalWrapper
      footerContent={
        <Button
          form="EditPaymentStatusOnOrder"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          UPDATE
        </Button>
      }
      title="PAYMENT STATUS"
      isModalVisible={isEditPayment}
      setIsModalVisible={setIsEditPayment}
      loading={isLoading}
    >
      <Form id="EditPaymentStatusOnOrder" form={form} onFinish={onFinish}>
        <div className="mb-5">
          <Input
            name="amount"
            type="text"
            inputType="number"
            label="Amount"
            placeholder="Enter amount"
            rules={[{ required: true, message: "Amount is required" }]}
          />
        </div>
        <div className="flex-1">
          <Input
            name="momoRefCode"
            type="text"
            label="MoMo ref code"
            placeholder="Enter momo ref code"
            rules={requiredField("MoMo ref code")}
          />
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default EditPayment;
