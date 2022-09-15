/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import Dropdown from "antd/lib/dropdown";
import CustomInput from "../../../components/Shared/Input";
import CustomButton from "../../../components/Shared/Button/button";
import { pagination } from "../../../config/pagination";
import TrucksTable from "../../../components/Analytics/Trucks/TrucksTable";
import { displayTrucks } from "../../../lib/redux/slices/trucksSlice";
import { NewTruckModal } from "../../../components/Modals";
import {
  useFilterTrucksMutation,
  useLazyDownloadOOSReportQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import {
  useLoadMoreTrucksMutation,
  useLazyGetTrucksQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { handleDownloadSuccess } from "./functions";

const { Text } = Typography;

interface Trucks {
  displayTrucks: {
    totalPages: number;
    content: [];
  };
}

type State = {
  trucks: Trucks;
};

type BrowserState = {
  status: string | string[];
  search: string | string[];
  sort: string | string[];
};

const Trucks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [loadMoreTrucks, { isLoading: loadMoreLoading }] =
    useLoadMoreTrucksMutation();
  const [getTrucks, { isLoading: getTrucksLoading }] = useLazyGetTrucksQuery();
  const [filterTrucks, { isLoading: filterTrucksLoading }] =
    useFilterTrucksMutation();
  const [downloadOOSReport, { isLoading: isDownloadLoading }] =
    useLazyDownloadOOSReportQuery();

  const dispatch = useDispatch();
  const trucksState: any = useSelector(
    (state: State) => state.trucks.displayTrucks
  );
  const router = useRouter();
  const { browserStatus, browserSort, browserSearch } = router.query;

  const handleGetTrucksSuccess = (res: any) => {
    res && dispatch(displayTrucks({ payload: res, onReder: true }));
  };

  const handleLoadMoreTrucksSuccess = ({ payload }: any) => {
    dispatch(displayTrucks({ payload, paginate: true }));
  };

  useEffect(() => {
    dispatch(displayTrucks({}));
    router.push({
      query: {
        browserSort: "",
        browserStatus: "",
        browserSearch: ""
      }
    });

    handleAPIRequests({
      request: getTrucks,
      handleSuccess: handleGetTrucksSuccess,
      size: pagination.trucks,
      page: 0,
      showSuccess: false
    });
  }, [dispatch, getTrucks]);

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);

    handleAPIRequests({
      request: loadMoreTrucks,
      handleSuccess: handleLoadMoreTrucksSuccess,
      size: pagination.trucks,
      page: currentPages,
      status: browserStatus,
      sort: browserSort,
      search: browserSearch,
      showSuccess: false
    });
  };

  const showPaginationBtn =
    (trucksState?.totalPages > currentPages || loadMoreLoading) &&
    !(filterTrucksLoading || getTrucksLoading);

  const handleFilterTrucksSuccess = (res: any) => {
    setCurrentPages(1);
    dispatch(displayTrucks({ ...res, replace: true }));
  };

  const setBrowserStates = ({ search, sort, status }: BrowserState) => {
    router.push({
      query: {
        browserSearch: search,
        browserSort: sort,
        browserStatus: status
      }
    });
  };

  const handleFilterTrucks = (status: string) => {
    setBrowserStates({
      search: browserSearch || "",
      sort: browserSort || "",
      status
    });

    handleAPIRequests({
      request: filterTrucks,
      handleSuccess: handleFilterTrucksSuccess,
      size: pagination.trucks,
      page: 0,
      status,
      sort: browserSort,
      search: browserSearch,
      showSuccess: false
    });
  };

  const handleSortTrucks = (sort: string) => {
    setBrowserStates({
      status: browserStatus || "",
      sort,
      search: browserSearch || ""
    });

    handleAPIRequests({
      request: filterTrucks,
      handleSuccess: handleFilterTrucksSuccess,
      size: pagination.trucks,
      page: 0,
      status: browserStatus,
      search: browserSearch,
      sort: sort
    });
  };

  const handleSearchTruck = (search: string) => {
    setBrowserStates({
      status: browserStatus || "",
      search,
      sort: browserSort || ""
    });

    handleAPIRequests({
      request: filterTrucks,
      handleSuccess: handleFilterTrucksSuccess,
      size: pagination.trucks,
      page: 0,
      status: browserStatus,
      sort: browserSort,
      search: search,
      showSuccess: false
    });
  };

  const handleDownloadOOSReport = () => {
    handleAPIRequests({
      request: downloadOOSReport,
      successMessage: "File downloaded successfully!",
      handleSuccess: handleDownloadSuccess,
      fileType: "PDF"
    });
  };

  const dropDownMenu = (
    <div className="radius4 p-3 py-6 bg-white rounded shadow-[0px_0px_19px_#2A354808] border">
      <Row className="text-sm pointer" onClick={handleDownloadOOSReport}>
        <Col>Download OOS Report</Col>
      </Row>
    </div>
  );
  return (
    <>
      <NewTruckModal isVisible={isVisible} setIsVisible={setIsVisible} />

      <div className="flex items-center justify-between mt-6 bg-white py-2 rounded px-4 m-auto w-[98%] border_faded mb-4">
        {/* LEFT SIDE  */}
        <div className="flex items-center gap-12">
          <Text className="heading2">
            {trucksState?.totalElements || 0} Trucks
          </Text>

          <CustomInput
            type="text"
            name="search"
            size="small"
            placeholder="Search plate number or modal"
            onChange={handleSearchTruck}
            suffixIcon={
              <Image
                width={14}
                src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
                preview={false}
                alt=""
              />
            }
          />

          <CustomInput
            type="select"
            label=""
            placeholder="Filter: All trucks"
            options={[
              { label: "All", value: "ALL" },
              { label: "In use", value: "ACTIVE" },
              { label: "Out of service", value: "INACTIVE" }
            ]}
            name="sort"
            showSearch={false}
            onChange={handleFilterTrucks}
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />

          <CustomInput
            type="select"
            label=""
            placeholder="Sort: Date (New - Old)"
            options={[
              { label: "Date (New - Old)", value: "DATE_DESC" },
              { label: "Date (Old - New)", value: "DATE_ASC" },
              { label: "Name (A - Z)", value: "NAMES_ASC" },
              { label: "Name (Z - A)", value: "NAMES_DESC" }
            ]}
            name="sort"
            showSearch={false}
            onChange={handleSortTrucks}
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <Dropdown overlay={dropDownMenu} placement="bottomLeft">
            <Button loading={isDownloadLoading}>Download</Button>
          </Dropdown>

          <CustomButton
            type="primary"
            size="small"
            onClick={() => setIsVisible(true)}
          >
            NEW TRUCK
          </CustomButton>
        </div>
      </div>

      <div className="h-[82vh] overflow-scroll">
        <TrucksTable
          data={trucksState?.content}
          isLoading={getTrucksLoading || filterTrucksLoading}
        />

        {showPaginationBtn && (
          <div style={{ width: "12%", margin: "32px auto" }}>
            <CustomButton
              loading={loadMoreLoading}
              type="secondary"
              onClick={handleLoadMore}
            >
              Load more
            </CustomButton>
          </div>
        )}
      </div>
    </>
  );
};

export default WithPrivateRoute(Trucks);
