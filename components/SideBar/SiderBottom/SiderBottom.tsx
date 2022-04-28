import React from "react";
import { Row, Col } from "antd";
import { changeRoute } from "../../../helpers/routesHandler";
import { RouteMenus } from "../../Menus/Menus";
import { ArrowNarrowRightIcon, HeadsetIcon } from "../../Icons/Icons";

const SiderBottom = () => {
  return (
    <Row className="sidebar_bottom">
      <Col
        style={{ height: "90%" }}
        className="overflowY"
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
      >
        <RouteMenus changeRoute={changeRoute} />
      </Col>
      <Col
        style={{
          background: "#000000",
          cursor: "pointer",
          height: "5%",
          padding: "1.5rem 1rem",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: "1rem",
          left: "0.7rem",
          right: "0.7rem",
        }}
      >
        {HeadsetIcon}
        <span className="muted_text text12 fowe300">OX Help Desk</span>
        {ArrowNarrowRightIcon}
      </Col>
    </Row>
  );
};

export default SiderBottom;
