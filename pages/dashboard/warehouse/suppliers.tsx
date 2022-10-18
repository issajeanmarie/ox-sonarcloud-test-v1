/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import WarehouseTopNavigator from "../../../components/Warehouse/WarehouseTopNavigator";
import { WarehouseLinks } from "../../../components/Warehouse/WarehouseLinks";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import SuppliersTable from "../../../components/Tables/Warehouse/SuppliersTable";
import {
  useLazySuppliersQuery,
  useSuppliersQuery
} from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import CustomButton from "../../../components/Shared/Button";
import { AccountsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import SuppliersTopNavigator from "../../../components/Warehouse/WarehouseHeaders/SuppliersTopNavigator";
import Content from "../../../components/Shared/Content";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const SuppliersPage = () => {
  const [active, setActive] = useState<string>("SALES");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const router = useRouter();
  const { query } = useRouter();

  const [sort, setSort]: any = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [moreSuppliers, setMoreSuppliers] = useState<any>([]);

  const [suppliers, { isFetching: loadingMoreFetching }] =
    useLazySuppliersQuery();

  const {
    data: AllSuppliers,
    isLoading: isSuppliersLoading,
    isFetching: isSuppliersFetching
  } = useSuppliersQuery({
    page: "",
    size: pageSize,
    sort: sort.value || ""
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

  const handleLoadMoreSuccess = ({ payload }: any) => {
    setPageSize(pageSize + 20);
    setMoreSuppliers(payload);
  };

  const handleLoadMore = () => {
    handleAPIRequests({
      request: suppliers,
      page: "",
      size: pageSize,
      sort: sort.id || "",
      handleSuccess: handleLoadMoreSuccess
    });
  };

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  //WARNING MODAL
  const showWarningModal = () => {
    setIsWarningModalVisible(true);
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
        <SuppliersTopNavigator
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setSort={setSort}
          sort={sort}
          data={AllSuppliers?.payload}
        />

        <Content navType="DOUBLE">
          <>
            {isSuppliersLoading ? (
              <>
                {[...Array(20)].map((_, index) => (
                  <AccountsTableLoader key={index} />
                ))}
              </>
            ) : (
              <SuppliersTable
                isModalVisible={isWarningModalVisible}
                showModal={showWarningModal}
                setIsModalVisible={setIsWarningModalVisible}
                suppliers={
                  moreSuppliers?.length === 0
                    ? AllSuppliers?.payload?.content
                    : AllSuppliers?.payload?.content?.concat(
                        moreSuppliers?.content
                      )
                }
                isSuppliersFetching={isSuppliersFetching}
              />
            )}

            {pageSize > 19 &&
              AllSuppliers?.payload?.totalElements &&
              AllSuppliers?.payload?.totalElements >= pageSize && (
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

export default WithPrivateRoute(SuppliersPage);
