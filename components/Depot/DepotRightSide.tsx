import React, { FC } from "react";
import Col from "antd/lib/col";
import DepotTabs from "./DepotTabs";
import { RedFlagResponse } from "../../lib/types/depots";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  flagsData: RedFlagResponse;
  isLoading: boolean;
}

const DepotRightSide: FC<Props> = ({ flagsData, setSearch, isLoading }) => {
  return (
    <Col flex="auto" className="h-[79vh] overflow-y-hidden">
      <DepotTabs
        isLoading={isLoading}
        flagsData={flagsData}
        setSearch={setSearch}
      />
    </Col>
  );
};

export default DepotRightSide;
