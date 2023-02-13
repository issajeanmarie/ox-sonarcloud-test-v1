import React, { FC, useState } from "react";
import Header from "./Header";
import Loader from "../../Shared/Loader";
import { Query } from "../../../lib/types/shared";
import ViewTruckMaintenanceHeader from "./ViewTruckMaintenanceHeader";
import Content from "../../Shared/Content";
import TruckMaintenanceList from "./TruckMaintenanceList";
import NewTruckInspectionModal from "../../Modals/NewTruckInspectionModal";
import CustomButton from "../../Shared/Button";

interface ViewTruckProps {
  truckId: Query;
  isLoading: boolean;
  maintenanceData: any;
  isPageLoading: boolean;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
  isAddInspectionModalVisible: boolean;
  setIsAddInspectionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: string;
  endDate: string;
  showPagination: boolean;
  handleLoadMore: () => void;
  isLoadMoreLoading: boolean;
  getTruckMaintenanceAction: ({ page }: { page: number }) => void;
}

const ViewTruckMaintenance: FC<ViewTruckProps> = ({
  truckId,
  maintenanceData,
  isLoading,
  isPageLoading,
  onStartDateChange,
  onEndDateChange,
  startDate,
  endDate,
  isAddInspectionModalVisible,
  setIsAddInspectionModalVisible,
  showPagination,
  handleLoadMore,
  isLoadMoreLoading,
  getTruckMaintenanceAction
}) => {
  const [currentTruckData, setCurrentTruckData] = useState();

  return (
    <div className="overflow-hidden">
      {isPageLoading ? (
        <Loader />
      ) : (
        <>
          <NewTruckInspectionModal
            isVisible={isAddInspectionModalVisible}
            setIsVisible={setIsAddInspectionModalVisible}
            truckId={truckId}
            currentTruckData={currentTruckData}
            getTruckMaintenanceAction={getTruckMaintenanceAction}
          />

          <Header
            truckId={truckId}
            truckData={maintenanceData}
            isPageLoading={isPageLoading}
            setIsVisible={setIsAddInspectionModalVisible}
            setCurrentTruckData={setCurrentTruckData}
          />

          <Content
            isOverflowHidden={false}
            navType="FULL"
            className="m-4 relative"
          >
            <>
              <ViewTruckMaintenanceHeader
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
                maintenanceData={maintenanceData}
                startDate={startDate}
                endDate={endDate}
                truckId={truckId}
              />

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <TruckMaintenanceList maintenanceData={maintenanceData} />
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
              )}
            </>
          </Content>
        </>
      )}
    </div>
  );
};

export default ViewTruckMaintenance;
