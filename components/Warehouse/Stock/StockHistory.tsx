import { Col, Image, Row, Typography } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import { StockHistoryTyes } from "../../../lib/types/pageTypes/Warehouse/Stock/StockHistoryTyes";

const { Text } = Typography;

const StockHistory: FC<StockHistoryTyes> = ({
  sorter,
  onSortChange,
  onStartDateChange,
  onEndDateChange
}) => {
  return (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808]"
    >
      <Col className="flex items-center gap-4">
        <Text className="heading2">Stock history</Text>
        <Input
          onSelectChange={onSortChange}
          type="select"
          label=""
          placeholder={`Sort: ${sorter}`}
          options={[
            { label: "Item one", value: "REVENUE" },
            { label: "Item two", value: "DISTANCE" },
            { label: "Item three", value: "WEIGHT" }
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
        <Input
          onDateChange={onStartDateChange}
          defaultValue={localStorage.getItem("ox_startDate")}
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
        <Input
          onDateChange={onEndDateChange}
          defaultValue={localStorage.getItem("ox_endDate")}
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
        <CustomButton type="secondary">
          <span className="text-sm">DOWNLOAD</span>
        </CustomButton>
      </Col>
    </Row>
  );
};

export default StockHistory;
