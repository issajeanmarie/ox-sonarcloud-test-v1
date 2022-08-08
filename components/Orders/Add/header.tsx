import { FC } from "react";
import Image from "next/image";
import Button from "../../Shared/Button";
import { useRouter } from "next/router";

const ViewOrderHeader: FC = () => {
  const router = useRouter();

  return (
    <div className="bg-ox-white shadow-[0px_0px_19px_#00000008] sticky top-0 z-50">
      <div className="p-3 px-6 flex items-center">
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
          <span className="text-gray-400">New order</span>
        </div>
        <div className="flex items-center flex-1 justify-end gap-6">
          <div className="flex items-center gap-6 w-[200px]">
            <Button type="primary">SAVE ORDER</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderHeader;
