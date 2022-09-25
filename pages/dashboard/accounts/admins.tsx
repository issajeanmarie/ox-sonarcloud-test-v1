/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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

const Admins = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState<string>("AdminS");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [moreAdmins, setMoreAdmins] = useState<any>([]);

  const toggleActiveHandler = (id: string) => {
    setActive(id);
    id === "DRIVERS" && changeRoute(routes.Accounts.url);
    id === "AGENTS" && changeRoute(routes.Agents.url);
    id === "ADMINS" && changeRoute(routes.Admins.url);
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
      <div className="p-5 sticky top-0 right-0 left-0 z-30 bg-[#f8f8f8]">
        <AdminsTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          Admins={AllAdmins?.payload}
          isAdminsLoading={isAdminsLoading}
        />
      </div>
      <div className="px-5">
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
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Admins);
