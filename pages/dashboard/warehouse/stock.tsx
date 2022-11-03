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
  useLazyStockCategoriesQuery
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
import Image from "next/image";
import BatchesModal from "../../../components/Modals/BatchesModal";

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
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);
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
    getCategories,
    {
      data: stockCategories,
      isLoading: isStockCategoriesLoading,
      isFetching: isStockCategoriesFetching
    }
  ] = useLazyStockCategoriesQuery();
  const AllStocks = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
  );

  const { depotId } = useSelector(
    (state: { depots: any }) => state.depots.payload
  );
  const dispatch = useDispatch();

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleRenderSuccess = (res: any) => {
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
    setFiltersBasedLoader(false);
  };

  const getCategoriesActions = ({
    page,
    size = pagination.stock.size,
    request = getCategories,
    start = startDate,
    end = endDate,
    depot = depotId,
    search = searchQuery,
    sort = selectedSort?.value || ""
  }: any) => {
    handleAPIRequests({
      request,
      start,
      end,
      depot,
      search,
      sort,
      size,
      page
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
    getCategoriesActions({});
  }, [startDate, endDate, selectedSort, depotId, searchQuery]);

  useEffect(() => {
    getStocksAction({});
    setCurrentPages(1);
    setFiltersBasedLoader(true);
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
              {isStockCategoriesLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <MediumSpinLoader />
                </div>
              ) : (
                <CardMoreStockRowWrapper>
                  {stockCategories?.payload?.content?.map((item: any) => (
                    <CardMoreStockColWrapper key={item?.name}>
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
                    </CardMoreStockColWrapper>
                  ))}
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
