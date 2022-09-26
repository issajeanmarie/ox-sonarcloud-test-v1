import { Image } from "antd";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import React, { FC } from "react";
import { RightSideRevenueTypes } from "../../../../../lib/types/pageTypes/Analytics/RightSideRevenueTypes";
import Input from "../../../../Shared/Input";
import DropDownSelector from "../../../DropDownSelector";

const RightSideRevenue: FC<RightSideRevenueTypes> = ({
  onStartDateChange,
  onEndDateChange,
  selectedDay,
  setSelectedDay,
  isDateCustom,
  setIsDateCustom,
  daysList
}) => {
  return (
    <>
      {!isDateCustom ? (
        <DropDownSelector
          label="Show"
          dropDownContent={daysList}
          defaultSelected={selectedDay}
          setDefaultSelected={setSelectedDay}
        />
      ) : (
        <Row align="middle" gutter={12}>
          <Col className="font-bold">Custom</Col>
          <Col>
            <Image
              onClick={() => {
                setIsDateCustom(false);
                setSelectedDay(daysList[0]);
              }}
              preview={false}
              src="/icons/close_black_24dp.svg"
              alt=""
              className="mt-2 pointer"
              width={16}
            />
          </Col>
        </Row>
      )}

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
    </>
  );
};

export default RightSideRevenue;
