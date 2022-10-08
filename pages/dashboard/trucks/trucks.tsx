/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import Image from "antd/lib/image";
import Dropdown from "antd/lib/dropdown";
import CustomButton from "../../../components/Shared/Button/button";
import { pagination } from "../../../config/pagination";
import TrucksTable from "../../../components/Analytics/Trucks/TrucksTable";
import { displayTrucks } from "../../../lib/redux/slices/trucksSlice";
import { NewTruckModal } from "../../../components/Modals";
import {
  useFilterTrucksMutation,
  useDownloadOOSReportMutation
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import {
  useLoadMoreTrucksMutation,
  useLazyGetTrucksQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import DropDownSelector from "../../../components/Shared/DropDownSelector";
import Navbar from "../../../components/Shared/Content/Navbar";
import Heading1 from "../../../components/Shared/Text/Heading1";
import { localeString } from "../../../utils/numberFormatter";
import Input from "../../../components/Shared/Input";
import Button from "../../../components/Shared/Button";
import Content from "../../../components/Shared/Content";

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
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedSort, setSelectedSort] = useState<any>({});
  const [loadMoreTrucks, { isLoading: loadMoreLoading }] =
    useLoadMoreTrucksMutation();
  const [getTrucks, { isLoading: getTrucksLoading }] = useLazyGetTrucksQuery();
  const [filterTrucks, { isLoading: filterTrucksLoading }] =
    useFilterTrucksMutation();
  const [downloadOOSReport, { isLoading: isDownloadLoading }] =
    useDownloadOOSReportMutation();

  const handleDownloadSuccess = (file: File) => {
    handleDownloadFile({
      file,
      name: "OOS Report",
      fileFormat: "xls"
    });
  };

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

  useEffect(() => {
    setBrowserStates({
      search: browserSearch || "",
      sort: browserSort || "",
      status: selectedFilter.value || ""
    });

    handleAPIRequests({
      request: filterTrucks,
      handleSuccess: handleFilterTrucksSuccess,
      size: pagination.trucks,
      page: 0,
      status: selectedFilter.value || "",
      sort: browserSort,
      search: browserSearch,
      showSuccess: false
    });
  }, [selectedFilter]);

  useEffect(() => {
    setBrowserStates({
      status: browserStatus || "",
      sort: selectedSort.value || "",
      search: browserSearch || ""
    });

    handleAPIRequests({
      request: filterTrucks,
      handleSuccess: handleFilterTrucksSuccess,
      size: pagination.trucks,
      page: 0,
      status: browserStatus,
      search: browserSearch,
      sort: selectedSort.value || ""
    });
  }, [selectedSort]);

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
      fileType: "XLS"
    });
  };

  const downloadOOSdropdown = (
    <div className="radius4 p-3 py-6 bg-white rounded shadow-[0px_0px_19px_#2A354808] border">
      <Row className="text-sm pointer" onClick={handleDownloadOOSReport}>
        <Col>Download OOS Report</Col>
      </Row>
    </div>
  );

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>
          <Heading1>{localeString(trucksState?.totalElements)} Trucks</Heading1>
        </Col>

        <Col>
          <Input
            allowClear
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
        </Col>

        <Col>
          <DropDownSelector
            label="Filter"
            dropDownContent={[
              { id: 0, name: "All", value: "ALL" },
              { id: 1, name: "In use", value: "ACTIVE" },
              { id: 2, name: "Out of service", value: "INACTIVE" }
            ]}
            defaultSelected={selectedFilter}
            setDefaultSelected={setSelectedFilter}
          />
        </Col>

        <Col>
          <DropDownSelector
            label="Sort"
            dropDownContent={[
              { id: 0, name: "Date (New - Old)", value: "DATE_DESC" },
              { id: 1, name: "Date (Old - New)", value: "DATE_ASC" },
              { id: 2, name: "Name (A - Z)", value: "NAMES_ASC" },
              { id: 3, name: "Name (Z - A)", value: "NAMES_DESC" }
            ]}
            defaultSelected={selectedSort}
            setDefaultSelected={setSelectedSort}
          />
        </Col>
      </Row>
    </Col>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <Dropdown overlay={downloadOOSdropdown} placement="bottomLeft">
        <div className="flex items-center gap-6 w-[200px]">
          <Button loading={isDownloadLoading} type="secondary">
            DOWNLOAD LIST
          </Button>
        </div>
      </Dropdown>

      <div className="flex items-center gap-6 w-[200px]">
        <Button type="primary" onClick={() => setIsVisible(true)}>
          NEW TRUCK
        </Button>
      </div>
    </div>
  );

  return (
    <div className="mx-4 relative">
      <NewTruckModal isVisible={isVisible} setIsVisible={setIsVisible} />

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />

      <Content navType="CENTER">
        <>
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
        </>
      </Content>
    </div>
  );
};

export default WithPrivateRoute(Trucks);
