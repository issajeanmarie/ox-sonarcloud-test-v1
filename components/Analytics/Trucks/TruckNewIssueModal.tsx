import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Modal from "antd/lib/modal";
import React, { FC } from "react";
import Form from "antd/lib/form";
import message from "antd/lib/message";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { requiredField } from "../../../lib/validation/InputValidations";
import { useCreateTruckIssueMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import {
  CreateTruckResponse,
  TruckNewIssueProps
} from "../../../lib/types/trucksTypes";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { BackendErrorTypes } from "../../../lib/types/shared";
import { displayTruckIssues } from "../../../lib/redux/slices/trucksSlice";

const TruckNewIssueModal: FC<TruckNewIssueProps> = ({
  isVisible,
  setIsVisible
}) => {
  const handleCancel = () => {
    setIsVisible(false);
  };

  const router = useRouter();
  const { id: truckId } = router.query;
  const dispatch = useDispatch();

  const [createTruckIssue, { isLoading }] = useCreateTruckIssueMutation();

  const [form] = Form.useForm();

  const onFinish = (values: { description: string }) => {
    createTruckIssue({ description: values.description, id: truckId })
      .unwrap()
      .then((payload: CreateTruckResponse) => {
        dispatch(displayTruckIssues({ payload, replace: false }));
        message.success(payload?.message || "Issue registered successfull");
        handleCancel();
        form.resetFields();
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(err?.data?.message || "Something went wrongssss")
      );
  };

  return (
    <Modal
      title={false}
      footer={false}
      visible={isVisible}
      closable={!isLoading}
      onCancel={handleCancel}
      centered
      maskClosable={!isLoading}
    >
      <div className="m-10">
        <div className="text-2xl font-bold  text-ox-dark mb-10">
          NEW TRUCK ISSUE
        </div>

        <Form
          name="CreateTruckIssue"
          onFinish={onFinish}
          layout="vertical"
          form={form}
          title="Issue"
        >
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="description"
                  type="text"
                  placeholder="50 characters"
                  inputType="text"
                  label="Issue"
                  rules={requiredField("Describtion")}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-10 mb-5">
            <div className="flex-1"></div>

            <div className="flex-1">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                SAVE
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default TruckNewIssueModal;
