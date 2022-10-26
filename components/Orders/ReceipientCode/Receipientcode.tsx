import { FC, SetStateAction, Dispatch } from "react";
import Modal from "../../Shared/Modal";
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
  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <div className="m-10">
        <div className="text-2xl font-bold text-center text-ox-yellow-faded">
          ORDER RECIPIENT CODE
        </div>
        <div className="text-center my-8 text-2xl font-bold">{code}</div>
        <div className="text-center w-1/2 m-auto">
          <Button
            form=""
            type="primary"
            onClick={() => setIsModalVisible(false)}
          >
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReceipientCode;
