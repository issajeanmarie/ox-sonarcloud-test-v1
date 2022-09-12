import Link from "next/link";
import React from "react";
import { routes } from "../../../config/route-config";

const PageNotFound = () => {
  return (
    <div className="h-full flex justify-center items-center w-full flex-col">
      <div className="mb-4 flex flex-col text-center">
        <span className="font-light">This page is not available.</span>
        <span className="font-light">It may have been deleted</span>
        <span className="font-light">
          or the link you requested is incorrect
        </span>
      </div>

      <Link passHref href={routes.Orders.url}>
        <a className="mt-5 link animate">Got it!</a>
      </Link>
    </div>
  );
};

export default PageNotFound;
