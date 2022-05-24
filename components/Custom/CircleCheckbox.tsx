/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styled from "styled-components";
import { color } from "../../themes/constants";
import { CircleCheckBoxTypes } from "../../lib/types/globalTypes";

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 39px;
  height: 21px;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + * {
    background-color: ${color.yellow};
  }

  &:checked + *::before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
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
    width: 13px;
    height: 13px;
    left: 4px;
    bottom: 4px;
    background-color: ${color.toggle_grey};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const CircleCheckbox = ({
  defaultValue,
  checked,
  state,
  setState
}: CircleCheckBoxTypes) => (
  <Switch>
    <Input
      defaultChecked={true}
      type="checkbox"
      defaultValue={defaultValue}
      checked={checked}
      onChange={() => setState(!state)}
    />
    <Slider />
  </Switch>
);

export default CircleCheckbox;
