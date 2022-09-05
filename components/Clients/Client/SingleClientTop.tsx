import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";

const SingleClientTop = () => {
  return (
    <Row
      style={{ background: "#fcfcfc" }}
      className="w-full shadow-[0px_-6px_24px_#0000001A] px-5 py-4 sticky top-0 z-50 flex justify-between items-center"
    >
      <Col
        onClick={() => changeRoute(routes.Clients.url)}
        className="cursor-pointer"
      >
        <div className="flex items-center gap-4 ">
          <Image
            className="pointer"
            src="/icons/keyboard_backspace_black_24dp.svg"
            alt=""
            width={20}
            height={20}
          />
          <span className="heading2">Clients</span>
          <span className="normalText">/</span>
          <span className="text-gray-400">TWAGIRAYEZU Simeon</span>
        </div>
      </Col>
      <Col>
        <Image
          className="pointer"
          src="/icons/receipt.png"
          alt="Backspace icon"
          width={18}
          height={18}
        />
      </Col>
    </Row>
  );
};

export default SingleClientTop;
