import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "antd/lib/image";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#E3B221" }} spin />
);

export const AppLoadingLoader = () => {
  const spinIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "#E3B221" }} spin />
  );
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Image
        src="/logo.png"
        alt=""
        className="mabo16"
        preview={false}
        height={96}
      />
      <br />
      <div style={{ marginTop: "2em" }}>
        <Spin indicator={spinIcon} />
      </div>
    </div>
  );
};

export const ComponentLoadingLoader = () => {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin indicator={loadingIcon} />
    </div>
  );
};
