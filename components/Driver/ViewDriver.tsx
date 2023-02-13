import { useEffect, useState } from "react";
import { Row } from "antd";
import Col from "antd/lib/col";
import Content from "../Shared/Content";
import WithPrivateRoute from "../Shared/Routes/WithPrivateRoute";
import Header from "./Header";
import DriverLeftSide from "./DriverLeftSide";
import DriverRightSide from "./DriverRightSide";
import Loader from "../Shared/Loader";
import {
  useDriverProfileQuery,
  useLazyGetDriverShiftsQuery
} from "../../lib/api/endpoints/Accounts/driversEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useRouter } from "next/router";
import { pagination } from "../../config/pagination";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";
import { DriverShiftResponse } from "../../lib/types/Accounts/drivers";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const ViewClient = () => {
  const [filterBasedLoader, setFilterBasedLoader] = useState<boolean>(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{
    id: number;
    name: string;
    value: string;
  }>({ id: 0, name: "All shifts", value: "" });
  const [getDriverShifts, { isLoading }] = useLazyGetDriverShiftsQuery();

  const allShiftsState = useSelector(
    (state: any) => state.paginatedData.displayPaginatedData
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const { id: driverId } = router.query;

  const { data: driver, isLoading: isDriverLoading } = useDriverProfileQuery(
    driverId
      ? {
          id: +driverId
        }
      : skipToken
  );

  const handleFetchDriverShiftsSuccess = (payload: DriverShiftResponse) => {
    dispatch(displayPaginatedData({ payload, onRender: true }));

    setFilterBasedLoader(false);
  };

  const getDriverShiftsAction = ({
    request = getDriverShifts,
    id = driverId,
    page,
    size = pagination.driverShifts.size,
    handleSuccess = handleFetchDriverShiftsSuccess,
    handleFailure,
    status = selectedFilter.value
  }: any) => {
    handleAPIRequests({
      request,
      id,
      page,
      size,
      status,
      handleSuccess,
      handleFailure
    });
  };

  useEffect(() => {
    setFilterBasedLoader(true);
    setCurrentPages(1);

    if (driverId) {
      getDriverShiftsAction({});
    }
  }, [driverId, selectedFilter]);

  const handleLoadMoreSuccess = ({ payload }: DriverShiftResponse) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getDriverShiftsAction({
      page: currentPages,
      handleFailure: handleLoadMoreFailure,
      handleSuccess: handleLoadMoreSuccess
    });
  };

  const showFiltersLoader = filterBasedLoader && !isLoadMoreLoading;
  const showPagination =
    (allShiftsState?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
    !showFiltersLoader;

  return isLoading || isDriverLoading ? (
    <Loader />
  ) : (
    <>
      {driver && <Header driverData={driver} />}

      <div className="mx-4 relative">
        <Content isOverflowHidden={false} navType="FULL">
          <Row className="p-5 justify-between gap-5">
            <Col
              className="h-[82vh] overflow-y-auto overflow-x-hidden"
              xs={24}
              sm={24}
              md={13}
              lg={13}
              xl={13}
              xxl={13}
            >
              <DriverLeftSide
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                shifts={allShiftsState}
                isLoading={filterBasedLoader}
                showPagination={showPagination}
                isLoadMoreLoading={isLoadMoreLoading}
                driverData={driver}
                handleLoadMore={handleLoadMore}
              />
            </Col>

            <Col
              xs={24}
              sm={24}
              md={10}
              lg={10}
              xl={10}
              xxl={10}
              className="h-[82vh] overflow-auto"
            >
              {driver && <DriverRightSide driverData={driver} />}
            </Col>
          </Row>
        </Content>
      </div>
    </>
  );
};

export default WithPrivateRoute(ViewClient);
