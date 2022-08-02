import { FC } from "react";
import { Query } from "../../../lib/types/shared";
import Image from "next/image";
import Button from "../../../components/Shared/Button";
import { useRouter } from "next/router";

interface ViewOrderHeaderProps {
  orderId: Query;
}

const ViewOrderHeader: FC<ViewOrderHeaderProps> = ({ orderId }) => {
  const router = useRouter();

  return (
    <div className="bg-white my-2 shadow-[0px_0px_19px_#00000008] p-3 px-6 flex items-center">
      <div className="flex items-center gap-4 ">
        <Image
          className="pointer"
          src="/icons/keyboard_backspace_black_24dp.svg"
          alt="Backspace icon"
          width={20}
          height={20}
          onClick={() => router.back()}
        />
        <span className="heading2">Orders</span>
        <span className="normalText">/</span>
        <span className="text-gray-400">Order {orderId}</span>
      </div>
      <div className="flex items-center flex-1 justify-end gap-6">
        <div className="flex items-center gap-10">
          <Image
            className="pointer"
            src="/icons/ic-ecommerce-invoice.svg"
            alt="Backspace icon"
            width={20}
            height={20}
          />
          <Image
            className="pointer"
            src="/icons/ic-contact-edit.svg"
            alt="Backspace icon"
            width={18}
            height={18}
          />
          <Image
            className="pointer"
            src="/icons/ic-actions-remove.svg"
            alt="Backspace icon"
            width={20}
            height={20}
          />
        </div>
        <div className="flex items-center gap-6 w-[400px]">
          <Button type="secondary">SUPPORT</Button>
          <Button type="primary">COMPLETE ORDER</Button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderHeader;
