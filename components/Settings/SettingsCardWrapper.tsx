import { Card } from "antd";
import React, { FC } from "react";
import { SettingsCardWrapperProps } from "../../lib/types/pageTypes/Settings/SettingsCardWrapperProps";

const SettingsCardWrapper: FC<SettingsCardWrapperProps> = ({ children }) => {
  return (
    <Card
      className="radius2 noborder"
      headStyle={{ border: "none", marginBottom: "0" }}
      style={{ padding: "30px", borderRadius: "4px", marginBottom: "1rem" }}
    >
      {children}
    </Card>
  );
};

export default SettingsCardWrapper;
