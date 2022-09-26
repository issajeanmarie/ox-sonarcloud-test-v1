/* eslint-disable @typescript-eslint/no-explicit-any */
export type SingleClientLeftTypes = {
  client: any;
  isClientLoading: boolean;
  isClientFetching: boolean;
  clientOrders: any;
  isClientOrdersLoading: boolean;
  isClientOrdersFetching: boolean;
  moreClientOrders: any;
  handleLoadMore: () => void;
  pageSize: number;
  isMoreClientsOrderFetching: boolean;
  setSelectedFilter: any;
  selectedFilter: any;
};
