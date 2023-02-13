import React from "react";
import Image from "antd/lib/image";

const ComingSoon = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <span className="primary_color fowe900 text16">Coming soon!</span>
      <Image
        src="/under_construction.svg"
        alt=""
        width="250px"
        height="200px"
        preview={false}
      />
    </div>
  );
};

export default ComingSoon;
