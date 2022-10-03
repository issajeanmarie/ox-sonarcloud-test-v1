/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DriversTable from "../../../components/Tables/Accounts/DriversTable";
import DriversTopNavigator from "../../../components/Accounts/DriversTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import { useLazyDriversQuery } from "../../../lib/api/endpoints/Accounts/driversEndpoints";
import { AccountsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import AllAccountsTopNavigator from "../../../components/Accounts/AllAccountsTopNavigator";
import { AccountLinks } from "../../../components/Accounts/AccountLinks";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import { TableWrapper } from "../../../components/Accounts/Wrappers";
import Content from "../../../components/Shared/Content";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../../../config/pagination";

type RequestTypes = {
  page?: number | undefined;
  size?: number | undefined;
  sort?: string | undefined;
  status?: string | undefined;
  handleSuccess?: any;
  handleFailure?: any;
  search?: string | undefined;
};

const Drivers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState<string>("DRIVERS");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter]: any = useState("ALL");
  const [sortValue, setSort]: any = useState("");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  const AllDrivers = useSelector(
    (state: any) => state.paginatedData.displayPaginatedData
  );

  const router = useRouter();
  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.isReady) {
      if (Object.keys(query).length === 0 || !query.tb) {
        changeRoute(`${routes.Accounts.url}?tb=DRIVERS`);
        setActive("DRIVERS");
      }
    }
  }, [router.isReady, query, router, query?.tb]);

  const router = useRouter();
  const { query } = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (Object.keys(query).length === 0 || !query.tb) {
        changeRoute(
          `${routes.Accounts.url}?tb=DRIVERS?depotId=${
            query.depotId || 0
          }?depotName=${query.depotName || "All depots"}`
        );
        setActive("DRIVERS");
      }
    }
  }, [router.isReady, query, router, query?.tb]);

  const toggleActiveHandler = (id: string) => {
    setActive(id);
    id === "DRIVERS" && changeRoute(`${routes.Accounts.url}?tb=DRIVERS`);
    id === "AGENTS" && changeRoute(`${routes.Agents.url}?tb=AGENTS`);
    id === "ADMINS" && changeRoute(`${routes.Admins.url}?tb=ADMINS`);
  };

  const [Drivers, { isFetching, isLoading: isDriversLoading, data: apiData }] =
    useLazyDriversQuery();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    return searchQuery;
  };

  const handleRenderSuccess = (res: any) => {
    setFiltersBasedLoader(false);
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
  };

  const getDriversAction = ({
    page,
    size = pagination.drivers.size,
    search = searchQuery,
    sort = sortValue?.value,
    status = selectedFilter?.value,
    handleSuccess = handleRenderSuccess,
    handleFailure
  }: RequestTypes) => {
    handleAPIRequests({
      request: Drivers,
      page,
      size,
      sort,
      status,
      search,
      handleSuccess,
      handleFailure
    });
  };

  const handleLoadMoreOrdersSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreOrdersFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getDriversAction({
      page: currentPages,
      handleFailure: handleLoadMoreOrdersFailure,
      handleSuccess: handleLoadMoreOrdersSuccess
    });
  };

  useEffect(() => {
    setFiltersBasedLoader(true);
    getDriversAction({});
    setCurrentPages(1);
  }, [sortValue, selectedFilter, searchQuery]);

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  //WARNING MODAL
  const showWarningModal = () => {
    setIsWarningModalVisible(true);
  };

  const showFiltersLoader = filtersBasedLoader && !isLoadMoreLoading;
  const showPagination =
    (AllDrivers?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
    !showFiltersLoader;

  return (
    <Layout>
      <AllAccountsTopNavigator
        headerLinks={AccountLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <div className="mx-4 relative">
        <DriversTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          Drivers={apiData?.payload}
          handleSearch={handleSearch}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedSort={sortValue}
          setSelectedSort={setSort}
        />

        <Content isOverflowHidden={false} navType="DOUBLE">
          <TableWrapper>
            {showFiltersLoader || isDriversLoading ? (
              <>
                {[...Array(20)].map((_, index) => (
                  <AccountsTableLoader key={index} />
                ))}
              </>
            ) : (
              <DriversTable
                isModalVisible={isWarningModalVisible}
                showModal={showWarningModal}
                setIsModalVisible={setIsWarningModalVisible}
                Drivers={AllDrivers}
                isDriversFetching={isFetching}
              />
            )}

            {showPagination && (
              <div style={{ width: "12%", margin: "32px auto" }}>
                <CustomButton
                  loading={isLoadMoreLoading}
                  onClick={handleLoadMore}
                  type="secondary"
                >
                  Load more
                </CustomButton>
              </div>
            )}
          </TableWrapper>
        </Content>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Drivers);
