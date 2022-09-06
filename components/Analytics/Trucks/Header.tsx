import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ViewTruckHeaderTypes } from "../../../lib/types/pageTypes/Trucks/ViewTruckHeaderTypes";

const ViewTruckHeader: FC<ViewTruckHeaderTypes> = ({ truckId, truckData }) => {
  const router = useRouter();

  return (
    <>
      <div className="bg-white  shadow-[0px_0px_19px_#00000008] p-3 px-6 flex items-center">
        <div className="flex items-center gap-4 ">
          <Image
            className="pointer"
            src="/icons/keyboard_backspace_black_24dp.svg"
            alt="Backspace icon"
            width={20}
            height={20}
            onClick={() => router.back()}
          />
          <span className="heading2">Trucks</span>
          <span className="normalText">/</span>
          <span className="text-gray-400">Order {truckId}</span>
        </div>
        <div className="flex items-center flex-1 justify-end gap-11">
          <div className="flex items-center gap-6">
            <Image
              className="pointer"
              src={`/icons/ic-media-${
                truckData?.truck?.active ? "stop" : "play"
              }.svg`}
              alt=""
              width={16}
              height={16}
            />

            <Image
              className="pointer"
              src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
              alt="Backspace icon"
              width={22}
              height={22}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTruckHeader;
