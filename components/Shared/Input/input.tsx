import { FC } from "react";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Typography from "antd/lib/typography";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";

const { Option } = Select;
const { Text } = Typography;

interface EntryProps {
  type: "select" | "text" | "text_area" | "date";
  name: string;
  options?: { label: string; value: string | number }[];
  suffixIcon?: React.ReactElement;
  size?: "small" | string;
  label?: string;
  placeholder?: string;
}

const Entry: FC<EntryProps> = ({
  type,
  name,
  options,
  suffixIcon,
  label,
  size,
  placeholder
}) => {
  switch (type) {
    case "text":
      return (
        <Form.Item name={name}>
          {label && <Text className="heading2 mb-2">{label}</Text>}
          <Input
            className={`my_input ${size === "small" && "sm"}`}
            placeholder="Placeholder"
            suffix={suffixIcon}
          />
        </Form.Item>
      );
    case "select":
      return (
        <Form.Item name={name}>
          {label && <Text className="heading2 mb-2">{label}</Text>}

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
      );
    case "text_area":
      return (
        <Form.Item name={name}>
          {label && <Text className="heading2 mb-2">{label}</Text>}
          <Input.TextArea
            className="my_input p-[12px]"
            rows={6}
            placeholder={placeholder}
          />
        </Form.Item>
      );
    case "date":
      return (
        <Form.Item name={name}>
          {label && <Text className="heading2 mb-2">{label}</Text>}
          <DatePicker
            className={`my_datepicker ${size === "small" && "sm"}`}
            allowClear={false}
            name={name}
            suffixIcon={suffixIcon}
          />
        </Form.Item>
      );
    default:
      return null;
  }
};

export default Entry;
