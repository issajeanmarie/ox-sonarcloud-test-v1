import { FC, SetStateAction } from "react";
import { Button, Modal } from "antd";
import { CloseIcon } from "../Icons";

interface ModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  loading: boolean;
  onCancel?: () => void;
  destroyOnClose?: boolean;
}

const ModalWrapper: FC<ModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  children,
  title,
  loading,
  onCancel,
  destroyOnClose
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      className="ox-modal ox_medium_modal"
      title={
        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl">{title}</span>
          {!loading && (
            <Button
              onClick={onCancel || handleCancel}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              {CloseIcon}
            </Button>
          )}
        </div>
      }
      width={500}
      footer={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel || handleCancel}
      centered
      maskClosable={!loading}
      closable={false}
      destroyOnClose={destroyOnClose}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
