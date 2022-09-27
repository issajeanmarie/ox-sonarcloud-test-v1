/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Image as AntDImage } from "antd";
import React, { useState } from "react";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import ActionModal from "../../Shared/ActionModal";

const SingleOrderTop = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal: any = () => {
    setIsModalVisible(true);
  };

  const handleDeleteOrder = () => {
    setIsModalVisible(false);
  };

  return (
    <Row
      style={{ background: "#fcfcfc" }}
      className="w-full shadow-[0px_-6px_24px_#0000001A] px-5 py-4 sticky top-0 z-50 flex justify-between items-center"
    >
      <Col
        onClick={() => changeRoute(routes.Warehouse.url)}
        className="cursor-pointer"
      >
        <div className="flex items-center gap-4 ">
          <AntDImage
            className="pointer"
            src="/icons/keyboard_backspace_black_24dp.svg"
            alt=""
            width={20}
            height={20}
            preview={false}
          />
          <span className="heading2">Sales</span>
          <span className="normalText">/</span>
          <span className="text-gray-400">WH123456789</span>
        </div>
      </Col>
      <Col className="flex gap-8 items-center">
        <AntDImage
          className="pointer"
          src="/icons/ic-contact-edit.svg"
          alt="Backspace icon"
          width={18}
          height={18}
          preview={false}
        />
        <AntDImage
          className="pointer"
          onClick={() => showModal()}
          src="/icons/close.png"
          alt=""
          width={22}
          height={22}
          preview={false}
        />
      </Col>
      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteOrder()}
        loading={false}
      />
    </Row>
  );
};

export default SingleOrderTop;
