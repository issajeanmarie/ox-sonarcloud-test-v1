import { FC, Fragment, useEffect } from "react";
import OrdersHeader from "./OrdersHeader";
import OneOrder from "./OneOrder";
import { useLazyOrdersQuery } from "../../lib/api/endpoints/Orders/ordersEndpoints";
import { message } from "antd";
import Loader from "../Shared/Loader";
import { Order_Filter } from "../../lib/types/orders";

const Orders: FC = () => {
  const [getOrders, { data, isLoading, isFetching }] = useLazyOrdersQuery({});

  const getOrdersAction = (filters: Order_Filter) => {
    getOrders(filters)
      .unwrap()
      .then()
      .catch((e) => {
        message.error(e.message || "Something went wrong");
      });
  };

  useEffect(() => {
    getOrdersAction({});
  }, []);

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
            data?.payload?.content?.map(
              (order: object | any, index: number) => (
                <OneOrder key={index} index={index + 1} order={order} />
              )
            )}
        </Fragment>
      )}
    </div>
  );
};

export default Orders;
