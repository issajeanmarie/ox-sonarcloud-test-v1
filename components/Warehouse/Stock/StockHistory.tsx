import { Col, Image, Row } from "antd";
import React, { FC } from "react";
import Input from "../../Shared/Input";
import { StockHistoryTypes as StockHistoryTypes } from "../../../lib/types/pageTypes/Warehouse/Stock/StockHistoryTyes";
import DropDownSelector from "../../Shared/DropDownSelector";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";

const StockHistory: FC<StockHistoryTypes> = ({
  filter,
  setFilter,
  onStartDateChange,
  onEndDateChange
}) => {
  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>
          <Heading1>Stock history</Heading1>
        </Col>

        <Col>
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
        </Col>

        <Col>
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
        </Col>

        <Col>
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
      </Row>
    </Col>
  );

  return (
    <>
      <Navbar LeftSide={LeftSide} type="CENTER" />
    </>
  );
};

export default StockHistory;
