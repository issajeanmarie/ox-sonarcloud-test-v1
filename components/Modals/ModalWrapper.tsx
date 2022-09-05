import { FC, SetStateAction } from "react";
import { Modal } from "antd";

interface ModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  title: string;
}

const ModalWrapper: FC<ModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  children,
  title
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      className="ox-modal"
      title={<span className="font-bold text-2xl">{title}</span>}
      width={550}
      footer={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
