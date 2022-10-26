/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import AdminsTable from "../../../components/Tables/Accounts/AdminsTable";
import AdminsTopNavigator from "../../../components/Accounts/AdminsTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import { useLazyAdminsQuery } from "../../../lib/api/endpoints/Accounts/adminsEndpoints";
import { AccountsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import AllAccountsTopNavigator from "../../../components/Accounts/AllAccountsTopNavigator";
import { AccountLinks } from "../../../components/Accounts/AccountLinks";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import { TableWrapper } from "../../../components/Accounts/Wrappers";
import Content from "../../../components/Shared/Content";
import { pagination } from "../../../config/pagination";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

const Admins = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState<string>("ADMINS");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

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

  const dispatch = useDispatch();

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

  const dispatch = useDispatch();

  const toggleActiveHandler = (id: string) => {
    setActive(id);
    id === "DRIVERS" && changeRoute(`${routes.Accounts.url}?tb=DRIVERS`);
    id === "AGENTS" && changeRoute(`${routes.Agents.url}?tb=AGENTS`);
    id === "ADMINS" && changeRoute(`${routes.Admins.url}?tb=ADMINS`);
  };

  const AllAdmins = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
  );

  const [getAdmins, { isLoading, isFetching, data: apiData }] =
    useLazyAdminsQuery();

  const handleRenderSuccess = (payload: any) => {
    dispatch(displayPaginatedData({ payload, onRender: true }));
  };

  const getAdminsAction = ({
    page,
    size = pagination.admins.size,
    request = getAdmins,
    handleSuccess = handleRenderSuccess
  }: any) => {
    handleAPIRequests({
      request,
      page,
      size,
      handleSuccess
    });
  };

  useEffect(() => {
    setCurrentPages(1);
    getAdminsAction({});
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

    getAdminsAction({
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
    (AllAdmins?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
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
        <AdminsTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          Admins={apiData?.payload}
        />

        <Content isOverflowHidden={false} navType="DOUBLE">
          <TableWrapper>
            {onRenderLoader ? (
              <>
                {[...Array(20)].map((_, index) => (
                  <AccountsTableLoader key={index} />
                ))}
              </>
            ) : (
              <AdminsTable
                isModalVisible={isWarningModalVisible}
                showModal={showWarningModal}
                setIsModalVisible={setIsWarningModalVisible}
                Admins={AllAdmins}
                isAdminsFetching={onRenderLoader}
              />
            )}

            {showPagination && (
              <div style={{ width: "12%", margin: "32px auto" }}>
                <CustomButton
                  form=""
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

export default WithPrivateRoute(Admins);
