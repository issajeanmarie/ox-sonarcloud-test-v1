/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import WarehouseTopNavigator from "../../../components/Warehouse/WarehouseTopNavigator";
import { WarehouseLinks } from "../../../components/Warehouse/WarehouseLinks";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import Content from "../../../components/Shared/Content";
import StockTopNavigator from "../../../components/Warehouse/WarehouseHeaders/StockTopNavigator";
import { StockTopContentWrapper } from "../../../components/Warehouse/Wrappers";
import {
  useLazyStockQuery,
  useLazyWarehouseItemBatchesQuery,
  useLazyWarehouseItemsQuery
} from "../../../lib/api/endpoints/Warehouse/stockEndpoints";
import CardRowWrapper, {
  CardMoreStockRowWrapper
} from "../../../components/Cards/CardRowWrapper";
import {
  MediumSpinLoader,
  StockCardsLoader,
  StockTableLoader
} from "../../../components/Shared/Loaders/Loaders";
import CardColWrapper, {
  CardMoreStockColWrapper
} from "../../../components/Cards/CardColWrapper";
import StockMediumCard from "../../../components/Cards/StockMediumCard";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import StockHistory from "../../../components/Warehouse/Stock/StockHistory";
import StockHistoryTable from "../../../components/Tables/Warehouse/StockHistoryTable";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { pagination } from "../../../config/pagination";
import Image from "antd/lib/image";
import BatchesModal from "../../../components/Modals/BatchesModal";
import { useDownloadAnalyticsReportMutation } from "../../../lib/api/endpoints/Analytics/analyticEndpoints";
import { ErrorMessage } from "../../../components/Shared/Messages/ErrorMessage";
import moment from "moment";
import fileDownload from "js-file-download";

