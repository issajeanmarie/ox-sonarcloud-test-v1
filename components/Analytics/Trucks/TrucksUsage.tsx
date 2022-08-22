import { Col, Image, Row, Typography } from "antd";
import React, { FC } from "react";
import CustomInput from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import { TrucksUsageTypes } from "../../../lib/types/pageTypes/Analytics/TrucksUsageTableTypes";

const { Text } = Typography;

const TrucksUsage: FC<TrucksUsageTypes> = ({ sorter }) => {
  return (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808]"
    >
      <Col className="flex items-center gap-4">
        <Text className="heading2">Trucks usage</Text>
        <CustomInput
          // onSelectChange={onSortChange}
          type="select"
          label=""
          placeholder={`Sort: ${sorter}`}
          options={[
            { label: "Revenue", value: "REVENUE" },
            { label: "Distance", value: "DISTANCE" },
            { label: "Weight", value: "WEIGHT" }
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
        <CustomButton type="secondary">
          <span className="text-sm">DOWNLOAD REPORT</span>
        </CustomButton>
      </Col>
    </Row>
  );
};

export default TrucksUsage;
