import { Col, Image, Row, Typography } from "antd";
import React from "react";
import CustomInput from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";

const { Text } = Typography;

const TrucksUsage = () => {
  return (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808]"
    >
      <Col className="flex items-center gap-4">
        <Text className="heading2">Trucks usage</Text>
        <CustomInput
          type="select"
          label=""
          placeholder="Sort: Revenue made"
          options={[
            { label: "Item one", value: "one" },
            { label: "Item two", value: "two" },
            { label: "Item three", value: "three" }
          ]}
          name="sort"
          suffixIcon={
            <Image
              preview={false}
              src="/icons/expand_more_black_24dp.svg"
              alt=""
              width={10}
            />
          }
        />
        <CustomInput
          type="date"
          name="Start"
          placeholder="Start"
          suffixIcon={
            <Image
              preview={false}
              src="/icons/ic-actions-calendar.svg"
              alt=""
              width={18}
            />
          }
        />
        <CustomInput
          type="date"
          name="End"
          placeholder="End"
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

      <Col className="flex items-center gap-4">
        <CustomInput
          type="text"
          placeholder="Search truck"
          name="searchTruckUsage"
          suffixIcon={
            <Image
              width={10}
              src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
              preview={false}
              alt=""
            />
          }
        />
        <CustomButton type="secondary">DOWNLOAD REPORT</CustomButton>
      </Col>
    </Row>
  );
};

export default TrucksUsage;
