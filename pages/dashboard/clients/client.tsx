import { Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SingleClientLeft from "../../../components/Clients/Client/Left/SingleClientLeft";
import SingleClientRight from "../../../components/Clients/Client/Right/SingleClientRight";
import SingleClientTop from "../../../components/Clients/Client/SingleClientTop";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { routes } from "../../../config/route-config";
import { useClientQuery } from "../../../lib/api/endpoints/Clients/clientsEndpoint";

const Client = () => {
  const { query } = useRouter();
  const router = useRouter();

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

  return (
    <Layout>
      <SingleClientTop
        client={client?.payload}
        isClientLoading={isClientLoading}
        isClientFetching={isClientFetching}
      />
      <Row className="p-5 flex justify-between gap-5">
        <SingleClientLeft
          client={client?.payload}
          isClientLoading={isClientLoading}
          isClientFetching={isClientFetching}
        />

        <SingleClientRight
          client={client?.payload}
          isClientLoading={isClientLoading}
          isClientFetching={isClientFetching}
        />
      </Row>
    </Layout>
  );
};

export default WithPrivateRoute(Client);
