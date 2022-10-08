/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment, useEffect, useState } from "react";
import OrdersHeader from "./OrdersHeader";
import OneOrder from "./OneOrder";
import { useLazyOrdersQuery } from "../../lib/api/endpoints/Orders/ordersEndpoints";
import Loader from "../Shared/Loader";
import { Order, Order_Filter } from "../../lib/types/orders";
import { useDispatch, useSelector } from "react-redux";
import { displayOrders } from "../../lib/redux/slices/ordersSlice";
import Button from "../Shared/Button";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { pagination } from "../../config/pagination";
import { getFromLocal } from "../../helpers/handleLocalStorage";
import { OX_ORDERS_FILTERS } from "../../config/constants";
import Content from "../Shared/Content";

type DepotTypes = {
  depotName: string | undefined;
  depotId: number | undefined;
};

const Orders: FC = () => {
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const ordersState = useSelector((state: any) => state.orders.displayOrders);
  const dispatch = useDispatch();

  const depotsState = useSelector(
    (state: { depots: { payload: DepotTypes } }) => state.depots.payload
  );

  const [getOrders, { data, isLoading, isFetching }] = useLazyOrdersQuery({});

  const filters = getFromLocal(OX_ORDERS_FILTERS);

  const handleRenderSuccess = (res: any) => {
    dispatch(displayOrders({ payload: res, onReder: true }));
  };

  const handleLoadMoreOrdersSuccess = ({ payload }: any) => {
    dispatch(displayOrders({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreOrdersFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const getOrdersAction = ({
    depot = depotsState?.depotId,
    filter = filters?.filter || "",
    page,
    size = pagination.orders.size,
    handleSuccess = handleRenderSuccess,
    handleFailure,
    start = filters?.start,
    end = filters?.end,
    momoRefCode = filters?.momoRefCode,
    truck = filters?.truck,
    driver = filters?.driver,
    request = getOrders
  }: Order_Filter) => {
    handleAPIRequests({
      request,
      page,
      size,
      handleSuccess,
      handleFailure,
      depot,
      filter,
      start,
      end,
      momoRefCode,
      truck,
      driver
    });
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getOrdersAction({
      page: currentPages,
      handleFailure: handleLoadMoreOrdersFailure,
      handleSuccess: handleLoadMoreOrdersSuccess
    });
  };

  useEffect(() => {
    getOrdersAction({ depot: depotsState?.depotId });
  }, [depotsState]);

  const showPaginationBtn =
    ordersState?.payload?.totalPages > currentPages || isLoadMoreLoading;

  const isOnlyFetching = isFetching && !isLoadMoreLoading;
  const showPagination = showPaginationBtn && !isOnlyFetching;
  const showFiltersLoader = isFetching && !isLoadMoreLoading;

  return (
    <div className="mx-4 relative">
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <OrdersHeader
            data={data}
            getOrdersAction={getOrdersAction}
            loading={isFetching}
          />

          <Content navType="CENTER">
            <>
              {showFiltersLoader ? (
                <Loader />
              ) : (
                data &&
                ordersState.payload?.content?.map(
                  (order: Order, index: number) => (
                    <OneOrder key={index} index={index + 1} order={order} />
                  )
                )
              )}

              {showPagination && (
                <div className="flex justify-center mb-4">
                  <div className="w-[100px]">
                    <Button
                      type="primary"
                      loading={isLoadMoreLoading}
                      onClick={handleLoadMore}
                    >
                      Load more
                    </Button>
                  </div>
                </div>
              )}
            </>
          </Content>
        </Fragment>
      )}
    </div>
  );
};

export default Orders;
