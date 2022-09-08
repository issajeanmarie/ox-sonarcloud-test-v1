import { FC, Fragment, useEffect } from "react";
import OrdersHeader from "./OrdersHeader";
import OneOrder from "./OneOrder";
import { useOrdersQuery } from "../../lib/api/endpoints/Orders/ordersEndpoints";
import { message } from "antd";
import Loader from "../Shared/Loader";

const Orders: FC = () => {
  const { data, isLoading, error } = useOrdersQuery();

  useEffect(() => {
    error && message.error(error || "Something went wrong");
  }, [error]);

  return (
    <div className="m-4 overflow-auto relative">
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <OrdersHeader data={data} />
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
