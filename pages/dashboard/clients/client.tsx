import { Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import SingleClientLeft from "../../../components/Clients/Client/Left/SingleClientLeft";
import SingleClientRight from "../../../components/Clients/Client/Right/SingleClientRight";
import SingleClientTop from "../../../components/Clients/Client/SingleClientTop";
import Content from "../../../components/Shared/Content";
import Layout from "../../../components/Shared/Layout";
import PageNotFound from "../../../components/Shared/PageNotFound";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { routes } from "../../../config/route-config";
import {
  useClientOrdersQuery,
  useClientQuery,
  useLazyClientOrdersQuery
} from "../../../lib/api/endpoints/Clients/clientsEndpoint";

const Client = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [moreClientOrders, setMoreClientOrders] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({});

  useEffect(() => {
    setPaymentStatus(selectedFilter.value || "");
  }, [selectedFilter]);

  useEffect(() => {
    if (router.isReady) {
      if (Object.keys(query).length === 0 || !query?.client) {
        router.replace(routes.Clients.url);
      }
    }
  }, [router.isReady, query, router, query?.client]);

  const {
    data: client,
    isLoading: isClientLoading,
    isFetching: isClientFetching
  } = useClientQuery({ id: query?.client });

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
    <Layout>
      {router.isReady && !isClientLoading && !client ? (
        <PageNotFound />
      ) : (
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
      )}
    </Layout>
  );
};

export default WithPrivateRoute(Client);
