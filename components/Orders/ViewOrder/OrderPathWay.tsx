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
  isOrderAbove24Hours: boolean;
}

const OrderPathWay: FC<Props> = ({
  start,
  end,
  truckID,
  isMoving,
  isOrderAbove24Hours
}) => {
  const canFetch = truckID && start && end;
  const show24HoursError = isMoving && isOrderAbove24Hours;

  const { data: truckMovements, isFetching } = useGetTruckMovementQuery(
    canFetch && !show24HoursError
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
    <OrderPathWayMessages message=" The truck carrying this order neither did it move nor was it being tracked by maps!" />
  ) : isMoving && isOrderAbove24Hours ? (
    <OrderPathWayMessages
      message="This order has gone above 24 hours, hence we are unable to track it on
        maps!"
    />
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

export const OrderPathWayMessages = ({ message }: { message: string }) => {
  return (
    <div className="h-[100%] w-[100%] grid items-center justify-center">
      <p className="w-[180px] text-center text-gray-500">{message}</p>
    </div>
  );
};
