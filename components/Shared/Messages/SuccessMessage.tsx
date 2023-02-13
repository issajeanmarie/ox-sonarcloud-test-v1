import { notification } from "antd";

export const SuccessMessage = (text: string | undefined) => {
  return (
    <>
      {notification["success"]({
        message: "Notification",
        description: text
          ? text
          : "Something is wrong. Please report this error",
        placement: "bottomRight"
      })}
    </>
  );
};
