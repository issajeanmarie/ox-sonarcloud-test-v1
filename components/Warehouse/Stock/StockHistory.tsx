import { Col, Image, Row, Typography } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import { StockHistoryTyes } from "../../../lib/types/pageTypes/Warehouse/Stock/StockHistoryTyes";
import DropDownSelector from "../../Shared/DropDownSelector";

const { Text } = Typography;

const StockHistory: FC<StockHistoryTyes> = ({
  filter,
  setFilter,
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
        <DropDownSelector
          label="Filter"
          dropDownContent={[
            { id: 0, name: "View all", value: "" },
            { id: 1, name: "Expired", value: "EXPIRED" },
            { id: 2, name: "Not expired", value: "NOT_EXPIRED" }
          ]}
          defaultSelected={filter}
          setDefaultSelected={setFilter}
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
