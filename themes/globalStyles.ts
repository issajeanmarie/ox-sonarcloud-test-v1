import { Row } from "antd";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import styled from "styled-components";
import { text, color } from "./constants";
import { device } from "./device";
import { styledComponentsTypes } from "../lib/types/styledComponentsTypes";

/**
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since Feb 2022
 */

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props: styledComponentsTypes) => props.direction || "row"};
  flex-wrap: ${(props: styledComponentsTypes) => props.wrap || "nowrap"};
  align-items: ${(props: styledComponentsTypes) => props.align || "flex-start"};
  justify-content: ${(props: styledComponentsTypes) =>
    props.justify || "flex-start"};
  gap: ${(props: styledComponentsTypes) => props.gap || "0"};
  width: ${(props: styledComponentsTypes) => props.width || ""};
  height: ${(props: styledComponentsTypes) => props.height || ""};
  padding: ${(props: styledComponentsTypes) => props.padding || ""};
  position: ${(props: styledComponentsTypes) => props.position || "static"};
  margin: ${(props: styledComponentsTypes) => props.margin || ""};

  @media ${device.mobileL} {
    flex-direction: ${(props: styledComponentsTypes) =>
      props.mobile ? "column" : "row"};
  }

  @media ${device.mobileM} {
    flex-direction: ${(props: styledComponentsTypes) =>
      props.mobile ? "column" : "row"};
  }

  @media ${device.mobileS} {
    flex-direction: ${(props: styledComponentsTypes) =>
      props.mobile ? "column" : "row"};
  }

  @media ${device.tabletL} {
    flex-direction: ${(props: styledComponentsTypes) =>
      props.mobile ? "column" : "row"};
  }
`;

// Texts
export const Heading = styled.h1`
  font-size: ${text.heading};
  color: ${(props: styledComponentsTypes) =>
    `var(--${props.color || "black"})`};
  padding: ${(props: styledComponentsTypes) => props.padding || ""};
  margin: ${(props: styledComponentsTypes) => props.margin || "0"};
  font-weight: ${(props: styledComponentsTypes) => props.weight || "300"};
  text-align: ${(props: styledComponentsTypes) => props.align || "left"};
  white-space: ${(props: styledComponentsTypes) => props.whiteSpace || ""};
  border: ${(props: styledComponentsTypes) => props.border || ""};
  border-bottom: ${(props: styledComponentsTypes) => props.borderBottom || ""};
  width: ${(props: styledComponentsTypes) => props.width || ""};
  text-transform: ${(props: styledComponentsTypes) => props.transform || ""};
  font-style: ${(props: styledComponentsTypes) => props.fontStyle || ""};

  @media ${device.tabletL} {
    text-align: ${(props: styledComponentsTypes) => props.phoneAlign || "left"};
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

export const TextSmall = styled(Heading)`
  font-size: ${text.sm};
`;

export const StyledImageContainer = styled.div`
  width: ${(props: styledComponentsTypes) => props.width || "100%"};
  height: ${(props: styledComponentsTypes) => props.height || "100%"};
  border-radius: ${(props: styledComponentsTypes) => props.radius || ""};
  margin: ${(props: styledComponentsTypes) => props.margin || ""};
  overflow: hidden;
`;

export const StyledRow = styled(Row)`
  width: ${(props: styledComponentsTypes) => props.width || ""};
`;

export const StyledSpan = styled.span`
  color: ${(props: styledComponentsTypes) =>
    `var(--${props.color || "black"})`};
  font-weight: ${(props: styledComponentsTypes) => props.weight || "normal"};
  font-size: ${(props: styledComponentsTypes) => props.font || "0.875rem"};
  font-style: ${(props: styledComponentsTypes) => props.fontStyle || "none"};
  max-width: ${(props: styledComponentsTypes) => props.mxWidth || ""};
  white-space: ${(props) => props.whiteSpace || ""};
`;

export const DashboardHeader = styled(Flex)`
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

export const StyledLink = styled.a`
  color: ${(props: styledComponentsTypes) => props.color || color.black};
  display: block;
  text-align: ${(props: styledComponentsTypes) => props.align || "center"};
  font-weight: ${(props: styledComponentsTypes) => props.weight || "300"};
  text-decoration: ${(props: styledComponentsTypes) =>
    props.underline ? "underline" : "none"};
  font-size: ${(props: styledComponentsTypes) => props.size || text.normal};
  margin: ${(props) => props.margin || ""};

  &:hover {
    color: ${color.black};
  }
`;

export const Container = styled.section`
  width: ${(props: styledComponentsTypes) => props.width || "auto"};
  height: ${(props: styledComponentsTypes) => props.height || "auto"};
  padding: ${(props: styledComponentsTypes) => props.padding || ""};
  margin: ${(props: styledComponentsTypes) => props.margin || "0"};
  border: ${(props: styledComponentsTypes) =>
    props.bordercolor ? `1px solid var(--${props.bordercolor})` : "none"};
  border-bottom: ${(props: styledComponentsTypes) =>
    props.bdBottomColor ? `1px solid var(--${props.bdBottomColor})` : "none"};
  border-top: ${(props: styledComponentsTypes) =>
    props.bdTopColor ? `1px solid var(--${props.bdTopColor})` : "none"};
`;

export const StyledButton = styled(Button)`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: ${(props: styledComponentsTypes) => props.padding || "0 3rem"};
  background-color: ${(props: styledComponentsTypes) =>
    props.primary ? color.yellow : "rgba(231, 181, 34, 0.16)"};
  color: ${(props: styledComponentsTypes) =>
    props.primary ? color.white : color.yellow_faded_text};
  width: ${(props: styledComponentsTypes) => props.width || "fit-content"};
  height: ${(props: styledComponentsTypes) => props.height || "3.2rem"};
  font-size: ${(props: styledComponentsTypes) => props.fontSize || text.normal};
  margin: ${(props: styledComponentsTypes) => props.margin || ""};
  outline: none;
  border: ${(props: styledComponentsTypes) =>
    props.border ? `1px solid var(--${props.bordercolor || "black"})` : "none"};
  font-weight: 700;
  transition: 0.3s ease-in-out;
  text-transform: ${(props: styledComponentsTypes) =>
    props.transform || "uppercase"};
  border-radius: ${(props: styledComponentsTypes) =>
    props.radius ? props.radius : "4px"};
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${color.yellow};
    background-color: rgba(231, 181, 34, 0.16);
    color: ${color.yellow_faded_text};
  }
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: ${(props: styledComponentsTypes) => props.mb || "0"};
  width: ${(props: styledComponentsTypes) => props.width || ""};
