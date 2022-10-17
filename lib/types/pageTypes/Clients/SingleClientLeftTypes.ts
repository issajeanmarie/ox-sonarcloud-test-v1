/* eslint-disable @typescript-eslint/no-explicit-any */
export type SingleClientLeftTypes = {
  isClientLoading: boolean;
  isClientFetching: boolean;
  clientOrders: any;
  isClientOrdersLoading: boolean;
  showFiltersLoader: boolean;
  handleLoadMore: () => void;
  isLoadMoreLoading: boolean;
  setSelectedFilter: any;
  selectedFilter: any;
  showPagination: boolean;
};
