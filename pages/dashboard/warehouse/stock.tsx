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
  useStockCategoriesQuery,
  useStockQuery
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

const Stock = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSort, setSelectedSort] = useState<any>({});
  const [active, setActive] = useState<string>("STOCK");
  const [pageSize, setPageSize] = useState(20);
  const [moreStocks, setMoreStocks] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
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
              {isStocksLoading ? (
                <div className="mt-4">
                  {[...Array(20)].map((_, index) => (
                    <StockTableLoader key={index} />
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
            </>
          </Content>
        </>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Stock);
