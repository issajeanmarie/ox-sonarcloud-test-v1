import { Col } from "antd";
import React, { FC } from "react";
import { SingleClientLeftTypes } from "../../../../lib/types/pageTypes/Clients/SingleClientLeftTypes";
import { ColsTableLoader } from "../../../Shared/Loaders/Loaders";
import ClientOrderHistoryTable from "../../../Tables/Clients/ClientOrderHistoryTable";
import CustomButton from "../../../../components/Shared/Button";
import Header from "./Header";

const SingleClientLeft: FC<SingleClientLeftTypes> = ({
  clientOrders,
  isClientLoading,
  handleLoadMore,
  isLoadMoreLoading,
  selectedFilter,
  setSelectedFilter,
  showPagination,
  showFiltersLoader
}) => {
  return (
    <Col
      className="h-[86vh] overflow-auto"
      xs={24}
      sm={24}
      md={13}
      lg={13}
      xl={13}
      xxl={13}
    >
      <Header
        orders={clientOrders}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        totalPending={clientOrders?.totalPending}
      />

      {isClientLoading ? (
        <div className="mt-4">
          {[...Array(20)].map((_, index) => (
            <ColsTableLoader key={index} />
          ))}
        </div>
      ) : (
        <div className="mb-10">
          <ClientOrderHistoryTable
            orders={clientOrders?.content}
            isClientOrdersFetching={showFiltersLoader}
          />
        </div>
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
      {/* <div className="flex justify-center items-center py-10">
        <div className="w-52">
          <CustomButton type="secondary">
            <span className="text-sm">Load More</span>
          </CustomButton>
        </div>
      )}

      {pageSize > 9 &&
        clientOrders?.orders?.totalElements &&
        clientOrders?.orders?.totalElements >= pageSize && (
          <div style={{ width: "12%", margin: "32px auto" }}>
            <CustomButton
              loading={isMoreClientsOrderFetching}
              onClick={handleLoadMore}
              type="secondary"
            >
              Load more
            </CustomButton>
          </div>
        )}
    </Col>
  );
};

export default SingleClientLeft;
