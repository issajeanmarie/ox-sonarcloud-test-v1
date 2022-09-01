/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import React, { ChangeEvent, Fragment, useRef } from "react";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Typography from "antd/lib/typography";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import ImageUploader from "./imageUploader";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnClickOutside from "../../../utils/hooks/useOutsideClick";

const { Option } = Select;
const { Text } = Typography;

// interface EntryProps {
//   type:
//     | "select"
//     | "text"
//     | "password"
//     | "text_area"
//     | "date"
//     | "image"
//     | "location";
//   name: string;
//   isGroupDropdown?: boolean;
//   inputType?: string;
//   imageCount?: number;
//   isLoading?: boolean;
//   options?: { label: string; value: string | number }[];
//   suffixIcon?: React.ReactElement | string;
//   disabled?: boolean;
//   images?: any;
//   setImages?: React.SetStateAction<React.Dispatch<any>>;
//   size?: "small" | "large";
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   rules?: any;
//   onChange?: (val: any) => any;
//   showSearch?: boolean;
// }

const Entry = ({
  type,
  name,
  options,
  disabled,
  isGroupDropdown,
  suffixIcon,
  imageCount,
  images,
  isLoading,
  setImages,
  children,
  inputType,
  label,
  rules,
  size,
  placeholder,
  onChange,
  showSearch,
  onDateChange,
  defaultValue
}: any) => {
  // Google location

  const {
    ready,
    value,
    suggestions: { status, data },
    clearSuggestions,
    setValue
  } = usePlacesAutocomplete({
    requestOptions: {
      // location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
      componentRestrictions: { country: ["rw"] }
    },
    debounce: 300
  });

  const placeSuggestionsRef = useRef<any>();

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSelect = (val: string): void => {
    setValue(val, false);
    clearSuggestions();
  };

  useOnClickOutside(placeSuggestionsRef, () => clearSuggestions());

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(({ place_id, description }: any) => (
      <div
        role="button"
        onClick={() => handleSelect(description)}
        key={place_id}
        className="hover:bg-gray-50 cursor-pointer p-2 text-xs transition-all duration-100"
      >
        {description}
      </div>
    ));

    return <>{suggestions}</>;
  };

  switch (type) {
    case "text":
      return (
        <Fragment>
          {label && <Text className="heading2 mb-[8px]">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <Input
              // onChange={onChange}
              defaultValue={defaultValue}
              className={`my_input ${size === "small" && "sm"}`}
              placeholder={placeholder}
              type={inputType}
              suffix={suffixIcon}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                onChange && onChange(target.value)
              }
            />
          </Form.Item>
        </Fragment>
      );
    case "select":
      return (
        <Fragment>
          {label && <Text className="heading2 mb-[8px]">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <Select
              showSearch={showSearch || true}
              placeholder={placeholder}
              size="large"
              className={`my_input bordered_input ${size === "small" && "sm"} `}
              disabled={disabled}
              loading={isLoading}
              onChange={(value: string) => onChange && onChange(value)}
              suffixIcon={suffixIcon}
              filterOption={(input, option) =>
                option?.key?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {isGroupDropdown
                ? children
                : options?.map((opt: any, index: number) => {
                    return (
                      <Option key={index} value={opt.value} title={opt.value}>
                        {opt.label}
                      </Option>
                    );
                  })}
            </Select>
          </Form.Item>
        </Fragment>
      );
    case "text_area":
      return (
        <Fragment>
          {label && <Text className="heading2 mb-[8px]">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <Input.TextArea
              className="my_input"
              rows={6}
              placeholder={placeholder}
            />
          </Form.Item>
        </Fragment>
      );
    case "password":
      return (
        <Fragment>
          {label && <Text className="heading2 mb-[8px]">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <Input.Password
              className="my_input p-[12px]"
              placeholder={placeholder}
            />
          </Form.Item>
        </Fragment>
      );
    case "date":
      return (
        <Fragment>
          {label && <Text className="heading2 mb-[8px]">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <DatePicker
              onChange={onDateChange}
              className={`my_datepicker ${size === "small" && "sm"}`}
              allowClear={false}
              name={name}
              suffixIcon={suffixIcon}
              placeholder={placeholder}
            />
          </Form.Item>
        </Fragment>
      );
    case "image":
      return (
        <Fragment>
          <ImageUploader
            imageCount={imageCount || 1}
            images={images}
            setImages={setImages}
          />
        </Fragment>
      );

    case "location":
      return (
        <Fragment>
          {label && <Text className="heading2 mb-[8px]">{label}</Text>}
          <div className="w-full relative z-10">
            <Form.Item name={name} rules={rules}>
              <Input
                className={`my_input ${size === "small" && "sm"}`}
                placeholder={placeholder}
                type={inputType}
                value={value}
                onChange={handleInput}
                disabled={!ready}
              />
              {status === "OK" && (
                <div
                  ref={placeSuggestionsRef}
                  className="bg-white absolute top-[50px] inset-x-0 rounded-lg shadow-md "
                >
                  {renderSuggestions()}
                </div>
              )}
            </Form.Item>
          </div>
        </Fragment>
      );
    default:
      return null;
  }
};

export default Entry;
