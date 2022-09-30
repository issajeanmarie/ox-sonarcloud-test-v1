/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import WarehouseHeader from "../../../components/Warehouse/WarehouseHeader";
import WarehouseTopNavigator from "../../../components/Warehouse/WarehouseTopNavigator";
import { WarehouseLinks } from "../../../components/Warehouse/WarehouseLinks";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import CustomButton from "../../../components/Shared/Button";
import {
  StockTopContentWrapper,
  WarehoueMenusNavigatorWrapper
} from "../../../components/Warehouse/Wrappers";
import CardRowWrapper from "../../../components/Cards/CardRowWrapper";
import CardColWrapper from "../../../components/Cards/CardColWrapper";
import StockMediumCard from "../../../components/Cards/StockMediumCard";
import StockHistory from "../../../components/Warehouse/Stock/StockHistory";
import StockHistoryTable from "../../../components/Tables/Warehouse/StockHistoryTable";
import {
  useLazyStockQuery,
  useStockCategoriesQuery,
  useStockQuery
} from "../../../lib/api/endpoints/Warehouse/stockEndpoints";
import {
  CardsLoader,
  ColsTableLoader
} from "../../../components/Shared/Loaders/Loaders";
import { numbersFormatter } from "../../../helpers/numbersFormatter";

const StockPage = () => {
  const [active, setActive] = useState<string>("SALES");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { query } = useRouter();

  const [sort, setSort]: any = useState("");

  const [filter, setFilter] = useState<any>({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [moreStocks, setMoreStocks] = useState<any>([]);

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  const [stock, { isFetching: loadingMoreFetching }] = useLazyStockQuery();
  const { data: stockCategories, isLoading: isStockCategoriesLoading } =
    useStockCategoriesQuery();

  const {
    data: AllStocks,
    isLoading: isStocksLoading,
    isFetching: isStocksFetching
  } = useStockQuery({
    page: "",
    size: pageSize,
    start: startDate,
    end: endDate,
    depot: "",
    status: filter?.value || ""
  });

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

  const handleLoadMore = () => {
    stock({
      page: "",
      size: pageSize,
      start: startDate,
      end: endDate,
      depot: "",
      status: filter?.value || ""
    })
      .unwrap()
      .then((res) => {
        setPageSize(pageSize + 20);
        setMoreStocks(res?.payload);
      })
      .catch((error) => {
        return error;
      });
  };

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <Layout>
      <WarehouseTopNavigator
        headerLinks={WarehouseLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <WarehoueMenusNavigatorWrapper>
        <WarehouseHeader
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          query={query}
          setSort={setSort}
          sort={sort}
          data={AllStocks?.payload}
          dataLoading={isStocksLoading}
        />
      </WarehoueMenusNavigatorWrapper>

      <div className="px-5">
        <StockTopContentWrapper>
          {isStockCategoriesLoading ? (
            <>
              <CardRowWrapper active={active}>
                {[...Array(5)].map((_, index) => (
                  <CardsLoader key={index} />
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

        <div className="mb-10">
          {isStocksLoading ? (
            <div className="mt-4">
              {[...Array(20)].map((_, index) => (
                <ColsTableLoader key={index} />
              ))}
            </div>
          ) : (
            <StockHistoryTable
              Stocks={
                moreStocks?.length === 0
                  ? AllStocks?.payload?.content
                  : AllStocks?.payload?.content?.concat(moreStocks?.content)
              }
              isStocksFetching={isStocksFetching}
            />
          )}

          {pageSize > 19 &&
            AllStocks?.payload?.totalElements &&
            AllStocks?.payload?.totalElements >= pageSize && (
              <div style={{ width: "12%", margin: "32px auto" }}>
                <CustomButton
                  loading={loadingMoreFetching}
                  onClick={handleLoadMore}
                  type="secondary"
                >
                  Load more
                </CustomButton>
              </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(StockPage);
