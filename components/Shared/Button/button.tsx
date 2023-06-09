import { FC } from "react";
import Button from "antd/lib/button";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 12, color: "black", marginBottom: "6px" }}
    spin
  />
);

interface ButtonProps {
  type:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "danger_filled"
    | "normal"
    | "view"
    | "dropdown"
    | "toggle"
    | "green"
    | "dash";
  loading?: boolean;
  disabled?: boolean;
  size?: "icon" | "small";
  icon?: React.ReactElement;
  className?: string;
  htmlType?: "button" | "submit" | "reset";
  onClick?: (value: any) => any;
  form?: string;
  transform?: string;
  id?: string;
}

const CustomButton: FC<ButtonProps> = ({
  type,
  icon,
  loading,
  size,
  disabled,
  className,
  transform,
  htmlType,
  children,
  onClick,
  id,
  form
}) => {
  switch (type) {
    case "primary":
      return (
        <Button
          form={form}
          className={`my_button ${transform || "uppercase"} ${
            size === "icon" && "icon"
          } ${size === "small" && "sm"} bg_yellow ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          onClick={onClick}
          htmlType={htmlType}
          id={id}
        >
          {children}
        </Button>
      );

    case "secondary":
      return (
        <Button
          form={form}
          className={`my_button ${transform || "uppercase"} ${
            size === "icon" && "icon"
          } ${size === "small" && "sm"}  bg_white_yellow yellow ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          onClick={onClick}
          htmlType={htmlType}
        >
          {children}
        </Button>
      );

    case "dropdown":
      return (
        <Button
          form={form}
          className={`my_button dropdown_button ${transform || "uppercase"} ${
            size === "icon" && "icon"
          } ${size === "small" && "sm"}  bg_white_yellow yellow ${className}`}
          loading={loading}
          disabled={loading || disabled}
          onClick={onClick}
          htmlType={htmlType}
        >
          {children} <div className="dropdown_btn_icon">{icon}</div>
        </Button>
      );

    case "view":
      return (
        <Button
          form={form}
          className={`my_button ${transform || "uppercase"} ${
            size === "icon" && "icon"
          } ${
            size === "small" && "sm"
          }  bg_yellow_view_btn yellow ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          htmlType={htmlType}
          onClick={onClick}
        >
          {children}
        </Button>
      );

    case "green":
      return (
        <Button
          form={form}
          className={`my_button ${transform || "uppercase"} ${
            size === "icon" && "icon"
          } ${size === "small" && "sm"}  bg_green_check_btn white ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          htmlType={htmlType}
          onClick={onClick}
        >
          {children}
        </Button>
      );

    case "danger":
      return (
        <Button
          form={form}
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_danger ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          htmlType={htmlType}
          onClick={onClick}
        >
          {children}
        </Button>
      );

    case "danger_filled":
      return (
        <Button
          form={form}
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_danger_filled white ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          htmlType={htmlType}
          onClick={onClick}
        >
          {children}
        </Button>
      );

    case "normal":
      return (
        <Button
          form={form}
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_white_edit_btn black ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          htmlType={htmlType}
          onClick={onClick}
        >
          {children}
        </Button>
      );

    case "toggle":
      return (
        <div className="p-3 pointer flex items-center justify-center h-[32px] w-[32px] rounded bg_danger">
          {loading ? (
            <Spin indicator={antIcon} />
          ) : (
            <div className="bg-ox-red w-[8px] h-[8px]"></div>
          )}
        </div>
      );

    case "success":
      return (
        <Button
          form={form}
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_green white ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          htmlType={htmlType}
          onClick={onClick}
        >
          {children}
        </Button>
      );

    case "dash":
      return (
        <Button
          form={form}
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  border_dash dark ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          htmlType={htmlType}
          onClick={onClick}
        >
          {children}
        </Button>
      );

    default:
      return null;
  }
};

export default CustomButton;
