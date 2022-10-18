/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import ResourcesTopNavigator from "../../../components/Resources/ResourcesTopNavigator";
import { useLazyResourcesQuery } from "../../../lib/api/endpoints/Resources/resourcesEndpoints";
import ResourcesTable from "../../../components/Tables/Resources/ResourcesTable";
import { ResourcesTableLoader } from "../../../components/Shared/Loaders/Loaders";
import CustomButton from "../../../components/Shared/Button";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import Content from "../../../components/Shared/Content";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { pagination } from "../../../config/pagination";

const Truck = () => {
  const [selectedSort, setSelectedSort]: any = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);

  const dispatch = useDispatch();

  const [getResources, { data: apiData }] = useLazyResourcesQuery();

  const AllResources = useSelector(
    (state: { paginatedData: any }) => state.paginatedData.displayPaginatedData
  );

  const handleLoadMoreResourcesSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreResourcesFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const handleRenderSuccess = (res: any) => {
    setFiltersBasedLoader(false);
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
  };

  const getResourcesAction = ({
    page,
    size = pagination.resources.size,
    status = "",
    sort = selectedSort.value || "",
    handleSuccess = handleRenderSuccess,
    request = getResources
  }: any) => {
    handleAPIRequests({
      request,
      page,
      size,
      status,
      sort,
      handleSuccess
    });
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getResourcesAction({
      page: currentPages,
      handleFailure: handleLoadMoreResourcesFailure,
      handleSuccess: handleLoadMoreResourcesSuccess
    });
  };

  useEffect(() => {
    getResourcesAction({});
    setFiltersBasedLoader(true);
    getResourcesAction({});
    setCurrentPages(1);
  }, [selectedSort]);

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
    (AllResources?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
    !showFiltersLoader;

  return (
    <Layout>
      <div className="mx-4 relative">
        <ResourcesTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          resources={apiData?.payload}
          sort={selectedSort}
          setSort={setSelectedSort}
        />

        <Content navType="CENTER">
          <>
            {showFiltersLoader ? (
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
                resources={AllResources}
                isResourcesFetching={showFiltersLoader}
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
          </>
        </Content>
      </div>
    </Layout>
  );
};

export default Truck;
