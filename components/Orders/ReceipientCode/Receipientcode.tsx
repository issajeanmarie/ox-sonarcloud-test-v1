import { FC, SetStateAction, Dispatch } from "react";
import { Modal } from "antd";
import Button from "../../Shared/Button";

interface ReceipientCodeProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  code: string;
}

const ReceipientCode: FC<ReceipientCodeProps> = ({
  isModalVisible,
  setIsModalVisible,
  code
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
      width={500}
      footer={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      centered
    >
      <div className="m-10">
        <div className="text-2xl font-bold text-center text-ox-yellow-faded">
          ORDER RECIPIENT CODE
        </div>
        <div className="text-center my-8 text-2xl font-bold">{code}</div>
        <div className="text-center w-1/2 m-auto">
          <Button type="primary" onClick={handleOk}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReceipientCode;
