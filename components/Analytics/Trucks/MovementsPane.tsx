import React, { useState } from "react";
import Row from "antd//lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Divider from "antd/lib/divider";
import Input from "../../Shared/Input";
import OrderRoute from "../../Orders/ViewOrder/OrderRoute";
import { useGetTruckMovementQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { SmallSpinLoader } from "../../Shared/Loaders/Loaders";

const MovementsPane = () => {
  const [orderStartTime, setOrderStartTime] = useState("");
  const [orderEndTime, setOrderEndTime] = useState("");
  const [orderDate, setOrderDate] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const canFetch = id && orderStartTime && orderDate && orderEndTime;

  const { data: truckMovements, isFetching } = useGetTruckMovementQuery(
    canFetch
      ? {
          id,
          start: new Date(`${orderDate}T${orderStartTime}`).toISOString(),
          end: new Date(`${orderDate}T${orderEndTime}`).toISOString()
        }
      : skipToken
  );

  const onOrderDateChange = (_: string, date: string) => {
    setOrderDate(date);
  };

  const onOrderStartTimeChange = (_: string, time: string) => {
    setOrderStartTime(time);
  };

  const onOrderEndTimeChange = (_: string, time: string) => {
    setOrderEndTime(time);
  };

  return (
    <>
      <Row
        justify="space-between"
        className="bg-white my-4 mb-6 rounded shadow-[0px_0px_19px_#2A354808]"
      >
        <Col className="flex items-center gap-4 mb-4">
          <Input
            onDateChange={onOrderDateChange}
            type="date"
            name="Start"
            placeholder="Date"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
              />
            }
          />
        </Col>

        <Col className="flex items-center gap-4 mb-4">
          <Input
            onDateChange={onOrderStartTimeChange}
            type="time-picker"
            showTime
            dateFormat="HH:mm"
            name="start-time"
            placeholder="Start time"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
              />
            }
          />

          <Input
            onDateChange={onOrderEndTimeChange}
            type="time-picker"
            showTime
            dateFormat="HH:mm"
            name="end-time"
            placeholder="End time"
            suffixIcon={
              <Image
                preview={false}
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
              />
            }
          />
        </Col>
      </Row>

      <Divider />

      <div
        style={{ height: "calc(100vh - 380px)" }}
        className="mt-4 mb-12 border rounded overflow-hidden"
      >
        {isFetching ? (
          <div className="h-[100%] grid items-center justify-center">
            <SmallSpinLoader />
          </div>
        ) : !truckMovements?.payload?.length ? (
          <div className="h-[100%] w-[100%] grid items-center justify-center">
            <p className="w-[180px] text-center text-gray-500">
              Select date range that has movement history!
            </p>
          </div>
        ) : (
          <OrderRoute movements={truckMovements} />
        )}
      </div>
    </>
  );
};

export default MovementsPane;
