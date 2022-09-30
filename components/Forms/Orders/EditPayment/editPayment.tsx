/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import {
  EditTransactionRequest,
  Transaction
} from "../../../../lib/types/orders";
import { useEditTransactionMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { useForm } from "antd/lib/form/Form";
import ModalWrapper from "../../../Modals/ModalWrapper";

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

  const onFinish = (values: EditTransactionRequest) => {
    tx &&
      editTransaction({ data: values, orderId, transactionId: tx?.id })
        .unwrap()
        .then((res) => {
          message.success(res?.message);
          setIsEditPayment(false);
        })
        .catch((e) => {
          message.error(e.data?.message || "Something went wrong");
        });
  };

  useEffect(() => {
    if (tx) {
      form.setFieldsValue({ amount: tx.amount, momoRefCode: tx?.momoRefCode });
    }
  }, [tx]);

  return (
    <ModalWrapper
      title="PAYMENT STATUS"
      isModalVisible={isEditPayment}
      setIsModalVisible={setIsEditPayment}
      loading={isLoading}
    >
      <Form form={form} onFinish={onFinish}>
        <div className="my-10">
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
              rules={[{ required: true, message: "Momo ref code is required" }]}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-[150px]">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                UPDATE
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default EditPayment;
