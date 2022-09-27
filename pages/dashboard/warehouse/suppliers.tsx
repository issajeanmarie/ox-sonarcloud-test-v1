import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import WarehouseHeader from "../../../components/Warehouse/WarehouseHeader";
import WarehouseTopNavigator from "../../../components/Warehouse/WarehouseTopNavigator";
import { WarehouseLinks } from "../../../components/Warehouse/WarehouseLinks";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import { WarehoueMenusNavigatorWrapper } from "../../../components/Warehouse/Wrappers";
import SuppliersTable from "../../../components/Tables/Warehouse/SuppliersTable";

const SuppliersPage = () => {
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
        <SuppliersTable />
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(SuppliersPage);
