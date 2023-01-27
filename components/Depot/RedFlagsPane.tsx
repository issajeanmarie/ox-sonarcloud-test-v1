import React, { useState, FC } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Navbar from "../Shared/Content/Navbar";
import Input from "../Shared/Input";
import CustomButton from "../Shared/Button";
import RedFlagsTable from "../Tables/Depot/RedFlagsTable";
import RedFlagModal from "../Modals/RedFlagModal";
import JustifyFlagModal from "../Modals/JustifyFlagModal";
import { RedFlagResponse, SingleRedFlag } from "../../lib/types/depots";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  flagsData: RedFlagResponse;
  isLoading: boolean;
}

const RedFlagsPane: FC<Props> = ({ setSearch, flagsData, isLoading }) => {
  const [activeFlag, setActiveFlag] = useState<SingleRedFlag | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isJustifyFlagModalVisible, setIsJustifyFlagModalVisible] =
    useState(false);

  const LeftSide = (
    <Row align="middle" gutter={24}>
      <Col>
        <span className="text-md font-bold">
          {flagsData?.payload?.content?.length} Red flags
        </span>
      </Col>

      <Col>
        <Input
          onChange={setSearch}
          type="text"
          placeholder="Search name, location or phone"
          name="searchDriver"
          allowClear
          suffixIcon={
            <Image
              width={10}
              src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
              preview={false}
              alt=""
            />
          }
        />
      </Col>
    </Row>
  );

  const RightSide = (
    <div className="w-[120px]">
      <CustomButton disabled={false} type="secondary">
        Download
      </CustomButton>
    </div>
  );

  return (
    <>
      <RedFlagModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        activeFlag={activeFlag}
      />

      <JustifyFlagModal
        isVisible={isJustifyFlagModalVisible}
        setIsVisible={setIsJustifyFlagModalVisible}
        activeFlag={activeFlag}
      />

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />

      <RedFlagsTable
        setIsVisible={setIsVisible}
        setIsJustifyFlagModalVisible={setIsJustifyFlagModalVisible}
        flagsData={flagsData}
        isLoading={isLoading}
        setActiveFlag={setActiveFlag}
      />
    </>
  );
};

export default RedFlagsPane;
