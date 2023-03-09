import { Col, Image, Row } from "antd";
import Typography from "antd/lib/typography";
import React, { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import FilePreview from "../Shared/FilePreview";
import { ViewExpenseTypes } from "../../lib/types/pageTypes/Expenses/ViewExpenseTypes";
import { dateFormatter } from "../../utils/dateFormatter";
import { abbreviateNumber } from "../../utils/numberFormatter";
import {
  useLazyDownloadFromQBQuery,
  useLazyDownloadFromServerQuery
} from "../../lib/api/endpoints/Expenses/expensesEndpoint";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { handleDownloadFile } from "../../utils/handleDownloadFile";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";

const { Text } = Typography;

const ViewExpense: FC<ViewExpenseTypes> = ({ expense, onQBAuthFailure }) => {
  const [downloadFromServer, { isLoading: isLoadingFromServer }] =
    useLazyDownloadFromServerQuery();
  const [downloadFromQB, { isLoading: isLoadingFromQB }] =
    useLazyDownloadFromQBQuery();

  const downloadFile = () => {
    if (expense.qbAttachableId && expense.qbAttachableFileName) {
      handleAPIRequests({
        request: downloadFromQB,
        handleSuccess: handleDownloadFromQBSuccess,
        handleFailure: handleDownloadFailure,
        showFailure: false,
        id: expense.id
      });
    } else {
      handleAPIRequests({
        request: downloadFromServer,
        handleSuccess: handleDownloadSuccess,
        handleFailure: handleDownloadFailure,
        showFailure: false,
        id: expense.id
      });
    }
  };

  const handleDownloadSuccess = (file: File) => {
    const name =
      expense.attachmentUrl.split("/")[
        expense.attachmentUrl.split("/").length - 1
      ];
    const fileFormat =
      expense.attachmentUrl.split(".")[
        expense.attachmentUrl.split(".").length - 1
      ];

    handleDownloadFile({
      file,
      name,
      fileFormat
    });
  };

  const handleDownloadFromQBSuccess = (res: any) => {
    if (window) {
      window.open(res?.payload, "_blank", "noreferrer");
    }
  };

  const handleDownloadFailure = (res: any) => {
    if (
      res?.status === 401 ||
      (res?.data?.message &&
        (res.data.message.indexOf("Access is denied") !== -1 ||
          res.data.message.indexOf("Token expired") !== -1 ||
          res.data.message.indexOf("Token revoked") !== -1))
    ) {
      onQBAuthFailure();
    } else {
      ErrorMessage(
        res?.data?.message || "No attachable found for this expense"
      );
    }
  };

  return (
    <div>
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Depot</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{expense.depot.name}</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Date</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{dateFormatter(expense.date)}</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Supplier</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{expense.qbSupplierName}</span>
          </div>
          {expense.qbSupplierName && !expense.qbSupplierId && (
            <span className="ant-form-item-explain-error orage">
              This supplier is not present in the Quickbooks
            </span>
          )}
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Amount</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>
              {expense.amount && abbreviateNumber(expense.amount) + " RWF"}
            </span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Truck</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{expense.qbTruckName}</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Location</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{expense.qbLocationName}</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Text className="heading2 mb-[8px]">Description</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm !h-28">
            <span>{expense.description}</span>
          </div>
        </Col>
      </Row>

      <Row className="mt-8 mb-6">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <span className="font-light">Attach a supporting document</span>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} sm={24} md={15}>
          {(expense.qbAttachableFileName || expense.attachmentUrl) && (
            <FilePreview
              fileName={
                expense.qbAttachableFileName ||
                expense.attachmentUrl.split("/")[
                  expense.attachmentUrl.split("/").length - 1
                ]
              }
              onClick={downloadFile}
              disabled={isLoadingFromServer || isLoadingFromQB}
              suffixIcon={
                isLoadingFromServer || isLoadingFromQB ? (
                  <LoadingOutlined width={14} className="text-sm text-ox-red" />
                ) : (
                  <Image
                    src={"/icons/download_2.svg"}
                    alt=""
                    width={14}
                    preview={false}
                  />
                )
              }
            />
          )}
        </Col>
      </Row>

      {!expense.hasEbm && (
        <Row className="mt-8 mb-6">
          <Col xs={24} sm={24} md={24}>
            <span className="text-sm text-ox-red font-bold">
              This expense has no EBM
            </span>
          </Col>
        </Row>
      )}

      <Row className="mt-8 mb-6">
        <Col xs={24} sm={24} md={24}>
          <span className="font-light">For Accounts</span>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Payment method</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{expense.qbPaymentMethodName}</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Payment type</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{expense.qbPaymentType}</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Payment account</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{expense.qbAccountName}</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Text className="heading2 mb-[8px]">Category</Text>
          <div className="my_input bg-ox-input-white flex items-center px-4 text-sm">
            <span>{expense.qbCategoryName}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ViewExpense;
