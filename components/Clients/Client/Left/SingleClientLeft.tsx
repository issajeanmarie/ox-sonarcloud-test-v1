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
  isClientOrdersFetching,
  handleLoadMore,
  pageSize,
  isMoreClientsOrderFetching,
  moreClientOrders,
  selectedFilter,
  setSelectedFilter
}) => {
  return (
    <Col
      className="h-[86vh] overflow-auto"
      xs={24}
      sm={24}
      md={12}
      lg={12}
      xl={12}
      xxl={12}
    >
      <Header
        orders={clientOrders?.orders}
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
            orders={
              moreClientOrders?.length === 0
                ? clientOrders?.orders?.content
                : clientOrders?.orders?.content?.concat(
                    moreClientOrders?.orders?.content
                  )
            }
            isClientOrdersFetching={isClientOrdersFetching}
          />
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
