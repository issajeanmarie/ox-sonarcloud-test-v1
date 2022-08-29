import React, { FC, Fragment } from "react";
import Image from "next/image";
import { Query } from "../../../../lib/types/shared";
import Button from "../../../Shared/Button";
import { FormInstance } from "antd";

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
  return (
    <Fragment>
      <div className="bg-white my-2 shadow-[0px_0px_19px_#00000008] p-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <Image
            className="pointer"
            src="/icons/keyboard_backspace_black_24dp.svg"
            alt="Backspace icon"
            width={20}
            height={20}
            onClick={() => setSupport(false)}
          />
          <span className="text-md font-bold">Orders</span>
          <span className="normalText">/</span>
          <span className="text-md font-bold">Order {orderId}</span>
          <span className="normalText">/</span>
          <span className="text-gray-400">New supporting order</span>
        </div>
        <div className="flex items-center gap-6 w-[200px]">
          <Button
            onClick={() => form.submit()}
            loading={supportOrderLoading}
            type="primary"
          >
            SAVE ORDER
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewOrderHeader;
