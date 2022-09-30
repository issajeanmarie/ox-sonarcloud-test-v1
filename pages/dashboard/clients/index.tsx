/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ClientsTable from "../../../components/Tables/Clients/ClientsTable";
import ClientsTopNavigator from "../../../components/Clients/ClientsTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import CustomButton from "../../../components/Shared/Button";
import {
  useClientsQuery,
  useLazyClientsQuery,
  useLazyDownloadClientsQuery
} from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import { useCategoriesQuery } from "../../../lib/api/endpoints/Category/categoryEndpoints";
import { BackendErrorTypes } from "../../../lib/types/shared";
import { ErrorMessage } from "../../../components/Shared/Messages/ErrorMessage";
import { ColsTableLoader } from "../../../components/Shared/Loaders/Loaders";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";

const Clients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory]: any = useState("");
  const [sort, setSort]: any = useState("");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [moreClients, setMoreClients] = useState<any>([]);

  const {
    data: Allclients,
    isLoading: isClientsLoading,
    isFetching: isClientsFetching
  } = useClientsQuery({
    page: "",
    size: pageSize,
    org: "",
    dest: "",
    hq: "",
    categoryId: selectedCategory?.id || "",
    q: searchQuery,
    sort: sort.value || "",
    source: ""
  });

  const [clients, { isFetching: loadingMoreFetching }] = useLazyClientsQuery();

  const [downloadClients, { isLoading: isDownloadingClientsLoading }] =
    useLazyDownloadClientsQuery();

  const { data: categories } = useCategoriesQuery();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleDownloadClients = () => {
    downloadClients({
      file_type: "PDF",
      org: "",
      dest: "",
      hq: "",
      categoryId: selectedCategory?.id || "",
      q: searchQuery,
      sort: sort.value || "",
      source: ""
    })
      .unwrap()
      .then((file: any) =>
        handleDownloadFile({ file, name: "Clients-Report", fileFormat: "PDF" })
      )
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const handleLoadMore = () => {
    clients({
      page: "",
      size: pageSize,
      org: "",
      dest: "",
      hq: "",
      categoryId: selectedCategory?.id || "",
      q: searchQuery,
      sort: sort.id || "",
      source: ""
    })
      .unwrap()
      .then((res) => {
        setPageSize(pageSize + 20);
        setMoreClients(res?.payload);
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
        <ClientsTopNavigator
          isModalVisible={isModalVisible}
          showModal={showModal}
          setIsModalVisible={setIsModalVisible}
          clients={Allclients?.payload}
          isClientsLoading={isClientsLoading}
          handleSearch={handleSearch}
          categories={categories?.payload}
          handleDownloadClients={handleDownloadClients}
          isDownloadingClientsLoading={isDownloadingClientsLoading}
          defaultSelected={selectedCategory}
          setDefaultSelected={setSelectedCategory}
          sort={sort}
          setSort={setSort}
        />
      </div>

      <div className="px-5">
        {isClientsLoading ? (
          <>
            {[...Array(20)].map((_, index) => (
              <ColsTableLoader key={index} />
            ))}
          </>
        ) : (
          <ClientsTable
            isModalVisible={isWarningModalVisible}
            showModal={showWarningModal}
            setIsModalVisible={setIsWarningModalVisible}
            clients={
              moreClients?.length === 0
                ? Allclients?.payload?.content
                : Allclients?.payload?.content?.concat(moreClients?.content)
            }
            isClientsFetching={isClientsFetching}
          />
        )}

        {pageSize > 19 &&
          Allclients?.payload?.totalElements &&
          Allclients?.payload?.totalElements >= pageSize && (
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

export default WithPrivateRoute(Clients);
