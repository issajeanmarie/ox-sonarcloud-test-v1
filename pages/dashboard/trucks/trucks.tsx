/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import Image from "antd/lib/image";
import Dropdown from "antd/lib/dropdown";
import CustomButton from "../../../components/Shared/Button/button";
import { pagination } from "../../../config/pagination";
import TrucksTable from "../../../components/Analytics/Trucks/TrucksTable";
import { NewTruckModal } from "../../../components/Modals";
import { useDownloadOOSReportMutation } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useLazyGetTrucksQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import DropDownSelector from "../../../components/Shared/DropDownSelector";
import Navbar from "../../../components/Shared/Content/Navbar";
import Heading1 from "../../../components/Shared/Text/Heading1";
import { localeString } from "../../../utils/numberFormatter";
import Input from "../../../components/Shared/Input";
import Button from "../../../components/Shared/Button";
import Content from "../../../components/Shared/Content";
import { SEO } from "../../../components/Shared";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

interface Trucks {
  displayPaginatedData: {
    totalPages: number;
    content: [];
  };
}

type State = {
  paginatedData: Trucks;
};

type BrowserState = {
  status: string | string[];
  search: string | string[];
  sort: string | string[];
};

const Trucks = () => {
  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedSort, setSelectedSort] = useState<any>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  const [getTrucks, { isLoading: getTrucksLoading }] = useLazyGetTrucksQuery();
  const [downloadOOSReport, { isLoading: isDownloadLoading }] =
    useDownloadOOSReportMutation();

  const handleDownloadSuccess = (file: File) => {
    handleDownloadFile({
      file,
      name: "OOS Report",
      fileFormat: "xls"
    });
  };

  const handleDownloadSuccess = (file: File) => {
    handleDownloadFile({
      file,
      name: "OOS Report",
      fileFormat: "xls"
    });
  };

  const dispatch = useDispatch();
  const trucksState: any = useSelector(
    (state: State) => state.paginatedData.displayPaginatedData
  );

  const handleRenderSuccess = (res: any) => {
    setFiltersBasedLoader(false);
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
  };

  const handleLoadMoreOrdersSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreOrdersFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const getTrucksAction = ({
    request = getTrucks,
    handleSuccess = handleRenderSuccess,
    page,
    size = pagination.trucks.size,
    status = selectedFilter.value || "",
    sort = selectedSort.value || "",
    search = searchValue || "",
    showSuccess = false
  }: any) => {
    handleAPIRequests({
      handleSuccess,
      size,
      page,
      status,
      sort,
      search,
      showSuccess,
      request
    });
  };

  const handleRenderSuccess = (res: any) => {
    setFiltersBasedLoader(false);
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
  };

  const handleLoadMoreOrdersSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreOrdersFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const getTrucksAction = ({
    request = getTrucks,
    handleSuccess = handleRenderSuccess,
    page,
    size = pagination.trucks.size,
    status = selectedFilter.value || "",
    sort = selectedSort.value || "",
    search = searchValue || "",
    showSuccess = false
  }: any) => {
    handleAPIRequests({
      handleSuccess,
      size,
      page,
      status,
      sort,
      search,
      showSuccess,
      request
    });
  };

  useEffect(() => {
    setFiltersBasedLoader(true);
    getTrucksAction({});
    setCurrentPages(1);
  }, [searchValue, selectedSort.value, selectedFilter.value]);

  const handleSearchTruck = (search: string) => {
    setSearchValue(search);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getTrucksAction({
      page: currentPages,
      handleFailure: handleLoadMoreOrdersFailure,
      handleSuccess: handleLoadMoreOrdersSuccess
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

  const showFiltersLoader = filtersBasedLoader && !isLoadMoreLoading;
  const showPagination =
    (trucksState?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
    !showFiltersLoader;

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
          <Heading1>
            {localeString(trucksState?.payload?.totalElements)} Trucks
          </Heading1>
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
        <div className="flex items-center gap-12 ">
          <Button
            loading={isDownloadLoading}
            type="dropdown"
            icon={
              <Image
                width={14}
                src="/icons/expand_more_black_24dp_yellow.svg"
                preview={false}
                alt=""
              />
            }
          >
            Download
          </Button>
        </div>
      </Dropdown>

      <div className="flex items-center gap-6 w-[120px]">
        <Button type="primary" onClick={() => setIsVisible(true)}>
          New Truck
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <SEO title="OX Dashboard | Trucks" />

      <div className="mx-4 relative">
        <NewTruckModal isVisible={isVisible} setIsVisible={setIsVisible} />

        <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />

        <Content isOverflowHidden={false} navType="CENTER">
          <>
            <TrucksTable
              data={trucksState?.payload?.content}
              isLoading={getTrucksLoading || showFiltersLoader}
            />

            {showPagination && (
              <div style={{ width: "12%", margin: "32px auto" }}>
                <CustomButton
                  form=""
                  loading={isLoadMoreLoading}
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
    </>
  );
};

export default WithPrivateRoute(Trucks);
