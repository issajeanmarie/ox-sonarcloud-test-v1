/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import ClientsTable from "../../../components/Tables/Clients/ClientsTable";
import ClientsTopNavigator from "../../../components/Clients/ClientsTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import {
  useLazyClientsQuery,
  useLazyDownloadClientsQuery
} from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import { useCategoriesQuery } from "../../../lib/api/endpoints/Category/categoryEndpoints";
import { ClientsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import Content from "../../../components/Shared/Content";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { pagination } from "../../../config/pagination";
import { useDispatch, useSelector } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

const Clients = () => {
  const [currentPages, setCurrentPages] = useState(1);
  const [filtersBasedLoader, setFiltersBasedLoader] = useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory]: any = useState("");
  const [sortValue, setSort]: any = useState("");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const {
    data: clients,
    isLoading: isClientsLoading,
    isFetching: isClientsFetching
  } = useClientsQuery({
    page: "",
    size: "",
    org: "",
    dest: "",
    hq: "",
    categoryId: selectedCategory,
    q: searchQuery,
    sort: sort,
    source: ""
  });

  const [downloadClients, { isLoading: isDownloadingClientsLoading }] =
    useLazyDownloadClientsQuery();

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const onCategoryChange = (categoryID: number) => {
    setSelectedCategory(categoryID);
  };
  const onSortChange = (sorter: string) => {
    setSort(sorter);
  };
  const handleDownloadClients = () => {
    downloadClients({
      file_type: "PDF",
      org: "",
      dest: "",
      hq: "",
      categoryId: selectedCategory,
      q: searchQuery,
      sort: sort,
      source: ""
    })
      .unwrap()
      .then()
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const [getClients, { isLoading: isClientsLoading }] = useLazyClientsQuery();

  const clientsState = useSelector(
    (state: any) => state.paginatedData.displayPaginatedData
  );

  const [downloadClients, { isLoading: isDownloadingClientsLoading }] =
    useLazyDownloadClientsQuery();

  const { data: categories } = useCategoriesQuery();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPages(1);
  };

  const handleDownloadClientsSuccess = (file: File) => {
    handleDownloadFile({ file, name: "Clients-Report", fileFormat: "PDF" });
  };

  const dispatch = useDispatch();

  const handleDownloadClients = () => {
    handleAPIRequests({
      request: downloadClients,
      file_type: "PDF",
      org: "",
      dest: "",
      hq: "",
      categoryId: selectedCategory?.id || "",
      q: searchQuery,
      sort: sortValue.value || "",
      source: "",
      showSuccess: true,
      handleSuccess: handleDownloadClientsSuccess
    });
  };

  const handleRenderSuccess = (res: any) => {
    setFiltersBasedLoader(false);
    dispatch(displayPaginatedData({ payload: res, onRender: true }));
  };

  const handleLoadMoreOrdersSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload, paginate: true }));
    setIsLoadMoreLoading(false);
  };

  const handleLoadMoreOrdersFailure = () => {
    setIsLoadMoreLoading(false);
  };

  const getClientsAction = ({
    page,
    size = pagination.clients.size,
    org = "",
    dest = "",
    hq = "",
    categoryId = selectedCategory?.id || "",
    q = searchQuery,
    sort = sortValue.value || "",
    source = "",
    handleSuccess = handleRenderSuccess,
    handleFailure,
    request = getClients
  }: any) => {
    handleAPIRequests({
      request,
      page,
      size,
      org,
      dest,
      hq,
      categoryId,
      q,
      sort,
      source,
      handleSuccess,
      handleFailure
    });
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreLoading(true);

    getClientsAction({
      page: currentPages,
      handleFailure: handleLoadMoreOrdersFailure,
      handleSuccess: handleLoadMoreOrdersSuccess
    });
  };

  useEffect(() => {
    setFiltersBasedLoader(true);
    getClientsAction({});
  }, [sortValue, searchQuery, selectedCategory]);

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
    (clientsState?.payload?.totalPages > currentPages || isLoadMoreLoading) &&
    !showFiltersLoader;

  return (
    <Layout>
      <div className="mx-4 relative">
        <ClientsTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          clients={clientsState?.payload}
          handleSearch={handleSearch}
          categories={categories?.payload}
          handleDownloadClients={handleDownloadClients}
          isDownloadingClientsLoading={isDownloadingClientsLoading}
          defaultSelected={selectedCategory}
          setDefaultSelected={setSelectedCategory}
          sort={sortValue}
          setSort={setSort}
          setCurrentPages={setCurrentPages}
        />

        <Content isOverflowHidden={false} navType="CENTER">
          <>
            {isClientsLoading || showFiltersLoader ? (
              <>
                {[...Array(20)].map((_, index) => (
                  <ClientsTableLoader key={index} />
                ))}
              </>
            ) : (
              <ClientsTable
                isModalVisible={isWarningModalVisible}
                showModal={showWarningModal}
                setIsModalVisible={setIsWarningModalVisible}
                clients={clientsState}
                isClientsFetching={false}
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

export default WithPrivateRoute(Clients);
