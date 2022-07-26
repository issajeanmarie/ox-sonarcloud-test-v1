import React from "react";
import Image from "next/image";

export const AppLoadingLoader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Image
        src="/oxloader.png"
        alt=""
        width="80px"
        height="80px"
        className="animate-spin duration-1000"
      />
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
        alignItems: "center"
      }}
    >
      <Image
        src="/oxloader.png"
        alt=""
        width="80px"
        height="80px"
        className="animate-spin duration-1000"
      />
    </div>
  );
};
