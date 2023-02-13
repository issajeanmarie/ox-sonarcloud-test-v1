import { notification } from "antd";

export const ErrorMessage = (text: string | undefined) => {
  return (
    <>
      {notification["error"]({
        message: "Error",
        description: text
          ? text
          : "Something is wrong. Please report this error",
        placement: "bottomRight",
        duration: 10
      })}
    </>
  );
};
