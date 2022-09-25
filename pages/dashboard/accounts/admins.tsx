/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import AdminsTable from "../../../components/Tables/Accounts/AdminsTable";
import AdminsTopNavigator from "../../../components/Accounts/AdminsTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import {
  useAdminsQuery,
  useLazyAdminsQuery
} from "../../../lib/api/endpoints/Accounts/adminsEndpoints";
import { ColsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import AllAccountsTopNavigator from "../../../components/Accounts/AllAccountsTopNavigator";
import { AccountLinks } from "../../../components/Accounts/AccountLinks";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import {
  AccountsMenusNavigatorWrapper,
  TableWrapper
} from "../../../components/Accounts/Wrappers";

const Admins = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState<string>("ADMINS");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [moreAdmins, setMoreAdmins] = useState<any>([]);

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
    data: AllAdmins,
    isLoading: isAdminsLoading,
    isFetching: isAdminsFetching
  } = useAdminsQuery({
    page: "",
    size: pageSize
  });

  const [Admins, { isFetching: loadingMoreFetching }] = useLazyAdminsQuery();

  const handleLoadMore = () => {
    Admins({
      page: "",
      size: pageSize
    })
      .unwrap()
      .then((res) => {
        setPageSize(pageSize + 20);
        setMoreAdmins(res?.payload);
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
      <AccountsMenusNavigatorWrapper>
        <AdminsTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          Admins={AllAdmins?.payload}
          isAdminsLoading={isAdminsLoading}
        />
      </AccountsMenusNavigatorWrapper>

      <TableWrapper>
        {isAdminsLoading ? (
          <>
            {[...Array(20)].map((_, index) => (
              <ColsTableLoader key={index} />
            ))}
          </>
        ) : (
          <AdminsTable
            isModalVisible={isWarningModalVisible}
            showModal={showWarningModal}
            setIsModalVisible={setIsWarningModalVisible}
            Admins={
              moreAdmins?.length === 0
                ? AllAdmins?.payload?.content
                : AllAdmins?.payload?.content?.concat(moreAdmins?.content)
            }
            isAdminsFetching={isAdminsFetching}
          />
        )}

        {pageSize > 19 &&
          AllAdmins?.payload?.totalElements &&
          AllAdmins?.payload?.totalElements >= pageSize && (
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
    </Layout>
  );
};

export default WithPrivateRoute(Admins);
