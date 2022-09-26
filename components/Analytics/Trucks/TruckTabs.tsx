import React from "react";
import Tabs from "antd/lib/tabs";
import OvervieWPane from "./OverViewPane";
import TruckHelthPane from "./TruckHealthPane";
import RepairLogPane from "./RepairLogPane";
import TruckIssuesPane from "./TruckIssuesPane";
import FuelRecordsPane from "./FuelRecordsPane";

const { TabPane } = Tabs;

const TruckTabs = () => (
  <div className="h-[85vh] rounded bg-white p-12 pt-6 ">
    <Tabs defaultActiveKey="0" className="truck_tabs">
      <TabPane
        tab={<span className="text-lg text-ox-dark">OVERVIEW</span>}
        key={0}
      >
        <div className="h-[78vh] overflow-x-hidden overflow-auto py-6">
          <OvervieWPane />
        </div>
      </TabPane>

      <TabPane
        tab={<span className="text-lg ld text-ox-dark">TRUCK HEALTH</span>}
        key={1}
      >
        <div className="h-[78vh] overflow-x-hidden overflow-auto py-6">
          <TruckHelthPane />
        </div>
      </TabPane>

      <TabPane
        tab={<span className="text-lg ld text-ox-dark">REPAIR LOG</span>}
        key={2}
      >
        <div className="h-[78vh] overflow-x-hidden overflow-auto py-6">
          <RepairLogPane />
        </div>
      </TabPane>

      <TabPane
        tab={<span className="text-lg ld text-ox-dark">TRUCK ISSUES</span>}
        key={3}
      >
        <div className="h-[78vh] overflow-x-hidden overflow-auto py-6">
          <TruckIssuesPane />
        </div>
      </TabPane>

      <TabPane
        tab={<span className="text-lg ld text-ox-dark">FUEL RECORDS</span>}
        key={4}
      >
        <div className="h-[78vh] overflow-auto py-6">
          <FuelRecordsPane />
        </div>
      </TabPane>
    </Tabs>
  </div>
);

export default TruckTabs;
