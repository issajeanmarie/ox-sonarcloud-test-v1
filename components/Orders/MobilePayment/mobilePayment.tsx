import { FC, SetStateAction, Dispatch } from "react";
import { Modal } from "antd";
import Button from "../../Shared/Button";
import Input from "../../Shared/Input";

interface MobilePaymentProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const MobilePayment: FC<MobilePaymentProps> = ({
  isModalVisible,
  setIsModalVisible
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
        <div className="text-2xl font-bold  text-ox-dark mb-10">
          MOBILE PAYMENT
        </div>
        <div className="mb-5">
          <Input
            name="amount"
            type="text"
            placeholder="Enter amount"
            inputType="number"
            label="Amount"
            suffixIcon="RWF"
          />
        </div>
        <div className="mb-10">
          <Input
            name="phoneNumber"
            type="text"
            placeholder="Receipient's phone number"
            label="Phone number"
          />
        </div>
        <div className="mb-7">
          <Button type="primary">Confirm</Button>
        </div>
        <button className="heading2 w-full" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default MobilePayment;
