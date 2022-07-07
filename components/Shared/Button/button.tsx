import { FC } from "react";
import Button from "antd/lib/button";

interface ButtonProps {
  type: "primary" | "secondary" | "danger";
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

    default:
      return null;
  }
};

export default CustomButton;
