/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import AgentsTable from "../../../components/Tables/Accounts/AgentsTable";
import AgentsTopNavigator from "../../../components/Accounts/AgentsTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import {
  useAgentsQuery,
  useLazyAgentsQuery
} from "../../../lib/api/endpoints/Accounts/agentsEndpoints";
import { ColsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import AllAccountsTopNavigator from "../../../components/Accounts/AllAccountsTopNavigator";
import { AccountLinks } from "../../../components/Accounts/AccountLinks";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import { TableWrapper } from "../../../components/Accounts/Wrappers";
import Content from "../../../components/Shared/Content";

const Agents = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState<string>("AGENTS");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [moreAgents, setMoreAgents] = useState<any>([]);

  const router = useRouter();
  const { query } = useRouter();

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

  const {
    data: AllAgents,
    isLoading: isAgentsLoading,
    isFetching: isAgentsFetching
  } = useAgentsQuery({
    page: "",
    size: pageSize
  });

  const [Agents, { isFetching: loadingMoreFetching }] = useLazyAgentsQuery();

  const handleLoadMore = () => {
    Agents({
      page: "",
      size: pageSize
    })
      .unwrap()
      .then((res) => {
        setPageSize(pageSize + 20);
        setMoreAgents(res?.payload);
      })
      .catch((error) => {
        return error;
      });
  };

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  //WARNING MODAL
  const showWarningModal = () => {
    setIsWarningModalVisible(true);
  };

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
          Agents={AllAgents?.payload}
        />

        <Content navType="DOUBLE">
          <TableWrapper>
            {isAgentsLoading ? (
              <>
                {[...Array(20)].map((_, index) => (
                  <ColsTableLoader key={index} />
                ))}
              </>
            ) : (
              <AgentsTable
                isModalVisible={isWarningModalVisible}
                showModal={showWarningModal}
                setIsModalVisible={setIsWarningModalVisible}
                Agents={
                  moreAgents?.length === 0
                    ? AllAgents?.payload?.content
                    : AllAgents?.payload?.content?.concat(moreAgents?.content)
                }
                isAgentsFetching={isAgentsFetching}
              />
            )}

            {pageSize > 19 &&
              AllAgents?.payload?.totalElements &&
              AllAgents?.payload?.totalElements >= pageSize && (
                <div style={{ width: "12%", margin: "32px auto" }}>
                  <CustomButton
                    loading={loadingMoreFetching}
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
