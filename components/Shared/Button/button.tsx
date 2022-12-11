import { FC } from "react";
import Button from "antd/lib/button";

interface ButtonProps {
  type:
    | "primary"
    | "secondary"
    | "danger"
    | "danger_filled"
    | "normal"
    | "view"
    | "dropdown";
  loading?: boolean;
  disabled?: boolean;
  size?: "icon" | "small";
  icon?: React.ReactElement;
  className?: string;
  htmlType?: "button" | "submit" | "reset";
  onClick?: (value: any) => any;
  form?: string;
}

const CustomButton: FC<ButtonProps> = ({
  type,
  icon,
  loading,
  size,
  disabled,
  className,
  htmlType,
  children,
  onClick,
  form
}) => {
  switch (type) {
    case "primary":
      return (
        <Button
          form={form}
          className={`my_button uppercase ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          } bg_yellow ${className}`}
          loading={loading}
          disabled={loading || disabled}
          icon={icon}
          onClick={onClick}
          htmlType={htmlType}
        >
          {children}
        </Button>
      );

    case "secondary":
      return (
        <Button
          form={form}
          className={`my_button uppercase ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_white_yellow yellow ${className}`}
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
          className={`my_button dropdown_button uppercase ${
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
          className={`my_button uppercase ${size === "icon" && "icon"} ${
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

    case "danger":
      return (
        <Button
          form={form}
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_danger yellow ${className}`}
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

    default:
      return null;
  }
};

export default CustomButton;
