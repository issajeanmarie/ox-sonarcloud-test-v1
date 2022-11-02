import React, { FC } from "react";
import { BatchesModalTypes } from "../../lib/types/warehouse";
import { StockTableLoader } from "../Shared/Loaders/Loaders";
import StockHistoryTable from "../Tables/Warehouse/StockHistoryTable";
import StockHistory from "../Warehouse/Stock/StockHistory";
import ModalWrapper from "./ModalWrapper";

const BatchesModal: FC<BatchesModalTypes> = ({
  isVisible,
  setIsVisible,
  categoryInfo,
  batches,
  isLoading,
  setStartDate,
  setEndDate,
  filter,
  setFilter
}) => {
  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };
  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <ModalWrapper
      width={1000}
      title={`"${categoryInfo?.categoryName}" BATCHES`}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={false}
      onCancel={handleCancel}
    >
      {isLoading ? (
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
            isStocksFetching={false}
            isStockCategoriesFetching={false}
          />
        </>
      )}
    </ModalWrapper>
  );
};

export default BatchesModal;
