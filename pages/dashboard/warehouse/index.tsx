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
import { WarehouseTableLoader } from "../../../components/Shared/Loaders/Loaders";
import { useLazySalesQuery } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { pagination } from "../../../config/pagination";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

const SalesPage = () => {
  const [active, setActive] = useState<string>("SALES");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const router = useRouter();
  const { query } = useRouter();
  const dispatch = useDispatch();

  const AllSales = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
  );

  const [getSales, { isLoading, isFetching, data: apiData }] =
    useLazySalesQuery();

  const handleRenderSuccess = (res: any) => {
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
  };

  const getSalesAction = ({
    page,
    size = pagination.sales.size,
    request = getSales,
    handleSuccess = handleRenderSuccess
  }: any) => {
    handleAPIRequests({
      request,
      page,
      size,
      handleSuccess
    });
  };

  useEffect(() => {
    getSalesAction({});
    setCurrentPages(1);
  }, []);

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

    getSalesAction({
      page: currentPages,
      handleFailure: handleLoadMoreOrdersFailure,
      handleSuccess: handleLoadMoreOrdersSuccess
    });
  };

  const onRenderLoader = isLoading || (isFetching && !isLoadMoreLoading);

  const showPagination =
    (AllSales?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
    !(isFetching && !isLoadMoreLoading);

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
          totalElements={apiData?.payload?.totalElements}
          isSalesLoading={onRenderLoader}
        />

        <Content isOverflowHidden={false} navType="DOUBLE">
          <>
            {onRenderLoader ? (
              <>
                {[...Array(10)].map((_, index) => (
                  <WarehouseTableLoader key={index} />
                ))}
              </>
            ) : (
              <>
                {AllSales?.payload?.content?.map((sale: any, index: number) => (
                  <OneWarehouseOrder
                    key={sale?.id}
                    itemNumber={index + 1}
                    sale={sale}
                    AllSales={AllSales}
                  />
                ))}
              </>
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
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(SalesPage);
