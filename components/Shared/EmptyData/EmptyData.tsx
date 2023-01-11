import Image from "antd/lib/image";
import React, { FC } from "react";

type EmptyDataProps = {
  text: string;
};

const EmptyData: FC<EmptyDataProps> = ({ text }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <Image
        src="/icons/transaction.svg"
        width={150}
        height={150}
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
