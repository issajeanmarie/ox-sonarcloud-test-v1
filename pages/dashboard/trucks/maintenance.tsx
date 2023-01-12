/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Shared/Layout";
import { useLazyGetTruckMaintenanceChecklistQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import ViewTruckMaintenance from "../../../components/Analytics/Trucks/ViewTruckMaintenance";
import { pagination } from "../../../config/pagination";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { useDispatch, useSelector } from "react-redux";

const Maintenance = () => {
  const router = useRouter();
  const { id: truckId } = router.query;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState<boolean>(false);
  const [filterBasedLoaders, setFilterBasedLoaders] = useState<boolean>(false);
  const [isNewInspectionModalVisible, setIsNewInspectionModalVisible] =
    useState(false);

  const dispatch = useDispatch();

  const truckMaintenanceState = useSelector(
    (state: {
      paginatedData: {
        displayPaginatedData: { payload: { content: any; totalPages: number } };
      };
    }) => state.paginatedData.displayPaginatedData
  );

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };

  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  const [getTruckMaintenanceList, { isLoading }] =
    useLazyGetTruckMaintenanceChecklistQuery();

  const handleRenderSuccess = (res: any) => {
    setCurrentPage(1);
    setFilterBasedLoaders(false);
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
  };

  const getTruckMaintenanceAction = ({
    id = truckId,
    request = getTruckMaintenanceList,
    page = 0,
    size = pagination.preventativeMaintenanceChecklist.size,
    start = startDate,
    end = endDate,
    handleSuccess = handleRenderSuccess,
    handleFailure
  }: any) => {
    handleAPIRequests({
      request,
      id,
      page,
      size,
      start,
      end,
      handleSuccess,
      handleFailure
    });
  };

  useEffect(() => {
    if (truckId) {
      getTruckMaintenanceAction({});
      setFilterBasedLoaders(true);
    }
  }, [truckId, startDate, endDate]);

  const handleLoadMoreSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleLoadMore = () => {
    setIsLoadMoreLoading(true);
    setCurrentPage(currentPage + 1);

    getTruckMaintenanceAction({
      page: currentPage,
      handleSuccess: handleLoadMoreSuccess,
      handleFailure: handleLoadMoreFailure
    });
  };

  const showPagination =
    truckMaintenanceState?.payload?.totalPages > currentPage ||
    isLoadMoreLoading;

  return (
    <Layout>
      <ViewTruckMaintenance
        truckId={truckId}
        maintenanceData={truckMaintenanceState?.payload}
        isLoading={filterBasedLoaders}
        isPageLoading={isLoading}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        isAddInspectionModalVisible={isNewInspectionModalVisible}
        setIsAddInspectionModalVisible={setIsNewInspectionModalVisible}
        startDate={startDate}
        endDate={endDate}
        showPagination={showPagination}
        handleLoadMore={handleLoadMore}
        isLoadMoreLoading={isLoadMoreLoading}
        getTruckMaintenanceAction={getTruckMaintenanceAction}
      />
    </Layout>
  );
};

export default Maintenance;
