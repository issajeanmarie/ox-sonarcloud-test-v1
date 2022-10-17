/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import React, { FC } from "react";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";

type EditTransactionProps = {
  form: any;
  handleFinish: (value: any) => void;
  isLoading: boolean;
};

const EditTransaction: FC<EditTransactionProps> = ({
  form,
  handleFinish,
  isLoading
}) => {
  return (
    <Form onFinish={handleFinish} form={form}>
      <div className="mb-10">
        <div className="my-5">
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
        </div>

        <div className="mt-8 flex justify-end">
          <div className="w-[150px]">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default EditTransaction;
