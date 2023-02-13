import { useRouter } from "next/router";
import React, { FC } from "react";
import Form from "antd/lib/form";
import { useJustifyRedFlagMutation } from "../../lib/api/endpoints/Depots/depotEndpoints";
import { DepotAlertModalTypes } from "../../lib/types/depots";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import Button from "../Shared/Button";
import Input from "../Shared/Input";
import ModalWrapper from "./ModalWrapper";
import { requiredField } from "../../lib/validation/InputValidations";

const JustifyFlagModal: FC<DepotAlertModalTypes> = ({
  isVisible,
  setIsVisible,
  activeFlag
}) => {
  const handleCancel = () => {
    setIsVisible(false);
  };

  const [form] = Form.useForm();

  const router = useRouter();
  const { id } = router.query;

  const [justifyRedFlag, { isLoading }] = useJustifyRedFlagMutation();

  const onFinish = (values: { reason: string }) => {
    handleAPIRequests({
      request: justifyRedFlag,
      id,
      ...values,
      redFlagId: activeFlag?.id,
      showSuccess: true,
      handleSuccess: handleCancel
    });
  };

  return (
    <ModalWrapper
      title={
        activeFlag?.status === "JUSTIFIED" ? "ALERT JUSTIFIED" : "JUSTIFY ALERT"
      }
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={isLoading}
      footerContent={
        <Button
          form="justifyLog"
          loading={isLoading}
          type="primary"
          htmlType="submit"
          disabled={activeFlag?.status === "JUSTIFIED"}
        >
          Submit
        </Button>
      }
      onCancel={handleCancel}
    >
      <Form form={form} name="justifyLog" onFinish={onFinish}>
        <Input
          name="reason"
          type="text_area"
          label="Reason"
          placeholder="Tell us more"
          rules={requiredField("Reason")}
        />
      </Form>
    </ModalWrapper>
  );
};

export default JustifyFlagModal;
