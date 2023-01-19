import { notification } from "antd";

export const InfoMessage = (text: string | undefined) => {
  return (
    <>
      {notification["info"]({
        message: "Notification",
        description: text
          ? text
          : "Something is wrong. Please report this error",
        placement: "bottomRight"
      })}
    </>
  );
};
