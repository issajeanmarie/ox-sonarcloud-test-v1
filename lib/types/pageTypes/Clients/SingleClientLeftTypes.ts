/* eslint-disable @typescript-eslint/no-explicit-any */
export type SingleClientLeftTypes = {
  client: any;
  isClientLoading: boolean;
  isClientFetching: boolean;
  clientOrders: any;
  isClientOrdersLoading: boolean;
  isClientOrdersFetching: boolean;
  handleFilterChange: (value: string) => void;
  moreClientOrders: any;
  handleLoadMore: () => void;
  pageSize: number;
  isMoreClientsOrderFetching: boolean;
};
