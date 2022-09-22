import { Image, Select } from "antd";
import React, { FC } from "react";
import { useDepotsQuery } from "../../../../../lib/api/endpoints/Depots/depotEndpoints";
import { RightSideKPIsTypes } from "../../../../../lib/types/pageTypes/Analytics/RightSideKPIsTypes";
import Input from "../../../../Shared/Input";

const { Option } = Select;

const RightSideKPIs: FC<RightSideKPIsTypes> = ({
  onStartDateChange,
  onEndDateChange,
  onLastWeekChange,
  handleDepotChange
}) => {
  const { data, isLoading } = useDepotsQuery();
  return (
    <>
      <Input
        onChange={handleDepotChange}
        loading={isLoading}
        type="select"
        label=""
        placeholder="Depot: All depots"
        isGroupDropdown
        name="sort"
        suffixIcon={
          <Image
            preview={false}
            src="/icons/expand_more_black_24dp.svg"
            alt=""
            width={10}
          />
        }
      >
        <Option value="">All categories</Option>
        {data?.payload?.map((item) => (
          <Option value={item?.id} key={item?.name}>
            {item?.name}
          </Option>
        ))}
      </Input>

      <Input
        picker="week"
        onDateChange={onLastWeekChange}
        type="date"
        name="Start"
        placeholder="Show: Last week"
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
        defaultValue={localStorage.getItem("ox_startDate")}
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
        defaultValue={localStorage.getItem("ox_endDate")}
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
