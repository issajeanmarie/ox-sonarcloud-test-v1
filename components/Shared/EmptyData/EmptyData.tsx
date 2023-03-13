import Image from "antd/lib/image";
import React, { FC } from "react";

type EmptyDataProps = {
  text: string;
  width?: number;
  height?: number;
};

const EmptyData: FC<EmptyDataProps> = ({ text, width = 150, height = 150 }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <Image
        src="/icons/transaction.svg"
        width={width}
        height={height}
        alt="No transactions"
        preview={false}
      />
      <div className="font-extralight text-md w-[170px] text-center">
        {text}
      </div>
    </div>
  );
};

export default EmptyData;