`;

export const StyledInput = styled(Input)`
  background: ${color.input_white};
  height: ${(props: styledComponentsTypes) => props.height || "100px"};
  width: ${(props: styledComponentsTypes) => props.width || "100%"};
  border: none;
  outline: none;
  padding: 0 1rem;
  border-radius: 4px;
`;

export const OutlinedSelect = styled.div`
  background: ${color.white};
  border: ${`1px solid ${color.black}`};
  width: 100%;

  &: > * {
    background: red !important;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  width: ${(props: styledComponentsTypes) => props.width || "100%"};
  min-width: 7rem;
  flex-grow: 1;
  height: ${(props: styledComponentsTypes) => props.height || "3.2rem"};
  padding: 0 1rem;
  background: ${color.input_white};
  border: none;

  &:hover,
  &:active {
    border: 1px solid none;
  }
`;

export const StyledAddIcon = styled(Flex)`
  width: 45px;
  height: 45px;
  border-radius: 4px;
  background-color: rgba(231, 181, 34, 0.16);
  cursor: pointer;
`;

export const StyledCloseButton = styled(StyledButton)`
  background: ${color.input_white};
  color: ${color.dark};
  font-size: ${text.sm};
  height: 40px;
  padding: 0 16px;
  column-gap: 42px;
`;

export const StyledDayCircle = styled(Flex)`
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

export const StyledTableActionButton = styled(Flex)`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${(props: styledComponentsTypes) =>
    props.color === "red"
      ? "rgba(189, 6, 45, 0.05)"
      : "rgba(42, 53, 72, 0.05)"};
`;

export const StyledViewButton = styled(Flex)`
  background: rgba(231, 181, 34, 0.05);
  padding: 6px 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const StyledCard = styled(Flex)`
  width: ${(props: styledComponentsTypes) => props.width || ""};
  padding: ${(props: styledComponentsTypes) => props.padding || "24px"};
  background: ${color.white};
  box-shadow: 0px 0px 19px #00000008;
  border: ${(props) => props.border || `1px solid ${color.input_white}`};
  border-radius: 4px;
  position: relative;
`;

export const StyledUploadInput = styled.input`
  width: ${(props: styledComponentsTypes) => props.width || "100%"};
  height: ${(props: styledComponentsTypes) => props.height || "150px"};
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledOrderColumn = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 19px #00000008;
  border-radius: 4px;
  width: 100%;
`;

export const StyledOrderTopRow = styled(Row)`
  border-bottom: 1px solid #eaeff2;
  padding: 2rem 2.2rem;
`;

export const StyledOrderBottomRow = styled(Row)`
  border-top: 1px solid #eaeff2;
  padding: 1rem 2.2rem;
`;

export const StyledWhiteSelectContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  position: relative;
  height: 2.8rem;
  padding: 0 0.8rem;
`;
