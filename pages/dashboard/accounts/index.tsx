/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import DriversTable from "../../../components/Tables/Drivers/DriversTable";
import DriversTopNavigator from "../../../components/Accounts/DriversTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import {
  useDriversQuery,
  useLazyDriversQuery
} from "../../../lib/api/endpoints/Accounts/driversEndpoints";
import { ColsTableLoader } from "../../../components/Shared/Loaders/Loaders";

const Drivers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter]: any = useState("ALL");
  const [sort, setSort]: any = useState("");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [moreDrivers, setMoreDrivers] = useState<any>([]);

  const {
    data: AllDrivers,
    isLoading: isDriversLoading,
    isFetching: isDriversFetching
  } = useDriversQuery({
    page: "",
    size: pageSize,
    sort: sort,
    status: selectedFilter
  });

  const [Drivers, { isFetching: loadingMoreFetching }] = useLazyDriversQuery();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    return searchQuery;
  };

  const onFilterChange = (status: string) => {
    setSelectedFilter(status);
  };
  const onSortChange = (sorter: string) => {
    setSort(sorter);
  };

  const handleLoadMore = () => {
    Drivers({
      page: "",
      size: pageSize,
      sort: sort,
      status: selectedFilter
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
      <div className="p-5 sticky top-0 right-0 left-0 z-30 bg-[#f8f8f8]">
        <DriversTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          Drivers={AllDrivers?.payload}
          isDriversLoading={isDriversLoading}
          handleSearch={handleSearch}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
        />
      </div>
      <div className="px-5">
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
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Drivers);
