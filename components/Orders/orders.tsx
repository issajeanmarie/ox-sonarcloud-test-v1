/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment, useEffect, useState } from "react";
import OrdersHeader from "./OrdersHeader";
import OneOrder from "./OneOrder";
import { useLazyOrdersQuery } from "../../lib/api/endpoints/Orders/ordersEndpoints";
import { message } from "antd";
import Loader from "../Shared/Loader";
import { Order, Order_Filter } from "../../lib/types/orders";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import Button from "../Shared/Button";

const Orders: FC = () => {
  const depot = useSelector((state: RootState) => state.depot);

  const [getOrders, { data, isLoading, isFetching }] = useLazyOrdersQuery({});

  const [filters, setFilters] = useState<Order_Filter>();

  const getOrdersAction = (filters: Order_Filter) => {
    getOrders(filters)
      .unwrap()
      .then()
      .catch((e) => {
        message.error(e.message || "Something went wrong");
      });
  };

  const triggerPagination = (page: string) => {
    setFilters({ ...filters, page });
  };

  useEffect(() => {
    // Apply pagination and filters here
    getOrdersAction({ ...filters, depot: depot.depotData.id });
  }, [depot, filters]);

  return (
    <div className="mx-4 relative">
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <OrdersHeader
            data={data}
            getOrders={getOrdersAction}
            loading={isFetching}
          />
          {data &&
            data.payload?.content?.map((order: Order, index: number) => (
              <OneOrder key={index} index={index + 1} order={order} />
            ))}
          <div className="flex justify-center mb-4">
            <div className="w-[100px]">
              <Button
                type="primary"
                loading={isFetching}
                onClick={() =>
                  triggerPagination(
                    String(data?.payload?.pageable?.pageNumber + 1)
                  )
                }
              >
                Load more
              </Button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Orders;
