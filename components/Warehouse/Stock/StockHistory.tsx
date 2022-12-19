import { Col, Image, Row } from "antd";
import React, { FC } from "react";
import Button from "../../Shared/Button";
import Input from "../../Shared/Input";
import { StockHistoryTypes as StockHistoryTypes } from "../../../lib/types/pageTypes/Warehouse/Stock/StockHistoryTyes";
import DropDownSelector from "../../Shared/DropDownSelector";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";

const StockHistory: FC<StockHistoryTypes> = ({
  filter,
  setFilter,
  onStartDateChange,
  onEndDateChange,
  downloadStockHistoryReport,
  isDownloading
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

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6">
        <Button
          type="primary"
          onClick={downloadStockHistoryReport}
          loading={isDownloading}
        >
          Download report
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default StockHistory;
