import { notification } from "antd";

export const SuccessMessage = (text: string | undefined) => {
  return (
    <>
      {notification["success"]({
        message: "Notification",
        description: text ? text : "Operation successful!",
        placement: "bottomRight"
      })}
    </>
  );
};
