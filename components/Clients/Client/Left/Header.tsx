import { Col, Image, Row } from "antd";
import React from "react";
import Input from "../../../Shared/Input";

const Header = () => {
  return (
    <Row className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1] flex justify-between">
      <Col className="flex items-center gap-4">
        <span className="font-bold">Order history (21)</span>
        <Input
          placeholder="Filter: All orders"
          type="select"
          label=""
          options={[
            { label: "Item one", value: "Item one" },
            { label: "Item two", value: "Item two" },
            { label: "Item three", value: "Item three" }
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
        <span className="font-bold red">88,000 Rwf</span>
      </Col>
    </Row>
  );
};

export default Header;
