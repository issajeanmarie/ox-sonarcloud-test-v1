/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Form from "antd/lib/form";

type Types = {
  width: string;
  name: string;
  validatePhone: boolean;
  phoneNumber: any;
  setPhoneNumber: any;
};

const CustomPhoneInput = ({
  width,
  name,
  validatePhone,
  phoneNumber,
  setPhoneNumber
}: Types) => (
  <Form.Item name={name}>
    <PhoneInput
      className="my_input"
      width={width}
      placeholder="Choose country"
      value={phoneNumber}
      onChange={setPhoneNumber}
      name={name}
    />
    {validatePhone && !phoneNumber && (
      <span className="validation_err">Phone is required</span>
    )}
  </Form.Item>
);

CustomPhoneInput.propTypes = {
  width: PropTypes.string,
  name: PropTypes.string,
  validatePhone: PropTypes.bool,
  phoneNumber: PropTypes.string,
  setPhoneNumber: PropTypes.func
};

export default CustomPhoneInput;
