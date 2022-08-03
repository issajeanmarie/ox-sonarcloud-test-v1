import { FC, Fragment, useEffect } from "react";
import OrdersHeader from "./OrdersHeader";
import OneOrder from "./OneOrder";
import { useLazyOrdersQuery } from "../../lib/api/endpoints/Orders/ordersEndpoints";
import { message } from "antd";
import Loader from "../Shared/Loader";

const Orders: FC = () => {
  const [getOrders, { data, isLoading }] = useLazyOrdersQuery();

  useEffect(() => {
    getOrders()
      .unwrap()
      .then()
      .catch((e) => {
        message.error(e.data.message || "Something went wrong");
      });
  }, [getOrders]);

  return (
    <div className="m-4 overflow-auto relative">
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <OrdersHeader data={data} />
          {data &&
            data?.payload?.content?.map((order, index) => (
              <OneOrder key={index} index={index + 1} order={order} />
            ))}
        </Fragment>
      )}
    </div>
  );
};

export default Orders;
