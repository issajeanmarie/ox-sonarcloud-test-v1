/* eslint-disable react-hooks/exhaustive-deps */
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
import { useLazySuppliersQuery } from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import CustomButton from "../../../components/Shared/Button";
import { AccountsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import SuppliersTopNavigator from "../../../components/Warehouse/WarehouseHeaders/SuppliersTopNavigator";
import Content from "../../../components/Shared/Content";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { pagination } from "../../../config/pagination";

const SuppliersPage = () => {
  const [active, setActive] = useState<string>("SALES");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const router = useRouter();
  const { query } = useRouter();

  const dispatch = useDispatch();

  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);
  const [selectedSort, setSelectedSort]: any = useState("");
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [getSuppliers, { isFetching: loadingMoreFetching, data: apiData }] =
    useLazySuppliersQuery();

  const AllSuppliers = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
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

  const handleRenderSuccess = (res: any) => {
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
    setFiltersBasedLoader(false);
  };

  const getSuppliersAction = ({
    page,
    size = pagination.suppliers.size,
    sort = selectedSort?.value || "",
    request = getSuppliers,
    handleSuccess = handleRenderSuccess
  }: any) => {
    handleAPIRequests({
      request,
      sort,
      size,
      page,
      handleSuccess
    });
  };

  useEffect(() => {
    getSuppliersAction({});
    setCurrentPages(1);
    setFiltersBasedLoader(true);
  }, [selectedSort]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showWarningModal = () => {
    setIsWarningModalVisible(true);
  };

  const handleLoadMoreSuppliersSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreSuppliersFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getSuppliersAction({
      page: currentPages,
      handleFailure: handleLoadMoreSuppliersFailure,
      handleSuccess: handleLoadMoreSuppliersSuccess
    });
  };

  const showFiltersLoader = filtersBasedLoader && !isLoadMoreLoading;
  const showPagination =
    (AllSuppliers?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
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
        <SuppliersTopNavigator
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setSort={setSelectedSort}
          sort={selectedSort}
          totalElements={apiData?.payload?.totalElements}
        />

        <Content navType="DOUBLE">
          <>
            {showFiltersLoader ? (
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
                suppliers={AllSuppliers}
                isSuppliersFetching={showFiltersLoader}
              />
            )}

            {showPagination && (
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
