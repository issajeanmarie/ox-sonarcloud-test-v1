import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { BASE_API_WS_URL } from "../../config/constants";

export const useGlobalMoMoPaymentListener = ({
  setIsNotifyEnabled,
  setNotificationMessage
}: any) => {
  useEffect(() => {
    const onConnected = () => {
      client.subscribe("/topic/momo-pay", function (msg) {
        if (msg.body) {
          const jsonBody = JSON.parse(msg.body);
          if (jsonBody) {
            jsonBody?.payload && setIsNotifyEnabled(true);
            setNotificationMessage({
              message: jsonBody?.message,
              amount: jsonBody?.amount
            });
          }
        }
      });
    };

    const onDisconnected = () => {
      setIsNotifyEnabled(false);
    };

    const client = new Client({
      brokerURL: BASE_API_WS_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected
    });

    client.activate();
  }, []);

  return null;
};

export const usePaymentPageMoMoPaymentListener = ({
  setPaymentProgress,
  paymentProgress,
  setIsModalVisible
}: any) => {
  useEffect(() => {
    const onConnected = () => {
      client.subscribe("/topic/momo-pay", function (msg) {
        setPaymentProgress({ ...paymentProgress, initiated: true });

        if (msg.body) {
          const jsonBody = JSON.parse(msg.body);
          if (jsonBody) {
            setIsModalVisible(true);
            setPaymentProgress({
              ...paymentProgress,
              initiated: !jsonBody?.payload && true,
              payload: jsonBody?.payload,
              success: !!jsonBody?.payload
            });
          }
        }
      });
    };

    const onDisconnected = () => {
      setPaymentProgress({
        initiated: false,
        payload: null,
        success: false,
        disconnected: true
      });
    };

    const client = new Client({
      brokerURL: BASE_API_WS_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected
    });

    client.activate();
  }, []);

  return null;
};
