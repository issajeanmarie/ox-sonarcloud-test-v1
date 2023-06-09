import { FC, SetStateAction } from "react";
import { Modal, Button as AntButton } from "antd";
import Button from "../Button";

interface ActionModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  type: "danger" | "normal";
  title?: string;
  description?: string;
  actionLabel?: string;
  action: () => void;
  loading: boolean;
}

const ActionModal: FC<ActionModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  title = "WARNING!",
  type,
  description = "This action is not reversible, please make sure you really want to proceed with this action!",
  actionLabel = "PROCEED",
  loading,
  action
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={false}
      width={550}
      footer={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      centered
      maskClosable={loading ? false : true}
    >
      <div className="m-10">
        <div className="text-2xl font-bold text-ox-dark mb-10">
          {title?.toUpperCase()}
        </div>
        <div className="w-[90%] mb-10">{description}</div>
        <div className="flex items-center justify-between ">
          <div className="w-[160px]">
            <AntButton disabled={loading} onClick={handleCancel} type="text">
              <span className="underline font-medium">Discard</span>
            </AntButton>
          </div>

          <div className="w-[160px]">
            <Button
              onClick={action}
              loading={loading}
              type={type === "danger" ? "danger_filled" : "primary"}
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
