/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Image, Row } from "antd";
import React, { FC } from "react";
import { numbersFormatter } from "../../../../helpers/numbersFormatter";
import Input from "../../../Shared/Input";

type HeaderTypes = {
  orders: any;
  handleFilterChange: (value: string) => void;
  totalPending: number | undefined;
};

const Header: FC<HeaderTypes> = ({
  orders,
  handleFilterChange,
  totalPending
}) => {
  return (
    <Row className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1] flex justify-between">
      <Col className="flex items-center gap-4">
        <span className="font-bold">
          Order history (
          {orders?.totalElements && numbersFormatter(orders?.totalElements)})
        </span>
        <Input
          onChange={handleFilterChange}
          placeholder="Filter: All orders"
          type="select"
          label=""
          options={[
            { label: "Half paid", value: "HALF_PAID" },
            { label: "Full paid", value: "FULL_PAID" },
            { label: "Pending", value: "PENDING" },
            { label: "Write off", value: "WRITTEN_OFF" }
          ]}
          name="filterOrders"
          suffixIcon={
            <Image
              preview={false}
              src="/icons/expand_more_black_24dp.svg"
              alt=""
              width={10}
            />
          }
        />
      </Col>
      <Col className="flex items-center gap-4">
        <span className=" opacity_56">Total pending:</span>
        <span className="font-bold red">
          {totalPending && numbersFormatter(totalPending)} Rwf
        </span>
      </Col>
    </Row>
  );
};

export default Header;
