/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DriversTable from "../../../components/Tables/Accounts/DriversTable";
import DriversTopNavigator from "../../../components/Accounts/DriversTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import {
  useDriversQuery,
  useLazyDriversQuery
} from "../../../lib/api/endpoints/Accounts/driversEndpoints";
import { ColsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import AllAccountsTopNavigator from "../../../components/Accounts/AllAccountsTopNavigator";
import { AccountLinks } from "../../../components/Accounts/AccountLinks";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import { TableWrapper } from "../../../components/Accounts/Wrappers";
import Content from "../../../components/Shared/Content";

const Drivers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState<string>("DRIVERS");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter]: any = useState("ALL");
  const [sort, setSort]: any = useState("");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [moreDrivers, setMoreDrivers] = useState<any>([]);

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
  const {
    data: AllDrivers,
    isLoading: isDriversLoading,
    isFetching: isDriversFetching
  } = useDriversQuery({
    page: "",
    size: pageSize,
    sort: sort?.value || "",
    status: selectedFilter.value || ""
  });

  const [Drivers, { isFetching: loadingMoreFetching }] = useLazyDriversQuery();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    return searchQuery;
  };

  const handleLoadMore = () => {
    Drivers({
      page: "",
      size: pageSize,
      sort: sort?.value || "",
      status: selectedFilter?.value || ""
    })
      .unwrap()
      .then((res) => {
        setPageSize(pageSize + 20);
        setMoreDrivers(res?.payload);
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
        <DriversTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          Drivers={AllDrivers?.payload}
          handleSearch={handleSearch}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedSort={sort}
          setSelectedSort={setSort}
        />

        <Content navType="MULTIPLE">
          <TableWrapper>
            {isDriversLoading ? (
              <>
                {[...Array(20)].map((_, index) => (
                  <ColsTableLoader key={index} />
                ))}
              </>
            ) : (
              <DriversTable
                isModalVisible={isWarningModalVisible}
                showModal={showWarningModal}
                setIsModalVisible={setIsWarningModalVisible}
                Drivers={
                  moreDrivers?.length === 0
                    ? AllDrivers?.payload?.content
                    : AllDrivers?.payload?.content?.concat(moreDrivers?.content)
                }
                isDriversFetching={isDriversFetching}
              />
            )}

            {pageSize > 19 &&
              AllDrivers?.payload?.totalElements &&
              AllDrivers?.payload?.totalElements >= pageSize && (
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

export default WithPrivateRoute(Drivers);
