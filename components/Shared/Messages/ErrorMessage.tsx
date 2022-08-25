import { message } from "antd";

export const ErrorMessage = (text: string | undefined) => {
  return (
    <>
      {message?.error({
        content: text ? text : "Something is wrong, try again later!",
        duration: 6,
        style: {
          marginTop: "3vh"
        }
      })}
    </>
  );
};
