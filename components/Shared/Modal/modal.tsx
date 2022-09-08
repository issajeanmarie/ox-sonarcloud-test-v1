import { FC, SetStateAction } from "react";
import { Modal } from "antd";

interface ActionModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
}

const ModalWrapper: FC<ActionModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  children
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
      // destroyOnClose={true}
      closable={false}
      centered
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
