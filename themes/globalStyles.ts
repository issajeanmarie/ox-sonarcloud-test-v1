import { Row } from "antd";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import styled from "styled-components";
import { text, color } from "./constants";
import { device } from "./device";
import { StyledComponentsTypes } from "../lib/types/StyledComponentsTypes";

/**
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since Feb 2022
 */

export const Flex = styled.div<StyledComponentsTypes>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  align-items: ${(props) => props.align || "flex-start"};
  justify-content: ${(props) => props.justify || "flex-start"};
  gap: ${(props) => props.gap || "0"};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  padding: ${(props) => props.padding || ""};
  position: ${(props) => props.position || "static"};
  margin: ${(props) => props.margin || ""};

  @media ${device.mobileL} {
    flex-direction: ${(props) => (props.mobile ? "column" : "row")};
  }

  @media ${device.mobileM} {
    flex-direction: ${(props) => (props.mobile ? "column" : "row")};
  }

  @media ${device.mobileS} {
    flex-direction: ${(props) => (props.mobile ? "column" : "row")};
  }

  @media ${device.tabletL} {
    flex-direction: ${(props) => (props.mobile ? "column" : "row")};
  }
`;

// Texts
export const Heading = styled.h1<StyledComponentsTypes>`
  font-size: ${text.heading};
  color: ${(props) => `var(--${props.color || "black"})`};
  padding: ${(props) => props.padding || ""};
  margin: ${(props) => props.margin || "0"};
  font-weight: ${(props) => props.weight || "300"};
  text-align: ${(props) => props.align || "left"};
  white-space: ${(props) => props.whiteSpace || ""};
  border: ${(props) => props.border || ""};
  border-bottom: ${(props) => props.borderBottom || ""};
  width: ${(props) => props.width || ""};
  text-transform: ${(props) => props.transform || ""};
  font-style: ${(props) => props.fontStyle || ""};

  @media ${device.tabletL} {
    text-align: ${(props) => props.phoneAlign || "left"};
  }
`;

export const SubHeading = styled(Heading)`
  font-size: ${text.sub_heading};
`;

export const TextLarge = styled(Heading)`
  font-size: ${text.large};
`;

export const Text = styled(Heading)`
  font-size: ${text.normal};
`;

export const TextSmall = styled(Heading)<StyledComponentsTypes>`
  font-size: ${text.sm};
`;

export const StyledImageContainer = styled.div<StyledComponentsTypes>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border-radius: ${(props) => props.radius || ""};
  margin: ${(props) => props.margin || ""};
  overflow: hidden;
`;

export const StyledSpan = styled.span<StyledComponentsTypes>`
  color: ${(props) => `var(--${props.color || "black"})`};
  font-weight: ${(props) => props.weight || "normal"};
  font-size: ${(props) => props.font || "0.875rem"};
  font-style: ${(props) => props.fontStyle || "none"};
  max-width: ${(props) => props.mxWidth || ""};
  white-space: ${(props) => props.whiteSpace || ""};
`;

export const DashboardHeader = styled(Flex)<StyledComponentsTypes>`
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 19px #2a354808;
  align-items: center;
  padding: ${(props) => props.padding || "0 1rem"};

  @media ${device.laptopM} {
    position: relative;
    height: 4.2rem;
  }

  @media ${device.mobileL} {
    padding: 0.5rem 1rem;
  }
`;

export const StyledLink = styled.a<StyledComponentsTypes>`
  color: ${(props) => props.color || color.black};
  display: block;
  text-align: ${(props) => props.align || "center"};
  font-weight: ${(props) => props.weight || "300"};
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  font-size: ${(props) => props.size || text.normal};
  margin: ${(props) => props.margin || ""};

  &:hover {
    color: ${color.black};
  }
`;

export const Container = styled.section<StyledComponentsTypes>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  padding: ${(props) => props.padding || ""};
  margin: ${(props) => props.margin || "0"};
  border: ${(props) =>
    props.bordercolor ? `1px solid var(--${props.bordercolor})` : "none"};
  border-bottom: ${(props) =>
    props.bdBottomColor ? `1px solid var(--${props.bdBottomColor})` : "none"};
  border-top: ${(props) =>
    props.bdTopColor ? `1px solid var(--${props.bdTopColor})` : "none"};
