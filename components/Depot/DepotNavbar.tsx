import React, { useState } from "react";
import { useRouter } from "next/router";
import { Col, Image as AntDImage, Row } from "antd";
import Navbar from "../Shared/Content/Navbar";
import Input from "../Shared/Input";
import DropDownSelector from "../Shared/DropDownSelector";
import { daysList } from "../Analytics/DTOs/daysList";
import { SelectedDepotTypes } from "../../lib/types/depots";
import { useSelector } from "react-redux";

const DepotNavbar = () => {
  const [, setStartDate] = useState("");
  const [, setEndDate] = useState("");
  const [selectedDay, setSelectedDay] = useState<any>(daysList[0]);
  const [isDateCustom, setIsDateCustom] = useState(false);

  const depotsState = useSelector(
    (state: { depots: { payload: SelectedDepotTypes } }) => state.depots.payload
  );

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
    setIsDateCustom(true);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
    setIsDateCustom(true);
  };

  const router = useRouter();

  const LeftSide = (
    <div className="flex items-center gap-4 ">
      <AntDImage
        onClick={() => router.back()}
        className="pointer"
        src="/icons/keyboard_backspace_black_24dp.svg"
        alt="Backspace icon"
        width={20}
        height={20}
        preview={false}
      />
      <span className="text-md font-bold">{depotsState.depotName} profile</span>
    </div>
  );

  const RightSide = (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808]"
    >
      <Col className="flex items-center gap-4">
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
              <AntDImage
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
            <AntDImage
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
            <AntDImage
              preview={false}
              src="/icons/ic-actions-calendar.svg"
              alt=""
              width={18}
            />
          }
        />
      </Col>
    </Row>
  );

  return <Navbar LeftSide={LeftSide} RightSide={RightSide} type="FULL" />;
};

export default DepotNavbar;
