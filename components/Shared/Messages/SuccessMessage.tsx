import { message } from "antd";

export const SuccessMessage = (text: string | undefined) => {
  return (
    <>
      {message.success({
        content: text ? text : "No message to show! That's weird",
        duration: 5,
        style: {
          marginTop: "5vh"
        }
      })}
    </>
  );
};
