import { message } from "antd";

export const ErrorMessage = (text: string | undefined) => {
  return (
    <>
      {message?.error({
        content: text ? text : "No message to show! That's weird",
        duration: 10,
        style: {
          marginTop: "5vh"
        }
      })}
    </>
  );
};
