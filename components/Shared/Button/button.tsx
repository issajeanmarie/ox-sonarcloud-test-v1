import { FC } from "react";
import Button from "antd/lib/button";

interface ButtonProps {
  type: "primary" | "secondary" | "danger" | "normal" | "view";
  loading?: boolean;
  size?: "icon" | "small";
  icon?: React.ReactElement;
  className?: string;
  htmlType?: "button" | "submit" | "reset";
}

const CustomButton: FC<ButtonProps> = ({
  type,
  icon,
  loading,
  size,
  className,
  htmlType,
  children
}) => {
  switch (type) {
    case "primary":
      return (
        <Button
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          } bg_yellow ${className}`}
          loading={loading}
          icon={icon}
          htmlType={htmlType}
        >
          {children}
        </Button>
      );

    case "secondary":
      return (
        <Button
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_white_yellow yellow ${className}`}
          loading={loading}
          icon={icon}
          htmlType={htmlType}
        >
          {children}
        </Button>
      );

    case "view":
      return (
        <Button
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_yellow_view_btn yellow ${className}`}
          loading={loading}
          icon={icon}
          htmlType={htmlType}
        >
          {children}
        </Button>
      );

    case "danger":
      return (
        <Button
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_danger yellow ${className}`}
          loading={loading}
          icon={icon}
          htmlType={htmlType}
        >
          {children}
        </Button>
      );

    case "normal":
      return (
        <Button
          className={`my_button ${size === "icon" && "icon"} ${
            size === "small" && "sm"
          }  bg_white_edit_btn black ${className}`}
          loading={loading}
          icon={icon}
          htmlType={htmlType}
        >
          {children}
        </Button>
      );

    default:
      return null;
  }
};

export default CustomButton;
