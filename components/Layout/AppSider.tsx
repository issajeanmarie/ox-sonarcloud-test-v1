import React from "react";
import { Row, Col, Dropdown } from "antd";
import Image from "antd/lib/image";
import { DepotMenus } from "../Menus/Menus";
import { DepositLineIcon, YellowArrowDownIcon } from "../Icons/Icons";
import { changeRoute } from "../../helpers/routesHandler";
import { RouteMenus } from "../Menus/Menus";
import { DashboardSider, TopSider, StyledHelpDesk } from "./styles";
import { Text, StyledSpan } from "../../themes/globalStyles";

const AppSider = () => {
  return (
    <DashboardSider>
      <TopSider>
        <Dropdown overlay={DepotMenus} trigger={["click"]}>
          <Row
            style={{ width: "100%" }}
            gutter={12}
            align="middle"
            className="pointer"
          >
            <Col span={4} flex="none">
              {DepositLineIcon}
            </Col>

            <Col span={18} flex="auto">
              <Text weight="700">Tyazo Depot</Text>
            </Col>

            <Col span={2} flex="none">
              {YellowArrowDownIcon}
            </Col>
          </Row>
        </Dropdown>
      </TopSider>

      <RouteMenus changeRoute={changeRoute} />

      <StyledHelpDesk align="center" justify="space-between">
        <Col>
          <Row gutter={12} align="middle" wrap={false}>
            <Col>
              <Image
                width={22}
                src="/icons/headphonesalt.svg"
                preview={false}
                alt=""
              />
            </Col>

            <Col>
              <StyledSpan>OX Help Desk</StyledSpan>
            </Col>
          </Row>
        </Col>

        <Col>
          <Image
            width={22}
            src="/icons/keyboard_forwad_black_24dp.svg"
            preview={false}
            alt=""
          />
        </Col>
      </StyledHelpDesk>
    </DashboardSider>
  );
};

export default AppSider;