const Stock = () => {
  const [isBatchesModalVisible, setIsBatchesModalVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allBatches, setAllBatches] = useState<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const [batchesStartDate, setBatchesStartDate] = useState("");
  const [batchesEndDate, setBatchesEndDate] = useState("");
  const [categoryInfo, setCategoryInfo] = useState<
    { id: number } | undefined
  >();

  const [selectedSort, setSelectedSort] = useState<any>({});
  const [active, setActive] = useState<string>("STOCK");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [batchesCurrentPages, setBatchesCurrentPages] = useState(1);
  const [warehouseItems, setWarehouseItems] = useState<any>({});
  const [warehouseItemsCurrentPages, setWarehouseItemsCurrentPages] =
    useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [isLoadMoreWarehouseItemsLoading, setIsLoadMoreWarehouseItemsLoading] =
    useState(false);
  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);
  const [
    warehouseITemsFiltersBasedLoader,
    setWarehouseITemsFiltersBasedLoader
  ] = useState(false);
  const [batchesFiltersBasedLoader, setBatchesFiltersBasedLoader] =
    useState(false);
  const router = useRouter();
  const { query } = useRouter();

  const [filter, setFilter] = useState<any>({});
  const [batchesFilter, setBatchesFilter] = useState<any>({});

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  useEffect(() => {
    if (router.isReady) {
      if (Object.keys(query).length === 0 || !query.wtb) {
        changeRoute(`${routes.Warehouse.url}?wtb=SALES`);
        setActive("SALES");
      }
    }
  }, [router.isReady, query, router, query?.wtb]);

  const toggleActiveHandler = (id: string) => {
    setActive(id);
    id === "SALES" && changeRoute(`${routes.Warehouse.url}?wtb=SALES`);
    id === "STOCK" && changeRoute(`${routes.Stock.url}?wtb=STOCK`);
    id === "SUPPLIERS" && changeRoute(`${routes.Suppliers.url}?wtb=SUPPLIERS`);
  };

  const [getStocks] = useLazyStockQuery();

  const [
    getWarehouseItems,
    {
      data: stockCategories,
      isLoading: isStockCategoriesLoading,
      isFetching: isStockCategoriesFetching
    }
  ] = useLazyWarehouseItemsQuery();
  const AllStocks = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
  );

  const { depotId } = useSelector(
    (state: { depots: any }) => state.depots.payload
  );
  const dispatch = useDispatch();

  const [downloadStockHistory, { isLoading: isDownloading }] =
    useDownloadAnalyticsReportMutation();

  const handleDownloadFile = (file: File) => {
    const date = moment().format("YYYY-MM-DD");
    fileDownload(file, `Report-${date}.XLS`);
  };

  const downloadStockHistoryReport = () => {
    if (startDate) {
      handleAPIRequests({
        request: downloadStockHistory,
        showSuccess: true,
        handleSuccess: handleDownloadFile,
        file_type: "XLS",
        start: startDate,
        end: endDate,
        scope: "WAREHOUSE "
      });
    } else {
      ErrorMessage("Please select start date to get the report!");
    }
  };

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleRenderSuccess = (res: any) => {
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
    setFiltersBasedLoader(false);
  };

  const handleWarehouseItemsRender = (res: any) => {
    setWarehouseItems(res);
    setWarehouseITemsFiltersBasedLoader(false);
  };

  const getWarehouseItemsAction = ({
    page,
    size = pagination.warehouseItems.size,
    request = getWarehouseItems,
    start = startDate,
    end = endDate,
    depot = depotId,
    search = searchQuery,
    sort = selectedSort?.value || "",
    handleSuccess = handleWarehouseItemsRender
  }: any) => {
    handleAPIRequests({
      request,
      start,
      end,
      depot,
      search,
      sort,
      size,
      page,
      handleSuccess
    });
  };

  const getStocksAction = ({
    request = getStocks,
    page,
    size = pagination.stock.size,
    start = startDate,
    end = endDate,
    depot = depotId,
    sort = selectedSort?.value || "",
    status = filter?.value || "",
    handleSuccess = handleRenderSuccess
  }: any) => {
    handleAPIRequests({
      request,
      page,
      size,
      start,
      end,
      depot,
      status,
      sort,
      handleSuccess
    });
  };

  useEffect(() => {
    getWarehouseItemsAction({});
    setWarehouseItemsCurrentPages(1);
    setWarehouseITemsFiltersBasedLoader(true);
  }, [startDate, endDate, selectedSort, depotId, searchQuery]);

  useEffect(() => {
    if (query.page !== "more") {
      getStocksAction({});
      setCurrentPages(1);
      setFiltersBasedLoader(true);
    }
  }, [startDate, endDate, filter, selectedSort, depotId]);

  const handleLoadMoreStocksSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreStocksFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getStocksAction({
      page: currentPages,
      handleFailure: handleLoadMoreStocksFailure,
      handleSuccess: handleLoadMoreStocksSuccess
    });
  };

  const handleLoadMoreWarehouseItemsSuccess = (res: any) => {
    setWarehouseItems({
      ...warehouseItems,
      payload: {
        ...warehouseItems.payload,
        content: [...warehouseItems.payload.content, ...res.payload.content]
      }
    });

    setIsLoadMoreWarehouseItemsLoading(false);
  };

  const handleLoadMoreWarehouseItemsFailure = () => {
    setIsLoadMoreWarehouseItemsLoading(false);
  };

  const handleLoadMoreWarehouseItems = () => {
    setWarehouseItemsCurrentPages(warehouseItemsCurrentPages + 1);
    setIsLoadMoreWarehouseItemsLoading(true);

    getWarehouseItemsAction({
      page: warehouseItemsCurrentPages,
      handleFailure: handleLoadMoreWarehouseItemsFailure,
      handleSuccess: handleLoadMoreWarehouseItemsSuccess
    });
  };

  const [getBatches] = useLazyWarehouseItemBatchesQuery();

  const handleGetBatchesSuccess = (res: any) => {
    setAllBatches(res);
    setBatchesFiltersBasedLoader(false);
  };

  const getBatchesAction = ({
    request = getBatches,
    id = categoryInfo?.id,
    page,
    size = pagination.stock.size,
    start = batchesStartDate,
    end = batchesEndDate,
    status = batchesFilter?.value || "",
    handleSuccess = handleGetBatchesSuccess
  }: any) => {
    handleAPIRequests({
      request,
      page,
      size,
      start,
      end,
      status,
      id,
      handleSuccess
    });
  };

  const handleSearch = (search: string) => {
    setSearchQuery(search);
  };

  useEffect(() => {
    if (categoryInfo) {
      getBatchesAction({});
      setBatchesFiltersBasedLoader(true);
      setBatchesCurrentPages(1);
    }
  }, [batchesStartDate, batchesEndDate, batchesFilter, categoryInfo]);

  const showBatchesModal = (category: any) => {
    setIsBatchesModalVisible(true);
    setCategoryInfo(category);
  };

  const showFiltersLoader = filtersBasedLoader && !isLoadMoreLoading;
  const showPagination =
    (AllStocks?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
    !showFiltersLoader;

  const showWarehouseItemsFilterLoader =
    warehouseITemsFiltersBasedLoader && !isLoadMoreWarehouseItemsLoading;

  const showWarehouseItemsLoadMore =
    (stockCategories?.payload?.totalPages > warehouseItemsCurrentPages ||
      isLoadMoreWarehouseItemsLoading) &&
    !showWarehouseItemsFilterLoader;

  return (
    <Layout>
      <WarehouseTopNavigator
        headerLinks={WarehouseLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <BatchesModal
        isVisible={isBatchesModalVisible}
        setIsVisible={setIsBatchesModalVisible}
        setStartDate={setBatchesStartDate}
        setEndDate={setBatchesEndDate}
        filter={batchesFilter}
        setFilter={setBatchesFilter}
        batches={allBatches}
        setBatches={setAllBatches}
        categoryInfo={categoryInfo}
        getBatchesAction={getBatchesAction}
        filtersBasedLoader={batchesFiltersBasedLoader}
        currentPages={batchesCurrentPages}
        setCurrentPages={setBatchesCurrentPages}
      />

      <div className="mx-4 relative">
        <StockTopNavigator
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          stocksNumber={stockCategories?.payload?.totalElements}
          handleSearch={handleSearch}
        />

        <>
          {query?.page === "more" ? (
            <Content isOverflowHidden={false} navType="DOUBLE">
              {showWarehouseItemsFilterLoader ? (
                <div className="w-full h-full flex justify-center items-center">
                  <MediumSpinLoader />
                </div>
              ) : (
                <CardMoreStockRowWrapper>
                  {warehouseItems?.payload?.content?.map((item: any) => (
                    <CardMoreStockColWrapper key={item?.name}>
                      <StockMediumCard
                        showBatchesModal={showBatchesModal}
                        title={item?.categoryName}
                        subTitle={`${numbersFormatter(
                          item?.unitSellingPrice || 0
                        )} Rwf / Kg`}
                        count={item?.weight}
                        isFetching={showWarehouseItemsFilterLoader}
                        categoryInfo={item}
                      />
                    </CardMoreStockColWrapper>
                  ))}

                  {showWarehouseItemsLoadMore && (
                    <div style={{ width: "12%", margin: "32px auto" }}>
                      <CustomButton
                        loading={isLoadMoreWarehouseItemsLoading}
                        onClick={handleLoadMoreWarehouseItems}
                        type="secondary"
                      >
                        Load more
                      </CustomButton>
                    </div>
                  )}
                </CardMoreStockRowWrapper>
              )}
            </Content>
          ) : (
            <>
              <StockTopContentWrapper>
                {isStockCategoriesLoading ? (
                  <>
                    <CardRowWrapper active={active}>
                      {[...Array(5)].map((_, index) => (
                        <StockCardsLoader key={index} />
                      ))}
                    </CardRowWrapper>
                  </>
                ) : (
                  <CardRowWrapper active="STOCK">
                    {stockCategories?.payload?.content
                      ?.slice(0, 5)
                      ?.map((item: any) => (
                        <CardColWrapper key={item?.name} active="STOCK">
                          <StockMediumCard
                            showBatchesModal={showBatchesModal}
                            title={item?.categoryName}
                            subTitle={`${numbersFormatter(
                              item?.unitSellingPrice || 0
                            )} Rwf / Kg`}
                            count={item?.weight}
                            isFetching={isStockCategoriesFetching}
                            categoryInfo={item}
                          />
                        </CardColWrapper>
                      ))}
                    {stockCategories?.payload?.content?.length > 5 && (
                      <>
                        <div className="bg-[#FEFBF3] w-[123px] p-4 flex flex-col justify-center items-center border border-ox-input-white">
                          <div
                            onClick={() =>
                              changeRoute(
                                `${routes.Stock.url}?wtb=STOCK&page=more`
                              )
                            }
                            className="text-base font-light bg-white border border-ox-input-white rounded-full p-4  flex justify-center items-center cursor-pointer"
                          >
                            <Image
                              src="/icons/arrow-right.svg"
                              width="16"
                              height="16"
                              alt=""
                              preview={false}
                            />
                          </div>

                          <div className="text-base font-light mt-4">
                            See all items
                          </div>
                        </div>
                      </>
                    )}
                  </CardRowWrapper>
                )}

                <StockHistory
                  setFilter={setFilter}
                  filter={filter}
                  onStartDateChange={onStartDateChange}
                  onEndDateChange={onEndDateChange}
                  downloadStockHistoryReport={downloadStockHistoryReport}
                  isDownloading={isDownloading}
                />
              </StockTopContentWrapper>

              <Content isOverflowHidden={false} navType="TRIPLE">
                <>
                  {showFiltersLoader ? (
                    <div className="mt-4">
                      {[...Array(20)].map((_, index) => (
                        <StockTableLoader key={index} />
                      ))}
                    </div>
                  ) : (
                    <StockHistoryTable
                      Stocks={AllStocks}
                      isStocksFetching={showFiltersLoader}
                      isStockCategoriesFetching={isStockCategoriesFetching}
                      tableType="STOCK_HISTORY"
                      setBatches={setAllBatches}
                      isEditSpecificBatch={isBatchesModalVisible}
                    />
                  )}

                  {showPagination && (
                    <div style={{ width: "12%", margin: "32px auto" }}>
                      <CustomButton
                        loading={isLoadMoreLoading}
                        onClick={handleLoadMore}
                        type="secondary"
                      >
                        Load more
                      </CustomButton>
                    </div>
                  )}
                </>
              </Content>
            </>
          )}
        </>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Stock);
