import { Avatar } from "antd";
import React, { FC } from "react";

type MediumAvatarTypes = {
  children: React.ReactNode;
};
const MediumAvatar: FC<MediumAvatarTypes> = ({ children }) => {
  return (
    <Avatar
      style={{
        width: "50px",
        height: "50px",
        background: "#EAEFF2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px"
      }}
      shape="square"
    >
      {children}
    </Avatar>
  );
};

export default MediumAvatar;
