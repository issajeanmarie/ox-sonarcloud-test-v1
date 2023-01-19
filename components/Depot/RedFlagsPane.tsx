import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import React, { useState } from "react";
import Navbar from "../Shared/Content/Navbar";
import Input from "../Shared/Input";
import CustomButton from "../Shared/Button";
import RedFlagsTable from "../Tables/Depot/RedFlagsTable";
import RedFlagModal from "../Modals/RedFlagModal";
import JustifyFlagModal from "../Modals/JustifyFlagModal";

const RedFlagsPane = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isJustifyFlagModalVisible, setIsJustifyFlagModalVisible] =
    useState(false);

  const LeftSide = (
    <Row align="middle" gutter={24}>
      <Col>
        <span className="text-md font-bold">6 Red flags</span>
      </Col>

      <Col>
        <Input
          type="text"
          placeholder="Search name, location or phone"
          name="searchDriver"
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
      <RedFlagModal isVisible={isVisible} setIsVisible={setIsVisible} />
      <JustifyFlagModal
        isVisible={isJustifyFlagModalVisible}
        setIsVisible={setIsJustifyFlagModalVisible}
      />

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />

      <RedFlagsTable
        setIsVisible={setIsVisible}
        setIsJustifyFlagModalVisible={setIsJustifyFlagModalVisible}
      />
    </>
  );
};

export default RedFlagsPane;
