import Image from "next/image";
import Link from "next/link";
import React from "react";
import { routes } from "../../../config/route-config";

const PageNotFound = () => {
  return (
    <div className="h-full flex justify-center items-center w-full flex-col">
      <div className="flex flex-col gap-5 items-center justify-center mt-12">
        <Image src="/icons/transaction.svg" width={80} height={80} alt="" />
        <div className="font-extralight text-md w-[170px] text-center">
          <h6 className="font-bold">This page is not available.</h6>
          <span>
            It may have been deleted or the link you requested is incorrect
          </span>
        </div>
      </div>

      <Link passHref href={routes.Orders.url}>
        <a className="mt-5 link animate">Got it!</a>
      </Link>
    </div>
  );
};

export default PageNotFound;
