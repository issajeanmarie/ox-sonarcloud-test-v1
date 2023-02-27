/* eslint-disable no-unsafe-optional-chaining */
import { Image } from "antd";
import React, { FC } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useDepotsQuery } from "../../../../../lib/api/endpoints/Depots/depotEndpoints";
import { RightSideKPIsTypes } from "../../../../../lib/types/pageTypes/Analytics/RightSideKPIsTypes";
import Input from "../../../../Shared/Input";
import DropDownSelector from "../../../DropDownSelector";

const RightSideKPIs: FC<RightSideKPIsTypes> = ({
  onStartDateChange,
  onEndDateChange,
  selectedDay,
  setSelectedDay,
  isDateCustom,
  setIsDateCustom,
  daysList,
  selectedDepot,
  setSelectedDepot,
  form
}) => {
  const { data } = useDepotsQuery();

  return (
    <Form
      className="flex gap-6"
      name="SortAnalyticsRevenue"
      form={form}
      title="Issue"
      id="SortAnalyticsRevenue"
    >
      <DropDownSelector
        label="Depot"
        dropDownContent={
          data?.payload?.length
            ? [{ id: 0, name: "All depots" }, ...data?.payload]
            : [{ id: 0, name: "All depots" }]
        }
        defaultSelected={selectedDepot}
        setDefaultSelected={setSelectedDepot}
      />

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
    </Form>
  );
};

export default RightSideKPIs;
