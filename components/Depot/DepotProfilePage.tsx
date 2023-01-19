import Row from "antd/lib/row";
import React from "react";
import Content from "../Shared/Content";
import DepotLeftSide from "./DepotLeftSide";
import DepotNavbar from "./DepotNavbar";
import DepotRightSide from "./DepotRightSide";

const DepotProfilePage = () => {
  return (
    <>
      <DepotNavbar />

      <Content isOverflowHidden={false} navType="FULL">
        <Row className="p-5 gap-5" wrap={false}>
          <DepotLeftSide />

          <DepotRightSide />
        </Row>
      </Content>
    </>
  );
};

export default DepotProfilePage;
