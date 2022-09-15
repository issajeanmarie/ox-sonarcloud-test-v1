/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Image as AntDImage } from "antd";
import React, { FC, SetStateAction, useState } from "react";
import { routes } from "../../../config/route-config";
import { changeRoute } from "../../../helpers/routesHandler";
import {
  useDeleteClientMutation,
  useLazyDownloadClientInvoiceQuery
} from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import { SingleClientTopTypes } from "../../../lib/types/pageTypes/Clients/SingleClientTopTypes";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import ActionModal from "../../Shared/ActionModal";
import { SmallSpinLoader } from "../../Shared/Loaders/Loaders";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";

const SingleClientTop: FC<SingleClientTopTypes> = ({
  client,
  isClientLoading,
  isClientFetching,
  router
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const showModal: any = () => {
    setIsModalVisible(true);
  };
  const [deleteClient, { isLoading: isDeletingClient }] =
    useDeleteClientMutation();

  const [downloadClientInvoice, { isLoading: isDownloadingInvoice }] =
    useLazyDownloadClientInvoiceQuery();

  const handleDeleteClient = () => {
    deleteClient({
      id: itemToDelete
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
        router.replace(routes.Clients.url);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const handleDownloadClientInvoice = () => {
    downloadClientInvoice({
      id: client?.id
    })
      .unwrap()
      .then((file: any) => {
        handleDownloadFile({ file, name: "Invoice", fileFormat: "PDF" });
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <Row
      style={{ background: "#fcfcfc" }}
      className="w-full shadow-[0px_-6px_24px_#0000001A] px-5 py-4 sticky top-0 z-50 flex justify-between items-center"
    >
      {isClientLoading || isClientFetching ? (
        <span className="text-gray-400">...</span>
      ) : (
        <>
          <Col
            onClick={() => changeRoute(routes.Clients.url)}
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
              <span className="heading2">Clients</span>
              <span className="normalText">/</span>
              <span className="text-gray-400">{client?.names}</span>
            </div>
          </Col>
          <Col className="flex gap-8 items-center">
            {isDownloadingInvoice ? (
              <SmallSpinLoader />
            ) : (
              <AntDImage
                onClick={() => handleDownloadClientInvoice()}
                className="pointer"
                src="/icons/receipt.png"
                alt="Backspace icon"
                width={18}
                height={18}
                preview={false}
              />
            )}

            <AntDImage
              className="pointer"
              src="/icons/ic-media-stop.svg"
              alt="Backspace icon"
              width={18}
              height={18}
              preview={false}
            />
            <AntDImage
              className="pointer"
              onClick={() => showModal(setItemToDelete(client?.id))}
              src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
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
            action={() => handleDeleteClient()}
            loading={isDeletingClient}
          />
        </>
      )}
    </Row>
  );
};

export default SingleClientTop;
