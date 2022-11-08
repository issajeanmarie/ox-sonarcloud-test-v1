import React, { FC, useState } from "react";
import { BatchesModalTypes } from "../../lib/types/warehouse";
import CustomButton from "../Shared/Button";
import { StockTableLoader } from "../Shared/Loaders/Loaders";
import StockHistoryTable from "../Tables/Warehouse/StockHistoryTable";
import StockHistory from "../Warehouse/Stock/StockHistory";
import ModalWrapper from "./ModalWrapper";

const BatchesModal: FC<BatchesModalTypes> = ({
  isVisible,
  setIsVisible,
  categoryInfo,
  batches,
  setStartDate,
  setEndDate,
  filter,
  setFilter,
  setBatches,
  getBatchesAction,
  filtersBasedLoader,
  currentPages,
  setCurrentPages
}) => {
  const [isLoadMoreBatchesLoading, setIsLoadMoreBatchesLoading] =
    useState(false);

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };
  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleLoadMoreStocksSuccess = (res: any) => {
    setBatches({
      ...batches,
      payload: {
        ...batches.payload,
        content: [...batches.payload.content, ...res.payload.content]
      }
    });
    setIsLoadMoreBatchesLoading(false);
  };

  const handleLoadMoreStocksFailure = () => {
    setIsLoadMoreBatchesLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPages(currentPages + 1);
    setIsLoadMoreBatchesLoading(true);

    getBatchesAction({
      page: currentPages,
      handleFailure: handleLoadMoreStocksFailure,
      handleSuccess: handleLoadMoreStocksSuccess
    });
  };

  const showFiltersLoader = filtersBasedLoader && !isLoadMoreBatchesLoading;
  const showPagination =
    (batches?.payload?.totalPages > currentPages || isLoadMoreBatchesLoading) &&
    !showFiltersLoader;

  return (
    <ModalWrapper
      width={1200}
      title={`"${categoryInfo?.categoryName}" BATCHES`}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={false}
      onCancel={handleCancel}
    >
      {showFiltersLoader ? (
        <div className="mt-4">
          {[...Array(20)].map((_, index) => (
            <StockTableLoader key={index} />
          ))}
        </div>
      ) : (
        <>
          <StockHistory
            filter={filter}
            setFilter={setFilter}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
          />

          <StockHistoryTable
            Stocks={batches}
            setBatches={setBatches}
            isStocksFetching={false}
            isStockCategoriesFetching={false}
          />

          {showPagination && (
            <div style={{ width: "12%", margin: "32px auto" }}>
              <CustomButton
                loading={isLoadMoreBatchesLoading}
                onClick={handleLoadMore}
                type="secondary"
              >
                Load more
              </CustomButton>
            </div>
          )}
        </>
      )}
    </ModalWrapper>
  );
};

export default BatchesModal;
