import { Col } from "antd";
import React, { FC } from "react";
import { SingleClientLeftTypes } from "../../../../lib/types/pageTypes/Clients/SingleClientLeftTypes";
import { ColsTableLoader } from "../../../Shared/Loaders/Loaders";
import ClientOrderHistoryTable from "../../../Tables/Clients/ClientOrderHistoryTable";
// import CustomButton from "../../../../components/Shared/Button";
import Header from "./Header";

const SingleClientLeft: FC<SingleClientLeftTypes> = ({
  clientOrders,
  isClientLoading,
  isClientOrdersFetching,
  handleFilterChange
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
        handleFilterChange={handleFilterChange}
        totalPending={clientOrders?.totalPending}
      />
      {isClientLoading ? (
        <div className="mt-4">
          {[...Array(20)].map((_, index) => (
            <ColsTableLoader key={index} />
          ))}
        </div>
      ) : (
        <ClientOrderHistoryTable
          orders={clientOrders?.orders?.content}
          isClientOrdersFetching={isClientOrdersFetching}
        />
      )}
      {/* <div className="flex justify-center items-center py-10">
        <div className="w-52">
          <CustomButton type="secondary">
            <span className="text-sm">Load More</span>
          </CustomButton>
        </div>
      </div> */}
    </Col>
  );
};

export default SingleClientLeft;
