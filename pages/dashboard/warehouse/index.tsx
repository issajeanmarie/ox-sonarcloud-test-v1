import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import WarehouseHeader from "../../../components/Warehouse/WarehouseHeader";
import OneWarehouseOrder from "../../../components/Warehouse/OneWarehouseOrder";
import CustomButton from "../../../components/Shared/Button";
import WarehouseTopNavigator from "../../../components/Warehouse/WarehouseTopNavigator";
import { WarehouseLinks } from "../../../components/Warehouse/WarehouseLinks";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import { WarehoueMenusNavigatorWrapper } from "../../../components/Warehouse/Wrappers";

const SalesPage = () => {
  const [active, setActive] = useState<string>("SALES");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { query } = useRouter();

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
        {[...Array(20)].map((_, index) => (
          <OneWarehouseOrder key={index} index={index} />
        ))}

        <div style={{ width: "12%", margin: "32px auto" }}>
          <CustomButton type="secondary">Load more</CustomButton>
        </div>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(SalesPage);
