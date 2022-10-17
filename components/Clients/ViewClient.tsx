/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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
  useClientQuery,
  useLazyClientOrdersQuery
} from "../../lib/api/endpoints/Clients/clientsEndpoint";
import { ViewClientTypes } from "../../lib/types/pageTypes/Clients/ViewClient";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../../config/pagination";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";

const ViewClient: FC<ViewClientTypes> = ({ clientId }) => {
  const { query } = useRouter();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);

  const AllClientOrders = useSelector(
    (state: any) => state.paginatedData.displayPaginatedData
  );

  useEffect(() => {
    setPaymentStatus(selectedFilter.value || "");
  }, [selectedFilter]);

  const dispatch = useDispatch();

  const [
    clientOrders,
    { isLoading: isClientOrdersLoading, isFetching: isClientOrdersFetching }
  ] = useLazyClientOrdersQuery();

  const handleOnRenderSuccess = ({ payload }: any) => {
    setFiltersBasedLoader(false);
    dispatch(
      displayPaginatedData({
        onRender: true,
        payload: {
          payload: {
            ...payload?.orders,
            totalPending: payload?.totalPending,
            orderDays: payload?.orderDays
          }
        }
      })
    );
  };

  const getClientOrdersAction = ({
    request = clientOrders,
    id = query?.id,
    page,
    size = pagination.clientOrders.size,
    ps = paymentStatus,
    handleSuccess = handleOnRenderSuccess
  }: any) => {
    handleAPIRequests({
      request,
      id,
      page,
      size,
      paymentStatus: ps,
      handleSuccess
    });
  };

  useEffect(() => {
    if (query?.id) {
      getClientOrdersAction({ id: query?.id, ps: paymentStatus });
      dispatch(displayPaginatedData({ payload: {}, onRender: true }));
      setFiltersBasedLoader(true);
      setCurrentPages(1);
    }
  }, [query?.id, paymentStatus]);

  const {
    data: client,
    isLoading: isClientLoading,
    isFetching: isClientFetching
  } = useClientQuery({ id: clientId });

  const handleLoadMoreClientOrdersSuccess = ({ payload }: any) => {
    dispatch(
      displayPaginatedData({
        payload: {
          ...payload?.orders,
          totalPending: payload?.totalPending,
          orderDays: payload?.orderDays
        },
        paginate: true
      })
    );
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreOrdersFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getClientOrdersAction({
      page: currentPages,
      handleFailure: handleLoadMoreOrdersFailure,
      handleSuccess: handleLoadMoreClientOrdersSuccess
    });
  };

  const showFiltersLoader = filtersBasedLoader && !isLoadMoreLoading;
  const showPagination =
    (AllClientOrders?.payload?.totalPages > currentPages ||
      isLoadMoreLoading) &&
    !showFiltersLoader;

  return (
    <>
      <SingleClientTop client={client?.payload} router={router} />

      <div className="mx-4 relative">
        <Content navType="FULL">
          <Row className="p-5 justify-between gap-5">
            <SingleClientLeft
              isClientLoading={isClientLoading}
              isClientFetching={isClientFetching}
              clientOrders={AllClientOrders?.payload}
              isClientOrdersLoading={isClientOrdersLoading}
              handleLoadMore={handleLoadMore}
              isLoadMoreLoading={isLoadMoreLoading}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              showPagination={showPagination}
              showFiltersLoader={showFiltersLoader}
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
