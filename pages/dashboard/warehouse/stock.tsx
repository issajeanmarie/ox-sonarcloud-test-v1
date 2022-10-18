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
  useStockCategoriesQuery
} from "../../../lib/api/endpoints/Warehouse/stockEndpoints";
import CardRowWrapper from "../../../components/Cards/CardRowWrapper";
import {
  StockCardsLoader,
  StockTableLoader
} from "../../../components/Shared/Loaders/Loaders";
import CardColWrapper from "../../../components/Cards/CardColWrapper";
import StockMediumCard from "../../../components/Cards/StockMediumCard";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import StockHistory from "../../../components/Warehouse/Stock/StockHistory";
import StockHistoryTable from "../../../components/Tables/Warehouse/StockHistoryTable";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { pagination } from "../../../config/pagination";

const Stock = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSort, setSelectedSort] = useState<any>({});
  const [active, setActive] = useState<string>("STOCK");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);
  const router = useRouter();
  const { query } = useRouter();

  const [filter, setFilter] = useState<any>({});

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

  const [getStocks, { data: apiData }] = useLazyStockQuery();
  const { data: stockCategories, isLoading: isStockCategoriesLoading } =
    useStockCategoriesQuery();

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
    getStocksAction({});
    setCurrentPages(1);
    setFiltersBasedLoader(true);
  }, [startDate, endDate, filter, selectedSort, depotId]);

  const handleLoadMoreOrdersSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreOrdersFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getStocksAction({
      page: currentPages,
      handleFailure: handleLoadMoreOrdersFailure,
      handleSuccess: handleLoadMoreOrdersSuccess
    });
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

      <div className="mx-4 relative">
        <StockTopNavigator
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          stocksNumber={apiData?.payload?.totalElements}
        />

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
                {stockCategories?.payload?.slice(0, 6)?.map((item: any) => (
                  <CardColWrapper key={item?.name} active="STOCK">
                    <StockMediumCard
                      title={item?.name}
                      subTitle={`${
                        item?.averageUnitCost &&
                        numbersFormatter(item?.averageUnitCost)
                      } Rwf / Kg`}
                      count={item?.totalWeight}
                      isFetching={false}
                    />
                  </CardColWrapper>
                ))}
              </CardRowWrapper>
            )}

            <StockHistory
              setFilter={setFilter}
              filter={filter}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
            />
          </StockTopContentWrapper>

          <Content navType="TRIPLE">
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
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Stock);
