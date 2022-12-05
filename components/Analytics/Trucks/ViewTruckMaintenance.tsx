import { FC, useState } from "react";
import Header from "./Header";
import Loader from "../../Shared/Loader";
import { Query } from "../../../lib/types/shared";
import ViewTruckMaintenanceHeader from "./ViewTruckMaintenanceHeader";
import Content from "../../Shared/Content";
import TruckMaintenanceList from "./TruckMaintenanceList";

interface ViewTruckProps {
  truckId: Query;
  isLoading: boolean;
  maintenanceData: any;
  isPageLoading: boolean;
  onStartDateChange: (_: string, date: string) => void;
  onEndDateChange: (_: string, date: string) => void;
}

const ViewTruckMaintenance: FC<ViewTruckProps> = ({
  truckId,
  maintenanceData,
  isLoading,
  isPageLoading,
  onStartDateChange,
  onEndDateChange
}) => {
  useState(false);
  const [, setIsAddInspectionModalVisible] = useState(false);

  return (
    <div className="overflow-hidden">
      {isPageLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            truckId={truckId}
            truckData={maintenanceData}
            isPageLoading={isPageLoading}
            setIsVisible={setIsAddInspectionModalVisible}
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
              />

              {isLoading ? (
                <Loader />
              ) : (
                <TruckMaintenanceList maintenanceData={maintenanceData} />
              )}
            </>
          </Content>
        </>
      )}
    </div>
  );
};

export default ViewTruckMaintenance;
