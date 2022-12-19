/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";

const NetworkError = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <Image src="/noInternet.svg" alt="" width="100px" height="100px" />
      <div className="mt-4 flex justify-center flex-col items-center">
        <span className="text-black">Connect to the internet</span>
        <span className="font-light text-base">
          You're offline. Check your connection.
        </span>
      </div>
    </div>
  );
};

export default NetworkError;
