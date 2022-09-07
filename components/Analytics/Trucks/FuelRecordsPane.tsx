import React, { useEffect, useRef, useState } from "react";
import Row from "antd/lib/row";
import info from "antd/lib/message";
import moment from "moment";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Divider from "antd/lib/divider";
import CustomInput from "../../Shared/Input";
import Input from "../../Shared/Input";
import { useLazyGetTruckFuelReportQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { displayFuelRecords } from "../../../lib/redux/slices/trucksSlice";
import Loader from "../../Shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { FuelRecordsTypes } from "../../../lib/types/pageTypes/Trucks/DisplayTrucksTypes";

const FuelRecordsPane = () => {
  const componentDidMount = useRef(false);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [getTruckFuelReport] = useLazyGetTruckFuelReportQuery();

  const truckFuelRecordData = useSelector(
    (state: FuelRecordsTypes["state"]) => state.trucks.displayTrucksFuelRecords
  );

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  const router = useRouter();
  const { id: truckId } = router.query;

  const callAPI = (start?: string, end?: string) => {
    setIsPageLoading(true);

    getTruckFuelReport({
      id: truckId,
      startDate: start || "",
      endDate: end || ""
    })
      .unwrap()
      .then((res) => {
        dispatch(displayFuelRecords(res));
        setIsPageLoading(false);
      })
      .catch((err) => {
        setIsPageLoading(false);
        info.error(err?.data?.message || "Something is wrong");
      });
  };

  useEffect(() => {
    if (!componentDidMount.current && truckId) {
      callAPI();
      componentDidMount.current = true;
    }
  }, [truckId, getTruckFuelReport, dispatch]);

  useEffect(() => {
    callAPI(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <>
      <Row
        justify="space-between"
        className="bg-white my-4 mb-12 rounded shadow-[0px_0px_19px_#2A354808]"
      >
        <Col className="flex items-center gap-4">
          <CustomInput
            type="select"
            label=""
            options={[
              { label: "Revenue", value: "REVENUE" },
              { label: "Distance", value: "DISTANCE" },
              { label: "Weight", value: "WEIGHT" }
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
        </Col>
      </Row>

      <Divider />

      {isPageLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Row
            justify="space-between"
            className="p-6 py-4 rounded bg_yellow_faded"
          >
            <Col>
              <span className="font-bold uppercase">Total usage</span>
            </Col>

            <Col>
              <Row gutter={32}>
                <Col>
                  {numbersFormatter(
                    truckFuelRecordData?.reportsStats?.totalLitres || 0
                  )}{" "}
                  Litres
                </Col>

                <Col>
                  <span className="font-bold ">
                    {numbersFormatter(
                      truckFuelRecordData?.reportsStats?.totalAmount || 0
                    )}{" "}
                    Rwf
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          {truckFuelRecordData?.fuelReportRows?.content?.map((row: any) => (
            <Row
              key={row.date}
              style={{
                padding: "16px 24px 4px 24px",
                border: "1px solid var(--color_toggle_grey)",
                borderRadius: "4px",
                marginBottom: "16px"
              }}
              align="middle"
              justify="space-between"
              className="mt-6"
            >
              <Col>
                <p className="text-gray-400">
                  {moment(row.date).format("MMMM DD, YYYY")}
                </p>
                <p className="font-bold">{row?.pos}</p>
              </Col>

              <Col>
                <p className="text-gray-400 text-right italic">
                  Receipt: {row?.receiptNumber}
                </p>

                <Row gutter={32}>
                  <Col>
                    <span>{numbersFormatter(row?.litres || 0)} Litres</span>
                  </Col>
                  <Col>
                    <span className="yellow font-bold">
                      {numbersFormatter(row?.amount || 0)} Rwf
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </>
      )}
    </>
  );
};
export default FuelRecordsPane;
