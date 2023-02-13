import { useSelector } from "react-redux";
import Form from "antd/lib/form";
import { useState, useEffect } from "react";
import Row from "antd/lib/row";
import React from "react";
import Content from "../Shared/Content";
import DepotLeftSide from "./DepotLeftSide";
import DepotNavbar from "./DepotNavbar";
import DepotRightSide from "./DepotRightSide";
import {
  useLazyDepotProfileQuery,
  useLazyGetFlagsQuery
} from "../../lib/api/endpoints/Depots/depotEndpoints";
import { SelectedDepotTypes } from "../../lib/types/depots";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import Loader from "../Shared/Loader";
import { daysList } from "../Analytics/DTOs/daysList";
import DaysCalculator from "../../helpers/daysCalculator";
import moment from "moment";
import { DepotProfileLoader } from "../Shared/Loaders/Loaders";

const DepotProfilePage = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateCustom, setIsDateCustom] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>(daysList[0]);

  const { start, end } = DaysCalculator(selectedDay?.value || "");

  const [form] = Form.useForm();

  useEffect(() => {
    if (!isDateCustom) {
      form.setFieldsValue({
        Start: moment(start),
        End: moment(end)
      });
    }
  }, [start, end, form, isDateCustom]);

  const depotsState = useSelector(
    (state: { depots: { payload: SelectedDepotTypes } }) => state.depots.payload
  );

  const [getDepotProfile, { isLoading, isFetching, data }] =
    useLazyDepotProfileQuery();

  const [
    getFlags,
    { isLoading: isFlagsLoading, isFetching: isFlagsFetching, data: flagsData }
  ] = useLazyGetFlagsQuery();

  useEffect(() => {
    if (depotsState.depotId) {
      handleAPIRequests({
        request: getDepotProfile,
        start: isDateCustom ? startDate : start,
        end: isDateCustom ? endDate : end,
        id: depotsState.depotId
      });
    }
  }, [
    depotsState.depotId,
    end,
    endDate,
    getDepotProfile,
    isDateCustom,
    start,
    startDate
  ]);

  useEffect(() => {
    if (depotsState.depotId) {
      handleAPIRequests({
        request: getFlags,
        start: isDateCustom ? startDate : start,
        end: isDateCustom ? endDate : end,
        id: depotsState.depotId,
        search,
        page: 0,
        size: 40
      });
    }
  }, [
    depotsState.depotId,
    end,
    endDate,
    getFlags,
    isDateCustom,
    search,
    start,
    startDate
  ]);

  return isLoading || isFlagsLoading ? (
    <Loader />
  ) : (
    <>
      <DepotNavbar
        isDateCustom={isDateCustom}
        setIsDateCustom={setIsDateCustom}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        depotsState={depotsState}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        form={form}
      />

      <Content isOverflowHidden={false} navType="FULL">
        <Row className="p-5 gap-5" wrap={false}>
          {isFetching ? (
            <DepotProfileLoader />
          ) : (
            <>
              {data && <DepotLeftSide depotData={data} />}

              {flagsData && (
                <DepotRightSide
                  setSearch={setSearch}
                  flagsData={flagsData}
                  isLoading={isFlagsFetching}
                />
              )}
            </>
          )}
        </Row>
      </Content>
    </>
  );
};

export default DepotProfilePage;
