import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { FC } from "react";
import { useGetTruckMovementQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { Query } from "../../../lib/types/shared";
import { GetTruckMovementResponse } from "../../../lib/types/trucksTypes";
import { SmallSpinLoader } from "../../Shared/Loaders/Loaders";
import OrderRoute from "./OrderRoute";

interface Props {
  truckID: number | string | Query;
  start: number;
  end: number | string | Date;
  isMoving: boolean;
}

const OrderPathWay: FC<Props> = ({ start, end, truckID, isMoving }) => {
  const canFetch = truckID && start && end;

  const { data: truckMovements, isFetching } = useGetTruckMovementQuery(
    canFetch
      ? {
          id: truckID,
          start: new Date(start).toISOString(),
          end: new Date(end).toISOString()
        }
      : skipToken
  );

  return isFetching ? (
    <div className="h-[100%] grid items-center justify-center">
      <SmallSpinLoader />
    </div>
  ) : !truckMovements?.payload?.length && !isMoving ? (
    <div className="h-[100%] w-[100%] grid items-center justify-center">
      <p className="w-[180px] text-center text-gray-500">
        The truck carrying this order hasn&apos;t moved yet!
      </p>
    </div>
  ) : (
    <OrderRoute
      movements={truckMovements as GetTruckMovementResponse}
      isMoving={isMoving}
      start={start}
      truckID={truckID}
    />
  );
};

export default OrderPathWay;
