import { Image } from "antd";
import React, { FC } from "react";
import { RightSideKPIsTypes } from "../../../../../lib/types/pageTypes/Analytics/RightSideKPIsTypes";
import Input from "../../../../Shared/Input";

const RightSideKPIs: FC<RightSideKPIsTypes> = ({
  onStartDateChange,
  onEndDateChange
}) => {
  return (
    <>
      <Input
        type="select"
        label=""
        placeholder="Depot: All depots"
        options={[
          { label: "Tyazo", value: "t" },
          { label: "Kayove", value: "k" }
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
        type="select"
        label=""
        placeholder="Show: Last week"
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

export default RightSideKPIs;
