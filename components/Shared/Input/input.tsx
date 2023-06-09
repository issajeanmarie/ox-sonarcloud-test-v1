/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState
} from "react";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Typography from "antd/lib/typography";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import TimePicker from "antd/lib/time-picker";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import useOnClickOutside from "../../../utils/hooks/useOutsideClick";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "antd/lib/image";
import { FileUploader } from "./fileUploader";
import moment from "moment";
import { WarningMessage } from "../Messages/WarningMessage";

const { Option } = Select;
const { Text } = Typography;

const Entry = ({
  type,
  name,
  options,
  disabled,
  isGroupDropdown,
  suffixIcon,
  isLoading,
  children,
  inputType,
  label,
  rules,
  size,
  placeholder,
  onChange,
  showSearch,
  onDateChange,
  defaultValue,
  initialValue,
  setLocation,
  dateFormat,
  format,
  showTime,
  location,
  fileName,
  picker,
  allowClear,
  onKeyUp,
  list,
  disabledDate,
  selfHandleValue,
  notFoundContent,
  onSearch,
  help,
  className
}: any) => {
  const [coordinatesLoading, setCoordinatesLoading] = useState<boolean>(false);
  const {
    ready,
    value,
    suggestions: { status, data },
    clearSuggestions,
    setValue
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: ["rw"] }
    },
    debounce: 300
  });

  const placeSuggestionsRef = useRef<any>();

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setLocation();
  };

  const handleSelect = (val: string): void => {
    setValue(val, false);
    setCoordinatesLoading(true);
    clearSuggestions();

    getGeocode({ address: val })
      .then((results) => getLatLng(results[0]))
      .then((coordinates) => {
        setLocation && setLocation({ name: val, coordinates });
        setCoordinatesLoading(false);
      })
      .catch((error) => {
        setCoordinatesLoading(false);
        WarningMessage(error);
      });
  };

  useEffect(() => {
    if (location) {
      setValue(location.name);
    } else {
      setValue("");
    }
  }, []);

  useOnClickOutside(placeSuggestionsRef, () => clearSuggestions());

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(({ place_id, description }: any) => (
      <div
        role="button"
        onClick={() => handleSelect(description)}
        key={place_id}
        className="hover:bg-gray-50 cursor-pointer p-2 text-sm transition-all duration-100"
      >
        {description}
      </div>
    ));

    return <>{suggestions}</>;
  };

  const textInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}
      <Form.Item
        name={name}
        rules={rules}
        initialValue={initialValue}
        help={help}
      >
        <Input
          list={list}
          disabled={disabled}
          defaultValue={defaultValue}
          className={`my_input ${size === "small" && "sm"} ${className}`}
          placeholder={placeholder}
          allowClear={allowClear}
          type={inputType}
          suffix={suffixIcon}
          onChange={
            selfHandleValue
              ? ({ target }) =>
                  onChange({
                    receivedValue: selfHandleValue,
                    value: target.value
                  })
              : ({ target }: ChangeEvent<HTMLInputElement>) =>
                  onChange && onChange(target.value)
          }
        />
      </Form.Item>
    </Fragment>
  );

  const selectInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}
      <Form.Item name={name} rules={rules} help={help}>
        <Select
          notFoundContent={notFoundContent}
          showSearch={showSearch || true}
          placeholder={placeholder}
          allowClear={allowClear}
          size="large"
          className={`my_input  ${size === "small" && "sm"} ${className}`}
          disabled={disabled}
          loading={isLoading}
          defaultValue={defaultValue}
          onChange={(value: string) => onChange && onChange(value)}
          onKeyUp={({ target }: any) => onKeyUp && onKeyUp(target.value)}
          onSearch={onSearch}
          suffixIcon={suffixIcon}
          filterOption={(input, option) =>
            (option &&
              option?.key?.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
            option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {isGroupDropdown
            ? children
            : options?.map((opt: any, index: number) => {
                return (
                  <Option key={index} value={opt.value} title={opt.label}>
                    {opt.label}
                  </Option>
                );
              })}
        </Select>
      </Form.Item>
    </Fragment>
  );

  const dropdownSelectInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}
      <Form.Item name={name} rules={rules} help={help}>
        <Select
          showSearch={showSearch || true}
          placeholder={placeholder}
          allowClear={allowClear}
          size="large"
          className={`dropdownSelectInput ${
            size === "small" && "sm"
          } ${className}`}
          disabled={disabled}
          loading={isLoading}
          defaultValue={defaultValue}
          onChange={(value: string) => onChange && onChange(value)}
          onSearch={onSearch}
          suffixIcon={suffixIcon}
          filterOption={(input, option) =>
            (option &&
              option?.key?.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
            option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {isGroupDropdown
            ? children
            : options?.map((opt: any, index: number) => {
                return (
                  <Option key={index} value={opt.value} title={opt.label}>
                    {opt.label}
                  </Option>
                );
              })}
        </Select>
      </Form.Item>
    </Fragment>
  );

  const textAreaInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}
      <Form.Item name={name} rules={rules} help={help}>
        <Input.TextArea
          defaultValue={defaultValue}
          className="my_input"
          rows={4}
          placeholder={placeholder}
          onChange={({ target }: any) => onChange && onChange(target.value)}
        />
      </Form.Item>
    </Fragment>
  );

  const passwordInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}
      <Form.Item name={name} rules={rules} help={help}>
        <Input.Password
          className="my_input p-[12px]"
          allowClear={allowClear}
          placeholder={placeholder}
        />
      </Form.Item>
    </Fragment>
  );

  const TimeInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}
      <Form.Item name={name} rules={rules} help={help}>
        <TimePicker
          defaultValue={defaultValue && moment(defaultValue, dateFormat)}
          onChange={onDateChange}
          className={`my_datepicker ${size === "small" && "sm"} ${className}`}
          name={name}
          suffixIcon={
            <Image
              src="/icons/ic-actions-calendar.svg"
              alt="Calendar icon"
              width={18}
              height={18}
              preview={false}
            />
          }
          format={dateFormat || format || "YYYY-MM-DD"}
          placeholder={placeholder}
          disabledDate={disabledDate}
        />
      </Form.Item>
    </Fragment>
  );

  const dateInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}
      <Form.Item name={name} rules={rules} help={help}>
        <DatePicker
          defaultValue={defaultValue && moment(defaultValue, dateFormat)}
          onChange={onDateChange}
          className={`my_datepicker ${size === "small" && "sm"} ${className}`}
          // allowClear
          name={name}
          picker={picker}
          suffixIcon={
            <Image
              src="/icons/ic-actions-calendar.svg"
              alt="Calendar icon"
              width={18}
              height={18}
              preview={false}
            />
          }
          format={dateFormat || format || "YYYY-MM-DD"}
          showTime={showTime}
          placeholder={placeholder}
          disabledDate={disabledDate}
        />
      </Form.Item>
    </Fragment>
  );

  const locationInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}
      <div className="w-full relative">
        <Form.Item name={name} rules={rules} help={help}>
          <Input
            className={`my_input ${size === "small" && "sm"} ${className}`}
            placeholder={placeholder}
            type={inputType}
            value={value}
            onChange={handleInput}
            suffix={coordinatesLoading ? <LoadingOutlined /> : false}
            disabled={!ready || coordinatesLoading}
          />
          {status === "OK" && (
            <div
              ref={placeSuggestionsRef}
              className="bg-white absolute top-[50px] z-10 inset-x-0 rounded-lg shadow-md "
            >
              {renderSuggestions()}
            </div>
          )}
        </Form.Item>
      </div>
    </Fragment>
  );

  const fileInput = (
    <Fragment>
      {label && <Text className="heading2 mb-[8px]">{label}</Text>}

      <Form.Item name={name} help={help}>
        <FileUploader fileName={fileName}>
          <Input
            name={name}
            disabled={disabled}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={inputType}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              onChange && onChange(target.files)
            }
          />
        </FileUploader>
      </Form.Item>
    </Fragment>
  );

  switch (type) {
    case "text":
      return textInput;

    case "select":
      return selectInput;

    case "text_area":
      return textAreaInput;

    case "password":
      return passwordInput;

    case "date":
      return dateInput;

    case "location":
      return locationInput;

    case "file":
      return fileInput;

    case "dropdownSelect":
      return dropdownSelectInput;

    case "time-picker":
      return TimeInput;

    default:
      return null;
  }
};

export default Entry;
