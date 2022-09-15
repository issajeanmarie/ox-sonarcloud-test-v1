/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ClientsTable from "../../../components/Tables/Clients/ClientsTable";
import ClientsTopNavigator from "../../../components/Clients/ClientsTopNavigator";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
// import CustomButton from "../../../components/Shared/Button";
import {
  useClientsQuery,
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
      .then((file: any) =>
        handleDownloadFile({ file, name: "Clients-Report", fileFormat: "PDF" })
      )
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
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
          clients={clients?.payload}
          isClientsLoading={isClientsLoading}
          handleSearch={handleSearch}
          isCategoriesLoading={isCategoriesLoading}
          categories={categories?.payload}
          onCategoryChange={onCategoryChange}
          onSortChange={onSortChange}
          handleDownloadClients={handleDownloadClients}
          isDownloadingClientsLoading={isDownloadingClientsLoading}
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
            clients={clients?.payload}
            isClientsFetching={isClientsFetching}
          />
        )}

        {/* <div className="flex justify-center items-center py-10">
          <div className="w-52">
            <CustomButton type="secondary">
              <span className="text-sm">Load More</span>
            </CustomButton>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Clients);
