import React, { FC } from "react";
import Image from "next/image";
import Button from "../../Shared/Button";
import { useRouter } from "next/router";
import { FormInstance } from "antd/lib/form/Form";
import SuccessModal from "../../Shared/Modal";
import { routes } from "../../../config/route-config";

interface ViewOrderHeaderProps {
  form: FormInstance;
  createOrderLoading: boolean;
  isCreateOrderSuccess: boolean;
  setIsCreateOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
}

const ViewOrderHeader: FC<ViewOrderHeaderProps> = ({
  form,
  createOrderLoading,
  isCreateOrderSuccess,
  setIsCreateOrderSuccess,
  closeModal
}) => {
  const router = useRouter();

  const addAnotherClient = () => {
    form.setFieldsValue({
      clientId: undefined,
      officeId: undefined
    });
    closeModal();
  };

  return (
    <div className="bg-ox-white shadow-[0px_0px_19px_#00000008] sticky top-0 z-50">
      <SuccessModal
        isModalVisible={isCreateOrderSuccess}
        setIsModalVisible={setIsCreateOrderSuccess}
      >
        <div className="flex flex-col items-center justify-center ">
          <div className="mt-10">
            <Image
              width={100}
              alt="Create order successful"
              height={100}
              src="/icons/create-order.svg"
            />
          </div>
          <div className="mb-2 text-2xl font-bold mt-9">Order confirmed</div>
          <div className="text-lg font-light text-gray-400">
            Would you like to add another client?
          </div>
          <div className="mt-9 w-[250px]">
            <Button type="primary" onClick={addAnotherClient}>
              ADD ANOTHER CLIENT
            </Button>
          </div>
          <button
            className="text-center my-8 cursor-pointer font-bold"
            onClick={() => {
              closeModal();
              form.resetFields();
              router.push(routes.Orders.url);
            }}
          >
            No, I&apos;m good
          </button>
        </div>
      </SuccessModal>
      <div className="p-3 px-6 flex items-center">
        <div className="flex items-center gap-4 ">
          <Image
            className="pointer"
            src="/icons/keyboard_backspace_black_24dp.svg"
            alt="Backspace icon"
            width={20}
            height={20}
            onClick={() => router.push(routes.Orders.url)}
          />
          <span className="heading2">Orders</span>
          <span className="normalText">/</span>
          <span className="text-gray-400">New order</span>
        </div>
        <div className="flex items-center flex-1 justify-end gap-6">
          <div className="flex items-center gap-6 w-[200px]">
            <Button
              onClick={() => form.submit()}
              loading={createOrderLoading}
              type="primary"
            >
              SAVE ORDER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderHeader;
