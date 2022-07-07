import { FC, Fragment } from "react";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Typography from "antd/lib/typography";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";

const { Option } = Select;
const { Text } = Typography;

interface EntryProps {
  type: "select" | "text" | "password" | "text_area" | "date";
  name: string;
  options?: { label: string; value: string | number }[];
  suffixIcon?: React.ReactElement;
  size?: "small" | string;
  label?: string;
  placeholder?: string;
  className?: string;
  rules?: any;
}

const Entry: FC<EntryProps> = ({
  type,
  name,
  options,
  suffixIcon,
  label,
  rules,
  size,
  placeholder
}) => {
  switch (type) {
    case "text":
      return (
        <Fragment>
          {label && <Text className="heading2">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <Input
              className={`my_input ${size === "small" && "sm"}`}
              placeholder={placeholder}
              suffix={suffixIcon}
            />
          </Form.Item>
        </Fragment>
      );
    case "select":
      return (
        <Fragment>
          {label && <Text className="heading2">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <Select
              showSearch
              placeholder={placeholder}
              size="large"
              className={`my_input ${size === "small" && "sm"}`}
              suffixIcon={suffixIcon}
              filterOption={(input, option) =>
                option?.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options?.map((opt, index) => {
                return (
                  <Option key={index} value={opt.value}>
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
          {label && <Text className="heading2">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <Input.TextArea
              className="my_input p-[12px]"
              rows={6}
              placeholder={placeholder}
            />
          </Form.Item>
        </Fragment>
      );
    case "password":
      return (
        <Fragment>
          {label && <Text className="heading2">{label}</Text>}
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
          {label && <Text className="heading2">{label}</Text>}
          <Form.Item name={name} rules={rules}>
            <DatePicker
              className={`my_datepicker ${size === "small" && "sm"}`}
              allowClear={false}
              name={name}
              suffixIcon={suffixIcon}
            />
          </Form.Item>
        </Fragment>
      );
    default:
      return null;
  }
};

export default Entry;
