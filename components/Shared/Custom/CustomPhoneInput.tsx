/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-number-input";
import Typography from "antd/lib/typography";
import "react-phone-number-input/style.css";
import Form from "antd/lib/form";

type Types = {
  width?: string;
  name?: string;
  validatePhone?: boolean;
  phoneNumber: string;
  setPhoneNumber: any;
  label?: string;
};

const { Text } = Typography;

const CustomPhoneInput = ({
  width = "100%",
  name = "phone",
  validatePhone = true,
  phoneNumber,
  setPhoneNumber,
  label = "Phone number"
}: Types) => (
  <Form.Item name={name}>
    {label && <Text className="heading2 mb-[8px]">{label}</Text>}

    <PhoneInput
      className="my_input"
      width={width}
      placeholder="Choose country"
      value={phoneNumber}
      onChange={setPhoneNumber}
      name={name}
    />
    {validatePhone && !phoneNumber && (
      <span style={{ color: "red" }}>Phone is required</span>
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
