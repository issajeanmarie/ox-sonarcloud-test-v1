import { useState, FC } from "react";
import { Form, message } from "antd";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import CircleCheckbox from "../../../Shared/Custom/CircleCheckbox";
import { EditPaymentStatusRequest, Order } from "../../../../lib/types/orders";
import { useEditPaymentStatusMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import moment from "moment";
import ModalWrapper from "../../../Modals/ModalWrapper";
import { futureDateDisabler } from "../../../../helpers/datesValidator";
import { usePostSalePaymentMutation } from "../../../../lib/api/endpoints/Warehouse/salesEndpoints";

interface PaymentStatusProps {
  order: Order;
  closeModal: () => void;
  isEditPaymentStatus: boolean;
  setIsEditPaymentStatus: any;
  isSaleOrder: boolean;
}

const PaymentStatus: FC<PaymentStatusProps> = ({
  order,
  closeModal,
  isEditPaymentStatus,
  setIsEditPaymentStatus,
  isSaleOrder
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [editPaymentStatus, { isLoading }] = useEditPaymentStatusMutation();
  const [postSalePayment, { isLoading: isPostingSalePayment }] =
    usePostSalePaymentMutation();

  const handleFinish = (values: EditPaymentStatusRequest) => {
    if (
      values.amount > order?.remainingAmount &&
      !checked &&
      order?.remainingAmount
    ) {
      message.warning("Amount can't exceed the remaining");
    } else {
      if (isSaleOrder) {
        postSalePayment({
          orderId: order?.id,
          data: {
            ...values,
            isWaitTimeFee: checked,
            amount: Number(values.amount),
            paymentDate: moment(values.paymentDate).format("YYYY-MM-DD")
          }
        })
          .unwrap()
          .then((res) => {
            message.success(res.message);
            closeModal();
            form.resetFields();
          })
          .catch((e) => {
            message.error(e.data?.message || "Something went wrong");
          });
      } else {
        editPaymentStatus({
          orderId: order.id,
          data: {
            ...values,
            isWaitTimeFee: checked,
            amount: Number(values.amount),
            paymentDate: moment(values.paymentDate).format("YYYY-MM-DD")
          }
        })
          .unwrap()
          .then((res) => {
            message.success(res.message);
            closeModal();
          })
          .catch((e) => {
            message.error(e.data?.message || "Something went wrong");
          });
      }
    }
  };

  return (
    <ModalWrapper
      title="PAYMENT STATUS"
      isModalVisible={isEditPaymentStatus}
      setIsModalVisible={setIsEditPaymentStatus}
      loading={isSaleOrder ? isPostingSalePayment : isLoading}
    >
      <Form onFinish={handleFinish} form={form}>
        <div className="mb-10">
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1">
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
                rules={[
                  { required: true, message: "Momo ref code is required" }
                ]}
              />
            </div>
          </div>
          <div className="my-5">
            <Input
              name="paymentDate"
              type="date"
              label="Payment date"
              suffixIcon="KGs"
              placeholder="Choose payment date"
              rules={[{ required: true, message: "Weight is required" }]}
              disabledDate={futureDateDisabler}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">Add as waiting time feez</div>
            <div>
              <CircleCheckbox
                defaultValue={true}
                checked={checked}
                setState={setChecked}
                state={checked}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="w-[150px]">
              <Button
                type="primary"
                htmlType="submit"
                loading={isSaleOrder ? isPostingSalePayment : isLoading}
              >
                UPDATE
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default PaymentStatus;
