import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React, { FC } from "react";
import Form from "antd/lib/form";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { requiredField } from "../../../lib/validation/InputValidations";
import { useCreateTruckIssueMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import {
  CreateTruckResponse,
  TruckNewIssueProps
} from "../../../lib/types/trucksTypes";
import { displayTruckIssues } from "../../../lib/redux/slices/trucksSlice";
import ModalWrapper from "../../Modals/ModalWrapper";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";

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

  const handleCreateIssueSuccess = (payload: CreateTruckResponse) => {
    dispatch(displayTruckIssues({ payload, replace: false }));
    SuccessMessage(payload?.message || "Issue registered successfull");
    handleCancel();
    form.resetFields();
  };

  const onFinish = (values: { description: string }) => {
    handleAPIRequests({
      request: createTruckIssue,
      description: values.description,
      id: truckId,
      handleSuccess: handleCreateIssueSuccess
    });
  };

  return (
    <ModalWrapper
      title="NEW TRUCK ISSUE"
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={isLoading}
      onCancel={handleCancel}
      footerContent={
        <Button
          form="CreateTruckIssue"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          SAVE
        </Button>
      }
    >
      <Form
        name="CreateTruckIssue"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        title="Issue"
        id="CreateTruckIssue"
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
      </Form>
    </ModalWrapper>
  );
};

export default TruckNewIssueModal;
