import { Image } from "antd";
import React, { FC } from "react";
import { RightSideRevenueTypes } from "../../../../../lib/types/pageTypes/Analytics/RightSideRevenueTypes";
import Input from "../../../../Shared/Input";

const RightSideRevenue: FC<RightSideRevenueTypes> = ({
  onStartDateChange,
  onEndDateChange
}) => {
  return (
    <>
      <Input
        type="select"
        label=""
        placeholder="Show: Last 7 days"
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
