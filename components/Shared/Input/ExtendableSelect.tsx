import { Select } from "antd";
import React, { useState } from "react";
import Input from "../Input";

const ExtendableSelect = ({ options, ...rest }: any) => {
  const [newOption, setNewOption] = useState<string | null>(null);

  const onSearch = (value: any) => {
    setNewOption(value);
  };

  return (
    <Input type="select" isGroupDropdown onSearch={onSearch} {...rest}>
      {newOption &&
        !options.find(
          (option: { value: any; label: any }) =>
            option?.label?.toLowerCase() === newOption.toLowerCase()
        ) && (
          <Select.Option key={newOption} value={newOption} title={newOption}>
            {newOption}
          </Select.Option>
        )}
      {options?.map((opt: any, index: number) => (
        <Select.Option key={index} value={opt.value} title={opt.label}>
          {opt.label}
        </Select.Option>
      ))}
    </Input>
  );
};

export default ExtendableSelect;
