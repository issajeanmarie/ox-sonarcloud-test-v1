import React, { FC } from "react";
import Tabs from "antd/lib/tabs";
import RedFlagsPane from "./RedFlagsPane";
import { RedFlagResponse } from "../../lib/types/depots";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  flagsData: RedFlagResponse;
  isLoading: boolean;
}

const { TabPane } = Tabs;

const DepotTabs: FC<Props> = ({ setSearch, flagsData, isLoading }) => (
  <div className="h-[85vh] rounded bg-white p-12 pt-6 ">
    <Tabs defaultActiveKey="0" className="truck_tabs">
      <TabPane
        tab={
          <span className="text-md xxl:text-lg ld text-ox-dark">RED FLAGS</span>
        }
        key={1}
      >
        <div className="h-[79vh] overflow-x-hidden overflow-auto py-6 pb-32">
          <RedFlagsPane
            isLoading={isLoading}
            flagsData={flagsData}
            setSearch={setSearch}
          />
        </div>
      </TabPane>
    </Tabs>
  </div>
);

export default DepotTabs;
