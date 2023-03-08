import React, { FC } from "react";
import Image from "antd/lib/image";
import CustomButton from "../Button/button";
import { SpinningLoader } from "../Loaders/Loaders";

interface Props {
  accurateTime: string;
}

const DateIsInAccurate: FC<Props> = ({ accurateTime }) => {
  const handleReloadPage = () => {
    window.location.reload();
  };

  const year = new Date(accurateTime).getFullYear();
  const month = new Date(accurateTime).getMonth() + 1;
  const date = new Date(accurateTime).getDate();

  const hours = new Date(accurateTime).getHours();
  const minutes = new Date(accurateTime).getMinutes();

  const displayYear = year;
  const displayMonth = month < 10 ? `0${month}` : month;
  const displayDate = date < 10 ? `0${date}` : date;

  const displayHours = hours < 10 ? `0${hours}` : hours;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <div className="w-[100%] h-[100vh] grid items-center justify-center">
      <div className="p-12 shadow text-center flex flex-col items-center px-24">
        <Image
          className="cursor-pointer"
          width={120}
          src="/icons/set-clock.svg"
          preview={false}
          alt=""
        />

        <p className="font-medium mt-6 text-[18px] text-ox-dark">
          Your time is inaccurate!
        </p>

        <span className="font-bold text-dark block mt-32 mb-2">
          {displayYear}/{displayMonth}/{displayDate} - {displayHours}:
          {displayMinutes}
        </span>

        <p className=" mb-4 w-[100%] md:w-[80%] lg:w-[80%] text-gray-500">
          Set your clock on accurate time and reload the page!
        </p>

        <div className="w-[100%] md:w-[80%] lg:w-[50%] mt-4">
          <CustomButton onClick={handleReloadPage} type="primary">
            Reload page
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default DateIsInAccurate;

export const CheckDateAndTimeAccuracy = () => {
  return (
    <div className="w-[100%] h-[100vh] grid items-center justify-center">
      <div className="p-12 text-center flex flex-col items-center px-24">
        <p className=" mb-6 w-[100%] md:w-[80%] lg:w-[80%] text-gray-500">
          Checking date and time accuracy
        </p>
        <SpinningLoader className="h-[fit-content]" />
      </div>
    </div>
  );
};
