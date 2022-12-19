import { notification } from "antd";

export const WarningMessage = (text: string | undefined) => {
  return (
    <>
      {notification["warning"]({
        message: "Warning!",
        description: text ? text : "Something is wrong. Pls report this error",
        placement: "bottomRight",
        duration: 10
      })}
    </>
  );
};