`;

export const StyledButton = styled(Button)<StyledComponentsTypes>`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || "0 3rem"};
  background-color: ${(props) =>
    props.primary ? color.yellow : "rgba(231, 181, 34, 0.16)"};
  color: ${(props) => (props.primary ? color.white : color.yellow_faded_text)};
  width: ${(props) => props.width || "fit-content"};
  height: ${(props) => props.height || "3.2rem"};
  font-size: ${(props) => props.fontSize || text.normal};
  margin: ${(props) => props.margin || ""};
  outline: none;
  border: ${(props) =>
    props.border ? `1px solid var(--${props.bordercolor || "black"})` : "none"};
  font-weight: 700;
  transition: 0.3s ease-in-out;
  text-transform: ${(props) => props.transform || "uppercase"};
  border-radius: ${(props) => (props.radius ? props.radius : "4px")};
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${color.yellow};
    background-color: rgba(231, 181, 34, 0.16);
    color: ${color.yellow_faded_text};
  }
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: ${(props) => props.mb || "0"};
  width: ${(props) => props.width || ""};
`;

export const StyledInput = styled(Input)<StyledComponentsTypes>`
  background: ${color.input_white};
  height: ${(props) => props.height || "100px"};
  width: ${(props) => props.width || "100%"};
  border: none;
  outline: none;
  padding: 0 1rem;
  border-radius: 4px;
`;

export const OutlinedSelect = styled.div<StyledComponentsTypes>`
  background: ${color.white};
  border: ${`1px solid ${color.black}`};
  width: 100%;

  &: > * {
    background: red !important;
  }
`;

export const StyledDatePicker = styled(DatePicker)<StyledComponentsTypes>`
  width: ${(props) => props.width || "100%"};
  min-width: 7rem;
  flex-grow: 1;
  height: ${(props) => props.height || "3.2rem"};
  padding: 0 1rem;
  background: ${color.input_white};
  border: none;

  &:hover,
  &:active {
    border: 1px solid none;
  }
`;

export const StyledAddIcon = styled(Flex)<StyledComponentsTypes>`
  width: 45px;
  height: 45px;
  border-radius: 4px;
  background-color: rgba(231, 181, 34, 0.16);
  cursor: pointer;
`;

export const StyledCloseButton = styled(StyledButton)<StyledComponentsTypes>`
  background: ${color.input_white};
  color: ${color.dark};
  font-size: ${text.sm};
  height: 40px;
  padding: 0 16px;
  column-gap: 42px;
`;

export const StyledDayCircle = styled(Flex)<StyledComponentsTypes>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${color.input_white};
  color: ${color.dark};
  font-size: ${text.sm};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const StyledTableActionButton = styled(Flex)<StyledComponentsTypes>`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${(props) =>
    props.color === "red"
      ? "rgba(189, 6, 45, 0.05)"
      : "rgba(42, 53, 72, 0.05)"};
`;

export const StyledViewButton = styled(Flex)<StyledComponentsTypes>`
  background: rgba(231, 181, 34, 0.05);
  padding: 6px 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const StyledCard = styled(Flex)<StyledComponentsTypes>`
  width: ${(props) => props.width || ""};
  padding: ${(props) => props.padding || "24px"};
  background: ${color.white};
  box-shadow: 0px 0px 19px #00000008;
  border: ${(props) => props.border || `1px solid ${color.input_white}`};
  border-radius: 4px;
  position: relative;
`;

export const StyledUploadInput = styled.input<StyledComponentsTypes>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "150px"};
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledOrderColumn = styled.div<StyledComponentsTypes>`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 19px #00000008;
  border-radius: 4px;
  width: 100%;
`;

export const StyledOrderTopRow = styled(Row)<StyledComponentsTypes>`
  border-bottom: 1px solid #eaeff2;
  padding: 2rem 2.2rem;
`;

export const StyledOrderBottomRow = styled(Row)<StyledComponentsTypes>`
  border-top: 1px solid #eaeff2;
  padding: 1rem 2.2rem;
`;

export const StyledWhiteSelectContainer = styled(Flex)<StyledComponentsTypes>`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  position: relative;
  height: 2.8rem;
  padding: 0 0.8rem;
`;
