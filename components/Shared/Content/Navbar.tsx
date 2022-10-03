import React, { FC } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { classes } from "../../../config/constants";
import { NavbarTypes } from "../../../lib/types/content";

const Navbar: FC<NavbarTypes> = ({ LeftSide, RightSide, type }) => {
  return (
    <Row
      style={{ margin: type === "CENTER" ? "16px auto" : "auto" }}
      className={`${type === "CENTER" ? "w-[100%]" : "100%"}  ${
        classes.navbar
      } m-auto`}
      gutter={32}
      justify="space-between"
      align="middle"
    >
      <Col>{LeftSide}</Col>

      <Col>{RightSide}</Col>
    </Row>
  );
};

export default Navbar;
