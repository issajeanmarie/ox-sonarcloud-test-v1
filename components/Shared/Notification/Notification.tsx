import { CheckCircleTwoTone } from "@ant-design/icons";
import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification";
import React, { useEffect } from "react";

const Context = React.createContext({ name: "Default" });

type Types = {
  notify: boolean;
  textMessage: string;
  description: string;
  endNotification: any;
};

const Notification: React.FC<Types> = ({
  notify,
  description,
  textMessage,
  endNotification
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: (
        <span className="font-bold">{textMessage || "Notification!"}</span>
      ),
      description: (
        <span className="text-sm font-normal opacity-50 italic">
          {description}
        </span>
      ),
      placement,
      icon: (
        <CheckCircleTwoTone
          className="text-[32px] mx-auto text-center"
          twoToneColor="#E7B522"
        />
      ),
      duration: 30
    });
  };

  useEffect(() => {
    if (notify) {
      openNotification("bottomRight");
      endNotification({
        message: "",
        amount: 0
      });
    }
  }, [notify]);

  return (
    <Context.Provider value={{ name: "Ant Design" }}>
      {contextHolder}
    </Context.Provider>
  );
};

export default Notification;
