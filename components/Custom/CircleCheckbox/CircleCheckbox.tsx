import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color } from "../../../themes/constants";

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: ${(props) => props.width || "39px"};
  height: ${(props) => props.height || "21px"};
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + * {
    background-color: ${color.yellow};
  }

  &:checked + *::before {
    -webkit-transform: translateX(${(props) => props.translateX || "18px"});
    -ms-transform: translateX(${(props) => props.translateX || "18px"});
    transform: translateX(${(props) => props.translateX || "18px"});
  }

  &:focus + * {
    box-shadow: 0 0 1px ${color.yellow};
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${color.input_white};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: "";
    width: ${(props) => props.width || "13px"};
    height: ${(props) => props.height || "13px"};
    left: 4px;
    bottom: 4px;
    background-color: ${color.toggle_grey};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const CircleCheckbox = ({ defaultValue, checked, state, setState }) => (
  <Switch>
    <Input
      type="checkbox"
      defaultValue={defaultValue}
      checked={checked}
      onChange={() => setState(!state)}
    />
    <Slider />
  </Switch>
);

CircleCheckbox.propTypes = {
  defaultValue: PropTypes.string,
  checked: PropTypes.bool,
  state: PropTypes.bool,
  setState: PropTypes.func
};

export default CircleCheckbox;