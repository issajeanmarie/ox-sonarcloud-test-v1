/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MenuOutlined from "@ant-design/icons/MenuOutlined";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import { device } from "../../../themes/device";
import { color } from "../../../themes/constants";
import { Flex, StyledLink } from "../../../themes/globalStyles";
import { StyledComponentsTypes } from "../../../lib/types/StyledComponentsTypes";
import { MenuTypes } from "../../../lib/types/globalTypes";

/**
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since Feb 2022
 */

const Navigation = styled(Flex)<StyledComponentsTypes>`
  line-height: 0;
  z-index: 1;
  @media ${device.laptopM} {
    display: ${(props) => (props.isVisible ? "block" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    padding: 0 1rem;
    background: var(--white);
    border: 1px solid var(--grey);
  }
`;

const NavigationIconContainer = styled.div`
  display: none;

  @media ${device.laptopM} {
    display: block;
  }
`;

const OpenNavigationIcon = styled(MenuOutlined)`
  font-size: 1.15rem;
  margin-top: 4px;
  cursor: pointer;
`;

const CloseNavigationIcon = styled(CloseOutlined)`
  font-size: 1.15rem;
  margin-top: 4px;
  cursor: pointer;
`;

const NavLink = styled(StyledLink)`
  font-size: var(--text_sm);
  transition: 0.3s ease-in-out;
  padding: 2rem 1rem;
  border-bottom: ${(props) =>
    props.active === "true" ? `4px solid ${color.yellow}` : "none"};
  font-weight: ${(props) => (props.active === "true" ? "700" : "300")};
  color: ${(props) =>
    props.active === "true" ? "var(--yellow)" : "var(--black)"};

  &:hover {
    color: var(--yellow);
    font-weight: 700;
  }

  @media ${device.laptopM} {
    text-align: left;
  }
`;

const DashboardNavigation = ({ menus }: MenuTypes) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const handleMenu = () => setIsMenuVisible(!isMenuVisible);

  return (
    <>
      <NavigationIconContainer onClick={handleMenu}>
        {isMenuVisible ? <CloseNavigationIcon /> : <OpenNavigationIcon />}
      </NavigationIconContainer>

      <Navigation gap="1rem" align="center" isVisible={isMenuVisible}>
        {menus?.map((menu: any) => (
          <NavLink
            key={menu.name}
            active={menu.active ? "true" : "false"}
            to={menu.url}
          >
            {menu?.name}
          </NavLink>
        ))}
      </Navigation>
    </>
  );
};

DashboardNavigation.propTypes = {
  menus: PropTypes.array
};

export default DashboardNavigation;
