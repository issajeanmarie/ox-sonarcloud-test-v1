import React from "react";
import Tabs from "antd/lib/tabs";
import RedFlagsPane from "./RedFlagsPane";

const { TabPane } = Tabs;

const DepotTabs = () => (
  <div className="h-[85vh] rounded bg-white p-12 pt-6 ">
    <Tabs defaultActiveKey="0" className="truck_tabs">
      <TabPane
        tab={
          <span className="text-md xxl:text-lg ld text-ox-dark">RED FLAGS</span>
        }
        key={1}
      >
        <div className="h-[78vh] overflow-x-hidden overflow-auto py-6">
          <RedFlagsPane />
        </div>
      </TabPane>
    </Tabs>
  </div>
);

export default DepotTabs;
