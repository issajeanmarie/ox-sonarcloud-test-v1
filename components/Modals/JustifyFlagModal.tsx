import React, { FC } from "react";
import { DepotAlertModalTypes } from "../../lib/types/depots";
import Button from "../Shared/Button";
import Input from "../Shared/Input";
import ModalWrapper from "./ModalWrapper";

const JustifyFlagModal: FC<DepotAlertModalTypes> = ({
  isVisible,
  setIsVisible
}) => {
  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <ModalWrapper
      title={`JUSTIFY THE ALERT`}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={false}
      footerContent={
        <Button
          form="justifyLog"
          loading={false}
          type="primary"
          htmlType="submit"
          disabled={false}
        >
          Submit
        </Button>
      }
      onCancel={handleCancel}
    >
      <Input
        name="reason"
        type="text_area"
        label="Reason"
        placeholder="Tell us more"
      />
    </ModalWrapper>
  );
};

export default JustifyFlagModal;
