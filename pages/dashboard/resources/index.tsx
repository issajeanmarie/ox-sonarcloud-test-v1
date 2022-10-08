import React, { useState } from "react";
import Layout from "../../../components/Shared/Layout";
import ResourcesTopNavigator from "../../../components/Resources/ResourcesTopNavigator";
import {
  useResourcesQuery,
  useLazyResourcesQuery
} from "../../../lib/api/endpoints/Resources/resourcesEndpoints";
import ResourcesTable from "../../../components/Tables/Resources/ResourcesTable";
import { ResourcesTableLoader } from "../../../components/Shared/Loaders/Loaders";
import CustomButton from "../../../components/Shared/Button";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const Truck = () => {
  const [pageSize, setPageSize] = useState(2);
  const [sort, setSort]: any = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [moreResources, setMoreResources] = useState<any>([]);

  const {
    data: Allresources,
    isLoading: isResourceLoading,
    isFetching: isResourceFetching
  } = useResourcesQuery({
    page: "",
    size: pageSize,
    status: "",
    sort: sort.value || "",
    noPagination: ""
  });

  const [Resources, { isFetching: loadingMoreFetching }] =
    useLazyResourcesQuery();

  //MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  //WARNING MODAL
  const showWarningModal = () => {
    setIsWarningModalVisible(true);
  };

  const handleLoadMoreSuccess = () => {
    setPageSize(pageSize + 20);
    setMoreResources("");
  };

  // Load More
  const handleLoadMore = () => {
    handleAPIRequests({
      request: Resources,
      page: "",
      size: pageSize,
      sort: sort?.value || "",
      handleSuccess: handleLoadMoreSuccess
    });
  };

  return (
    <Layout>
      <div className="mx-4 relative">
        <ResourcesTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          resources={Allresources?.payload}
          sort={sort}
          setSort={setSort}
        />

        {isResourceLoading ? (
          <>
            {[...Array(20)].map((_, index) => (
              <ResourcesTableLoader key={index} />
            ))}
          </>
        ) : (
          <ResourcesTable
            isModalVisible={isWarningModalVisible}
            setIsModalVisible={setIsWarningModalVisible}
            showModal={showWarningModal}
            resources={
              moreResources?.length === 0
                ? Allresources?.payload?.content
                : Allresources?.payload?.content?.concat(moreResources?.content)
            }
            isResourcesFetching={isResourceFetching}
          />
        )}

        {pageSize > 1 &&
          Allresources?.payload?.totalElements &&
          Allresources?.payload?.totalElements >= pageSize && (
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

export default Truck;
