import { FC } from "react";
import { Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import SingleClientLeft from "./Client/Left/SingleClientLeft";
import SingleClientRight from "./Client/Right/SingleClientRight";
import SingleClientTop from "./Client/SingleClientTop";
import Content from "../Shared/Content";
import WithPrivateRoute from "../Shared/Routes/WithPrivateRoute";
import {
  useClientOrdersQuery,
  useLazyClientOrdersQuery,
  useClientQuery
} from "../../lib/api/endpoints/Clients/clientsEndpoint";
import { ViewClientTypes } from "../../lib/types/pageTypes/Clients/ViewClient";

const ViewClient: FC<ViewClientTypes> = ({ clientId }) => {
  const { query } = useRouter();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [moreClientOrders, setMoreClientOrders] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({});

  useEffect(() => {
    setPaymentStatus(selectedFilter.value || "");
  }, [selectedFilter]);

  const {
    data: client,
    isLoading: isClientLoading,
    isFetching: isClientFetching
  } = useClientQuery({ id: clientId });

  const {
    data: AllClientOrders,
    isLoading: isClientOrdersLoading,
    isFetching: isClientOrdersFetching
  } = useClientOrdersQuery({
    id: query?.client,
    page: "",
    size: pageSize,
    paymentStatus: paymentStatus
  });

  const [clientOrders, { isFetching: isMoreClientsOrderFetching }] =
    useLazyClientOrdersQuery();

  const handleLoadMore = () => {
    clientOrders({
      id: query?.client,
      page: "",
      size: pageSize,
      paymentStatus: paymentStatus
    })
      .unwrap()
      .then((res) => {
        setPageSize(pageSize + 9);
        setMoreClientOrders(res?.payload);
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <>
      <SingleClientTop client={client?.payload} router={router} />

      <div className="mx-4 relative">
        <Content navType="FULL">
          <Row className="p-5 justify-between gap-5">
            <SingleClientLeft
              client={client?.payload}
              isClientLoading={isClientLoading}
              isClientFetching={isClientFetching}
              clientOrders={AllClientOrders?.payload}
              isClientOrdersLoading={isClientOrdersLoading}
              isClientOrdersFetching={isClientOrdersFetching}
              moreClientOrders={moreClientOrders}
              handleLoadMore={handleLoadMore}
              pageSize={pageSize}
              isMoreClientsOrderFetching={isMoreClientsOrderFetching}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <SingleClientRight
              client={client?.payload}
              isClientLoading={isClientLoading}
              isClientFetching={isClientFetching}
              clientOrders={AllClientOrders?.payload}
              isClientOrdersLoading={isClientOrdersLoading}
              isClientOrdersFetching={isClientOrdersFetching}
            />
          </Row>
        </Content>
      </div>
    </>
  );
};

export default WithPrivateRoute(ViewClient);
