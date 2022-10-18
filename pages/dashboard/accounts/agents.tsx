/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import AgentsTable from "../../../components/Tables/Accounts/AgentsTable";
import AgentsTopNavigator from "../../../components/Accounts/AgentsTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import { useLazyAgentsQuery } from "../../../lib/api/endpoints/Accounts/agentsEndpoints";
import { AccountsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import AllAccountsTopNavigator from "../../../components/Accounts/AllAccountsTopNavigator";
import { AccountLinks } from "../../../components/Accounts/AccountLinks";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import { TableWrapper } from "../../../components/Accounts/Wrappers";
import Content from "../../../components/Shared/Content";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { pagination } from "../../../config/pagination";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

const Agents = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState<string>("AGENTS");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

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

  const toggleActiveHandler = (id: string) => {
    setActive(id);
    id === "DRIVERS" && changeRoute(`${routes.Accounts.url}?tb=DRIVERS`);
    id === "AGENTS" && changeRoute(`${routes.Agents.url}?tb=AGENTS`);
    id === "ADMINS" && changeRoute(`${routes.Admins.url}?tb=ADMINS`);
  };

  const [getAgents, { isFetching, isLoading, data: apiData }] =
    useLazyAgentsQuery();
  const AllAgents = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
  );

  const handleRenderSuccess = (payload: any) => {
    dispatch(displayPaginatedData({ payload, onRender: true }));
  };

  const getAgentsAction = ({
    request = getAgents,
    page,
    size = pagination.agents.size,
    handleSuccess = handleRenderSuccess
  }: any) => {
    handleAPIRequests({
      request,
      size,
      page,
      handleSuccess
    });
  };

  useEffect(() => {
    setCurrentPages(1);
    getAgentsAction({});
  }, []);

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

    getAgentsAction({
      page: currentPages,
      handleFailure: handleLoadMoreOrdersFailure,
      handleSuccess: handleLoadMoreOrdersSuccess
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showWarningModal = () => {
    setIsWarningModalVisible(true);
  };

  const onRenderLoader = isLoading && !isLoadMoreLoading;
  const showPagination =
    (AllAgents?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
    !(isFetching && !isLoadMoreLoading);

  return (
    <Layout>
      <AllAccountsTopNavigator
        headerLinks={AccountLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />

      <div className="mx-4 relative">
        <AgentsTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          Agents={apiData?.payload}
        />

        <Content navType="DOUBLE">
          <TableWrapper>
            {onRenderLoader ? (
              <>
                {[...Array(20)].map((_, index) => (
                  <AccountsTableLoader key={index} />
                ))}
              </>
            ) : (
              <AgentsTable
                isModalVisible={isWarningModalVisible}
                showModal={showWarningModal}
                setIsModalVisible={setIsWarningModalVisible}
                Agents={AllAgents}
                isAgentsFetching={onRenderLoader}
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

export default WithPrivateRoute(Agents);
