import React from "react";
import { Row, Col, Dropdown } from "antd";
import { DepotMenus } from "../../Menus/Menus";
import { DepositLineIcon, YellowArrowDownIcon } from "../../Icons/Icons";

const SiderTop = () => {
  return (
    <Row className="sidebar_top cursored_text">
      <Dropdown overlay={DepotMenus} trigger={["click"]}>
        <Col
          className="pad16"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
        >
          <div className="content_center">
            <span className="ma_right8">{DepositLineIcon}</span>
            <span className="white_color text12 fowe700">Select depot</span>
          </div>
          {YellowArrowDownIcon}
        </Col>
      </Dropdown>
    </Row>
  );
};

export default SiderTop;
