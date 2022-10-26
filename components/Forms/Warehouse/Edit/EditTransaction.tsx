/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import React, { FC } from "react";
import Input from "../../../Shared/Input";

type EditTransactionProps = {
  form: any;
  handleFinish: (value: any) => void;
};

const EditTransaction: FC<EditTransactionProps> = ({ form, handleFinish }) => {
  return (
    <Form id="EditTransaction" onFinish={handleFinish} form={form}>
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
      </div>
    </Form>
  );
};

export default EditTransaction;
