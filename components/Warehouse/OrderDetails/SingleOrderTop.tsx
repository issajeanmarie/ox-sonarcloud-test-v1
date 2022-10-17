/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Image as AntDImage } from "antd";
import React, { FC, useState } from "react";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import { useCancelSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import ActionModal from "../../Shared/ActionModal";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";

type SingleOrderTopTypes = {
  sale: any;
  isSaleLoading: boolean;
};

const SingleOrderTop: FC<SingleOrderTopTypes> = ({ sale, isSaleLoading }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [cancelSale, { isLoading: isCancelingSale }] = useCancelSaleMutation();

  const showModal: any = () => {
    setIsModalVisible(true);
  };

  const handleCancelSale = () => {
    cancelSale({
      id: sale?.id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
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
          {isSaleLoading ? (
            <span>...</span>
          ) : (
            <>
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
              <span className="text-gray-400">{sale?.transportOrder?.id}</span>
            </>
          )}
        </div>
      </Col>
      <Col className="flex gap-8 items-center">
        {isSaleLoading ? (
          <span>...</span>
        ) : (
          <>
            <AntDImage
              className="pointer"
              src="/icons/ic-contact-edit.svg"
              alt="Backspace icon"
              width={18}
              height={18}
              preview={false}
            />
            {sale?.status !== "CANCELLED" && (
              <AntDImage
                className="pointer"
                onClick={() => showModal()}
                src="/icons/close.png"
                alt=""
                width={22}
                height={22}
                preview={false}
              />
            )}
          </>
        )}
      </Col>
      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleCancelSale()}
        loading={isCancelingSale}
      />
    </Row>
  );
};

export default SingleOrderTop;
