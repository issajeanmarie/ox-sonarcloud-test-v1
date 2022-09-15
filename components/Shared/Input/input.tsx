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
import ImageUploader from "./imageUploader";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import useOnClickOutside from "../../../utils/hooks/useOutsideClick";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;
const { Text } = Typography;

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
  defaultValue,
  initialValue,
  setLocation,
  dateFormat,
  format,
  showTime,
  location
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
        message.warning(error);
      });
  };

  useEffect(() => {
    if (location) {
      setValue(location.name);
    } else {
      setValue("");
    }
  }, [location]);

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

  switch (type) {
    case "text":
      return (
        <Fragment>
          {label && <Text className="heading2 mb-[8px]">{label}</Text>}
          <Form.Item name={name} rules={rules} initialValue={initialValue}>
            <Input
              disabled={disabled}
              // onChange={onChange}
              defaultValue={defaultValue}
              className={`my_input ${size === "small" && "sm"}`}
              placeholder={placeholder}
              allowClear
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
              allowClear
              size="large"
              className={`my_input bordered_input ${size === "small" && "sm"} `}
              disabled={disabled}
              loading={isLoading}
              defaultValue={defaultValue}
              onChange={(value: string) => onChange && onChange(value)}
              suffixIcon={suffixIcon}
              filterOption={(input, option) =>
                (option &&
                  option?.key?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0) ||
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
              rows={4}
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
              allowClear
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
              allowClear
              name={name}
              suffixIcon={
                <Image
                  src="/icons/ic-actions-calendar.svg"
                  alt="Calendar icon"
                  width={18}
                  height={18}
                />
              }
              format={dateFormat || format || "YYYY-MM-DD"}
              showTime={showTime}
              placeholder={placeholder}
              // format={format ? format : false}
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
                allowClear
                value={value}
                onChange={handleInput}
                suffix={coordinatesLoading ? <LoadingOutlined /> : false}
                disabled={!ready || coordinatesLoading}
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
