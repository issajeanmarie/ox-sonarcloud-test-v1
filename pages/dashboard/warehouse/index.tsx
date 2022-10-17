/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import OneWarehouseOrder from "../../../components/Warehouse/OneWarehouseOrder";
import CustomButton from "../../../components/Shared/Button";
import WarehouseTopNavigator from "../../../components/Warehouse/WarehouseTopNavigator";
import { WarehouseLinks } from "../../../components/Warehouse/WarehouseLinks";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import Content from "../../../components/Shared/Content";
import SalesTopNavigator from "../../../components/Warehouse/WarehouseHeaders/SalesTopNavigator";
import {
  useLazySalesQuery,
  useSalesQuery
} from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import Loader from "../../../components/Shared/Loader";

const SalesPage = () => {
  const [active, setActive] = useState<string>("SALES");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [moreSales, setMoreSales] = useState<any>([]);
  const router = useRouter();
  const { query } = useRouter();

  const { data: AllSales, isLoading: isSalesLoading } = useSalesQuery({
    page: "",
    size: pageSize
  });

  const [sales, { isFetching: loadingMoreFetching }] = useLazySalesQuery();

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

  const handleLoadMore = () => {
    sales({
      page: "",
      size: pageSize
    })
      .unwrap()
      .then((res) => {
        setPageSize(pageSize + 20);
        setMoreSales(res?.payload);
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
        <SalesTopNavigator
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          totalElements={AllSales?.payload?.totalElements}
          isSalesLoading={isSalesLoading}
        />

        <Content navType="DOUBLE">
          <>
            {isSalesLoading ? (
              <Loader />
            ) : (
              <>
                {AllSales?.payload?.content
                  ?.concat(moreSales?.content)
                  .map((sale: any, index: number) => (
                    <OneWarehouseOrder
                      key={sale?.id}
                      itemNumber={index + 1}
                      sale={sale}
                    />
                  ))}
              </>
            )}

            {pageSize > 19 &&
              AllSales?.payload?.totalElements &&
              AllSales?.payload?.totalElements >= pageSize && (
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
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(SalesPage);
