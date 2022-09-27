import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import WarehouseHeader from "../../../components/Warehouse/WarehouseHeader";
import WarehouseTopNavigator from "../../../components/Warehouse/WarehouseTopNavigator";
import { WarehouseLinks } from "../../../components/Warehouse/WarehouseLinks";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import {
  StockTopContentWrapper,
  WarehoueMenusNavigatorWrapper
} from "../../../components/Warehouse/Wrappers";
import CardRowWrapper from "../../../components/Cards/CardRowWrapper";
import CardColWrapper from "../../../components/Cards/CardColWrapper";
import StockMediumCard from "../../../components/Cards/StockMediumCard";
import StockHistory from "../../../components/Warehouse/Stock/StockHistory";
import StockHistoryTable from "../../../components/Tables/Warehouse/StockHistoryTable";

const StockPage = () => {
  const [active, setActive] = useState<string>("SALES");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { query } = useRouter();

  const [sorter, setSorter] = useState("Item one");
  const [startDate, setStartDate] = useState(
    localStorage.getItem("ox_startDate")
      ? localStorage.getItem("ox_startDate")
      : ""
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("ox_endDate") ? localStorage.getItem("ox_endDate") : ""
  );

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

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  //STOCK HISTORY
  const onSortChange = (sorter: string) => {
    setSorter(sorter);
  };

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
    localStorage.setItem("ox_startDate", date);
    return startDate;
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
    localStorage.setItem("ox_endDate", date);
    return endDate;
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
        />
      </WarehoueMenusNavigatorWrapper>

      <div className="px-5">
        <StockTopContentWrapper>
          <CardRowWrapper active="STOCK">
            <CardColWrapper active="STOCK">
              <StockMediumCard
                title="Animal feed (Type 1)"
                subTitle="100 Rwf / Kg"
                count={500}
                isFetching={false}
              />
            </CardColWrapper>
            <CardColWrapper active="STOCK">
              <StockMediumCard
                title="Animal feed (Type 2)"
                subTitle="100 Rwf / Kg"
                count={500}
                isFetching={false}
              />
            </CardColWrapper>
            <CardColWrapper active="STOCK">
              <StockMediumCard
                title="Animal feed (Type 3)"
                subTitle="100 Rwf / Kg"
                count={500}
                isFetching={false}
              />
            </CardColWrapper>
            <CardColWrapper active="STOCK">
              <StockMediumCard
                title="Animal feed (Type 3)"
                subTitle="100 Rwf / Kg"
                count={500}
                isFetching={false}
              />
            </CardColWrapper>
            <CardColWrapper active="STOCK">
              <StockMediumCard
                title="Animal feed (Type 3)"
                subTitle="100 Rwf / Kg"
                count={500}
                isFetching={false}
              />
            </CardColWrapper>
          </CardRowWrapper>

          <StockHistory
            onSortChange={onSortChange}
            sorter={sorter}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
          />
        </StockTopContentWrapper>

        <div className="mb-10">
          <StockHistoryTable />
        </div>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(StockPage);
