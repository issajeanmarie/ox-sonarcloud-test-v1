import React, { FC } from "react";
import Image from "antd/lib/image";
import { Query } from "../../../../lib/types/shared";
import Button from "../../../Shared/Button";
import { FormInstance } from "antd";
import Navbar from "../../../Shared/Content/Navbar";

interface ViewOrderHeaderProps {
  orderId: Query;
  setSupport: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance;
  supportOrderLoading: boolean;
}

const ViewOrderHeader: FC<ViewOrderHeaderProps> = ({
  orderId,
  setSupport,
  supportOrderLoading,
  form
}) => {
  const LeftSide = (
    <div className="flex items-center gap-4 ">
      <Image
        className="pointer"
        src="/icons/keyboard_backspace_black_24dp.svg"
        alt="Backspace icon"
        width={20}
        height={20}
        preview={false}
        onClick={() => setSupport(false)}
      />
      <span className="text-md font-bold">Orders</span>
      <span className="normalText">/</span>
      <span className="text-md font-bold">Order {orderId}</span>
      <span className="normalText">/</span>
      <span className="text-gray-400">New supporting order</span>
    </div>
  );

  const RightSide = (
    <div className="flex items-center flex-1 justify-end gap-6">
      <div className="flex items-center gap-6 w-[120px]">
        <Button
          onClick={() => form.submit()}
          loading={supportOrderLoading}
          type="primary"
        >
          SAVE ORDER
        </Button>
      </div>
    </div>
  );

  return <Navbar LeftSide={LeftSide} RightSide={RightSide} type="FULL" />;
};

export default ViewOrderHeader;
