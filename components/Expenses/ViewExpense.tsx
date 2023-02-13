import { Col, Image, Row } from "antd";
import Typography from "antd/lib/typography";
import React, { FC } from "react";
import FilePreview from "../Shared/FilePreview";
import { ViewExpenseTypes } from "../../lib/types/pageTypes/Expenses/ViewExpenseTypes";
import { dateFormatter } from "../../utils/dateFormatter";
import { abbreviateNumber } from "../../utils/numberFormatter";

const { Text } = Typography;

const ViewExpense: FC<ViewExpenseTypes> = ({ expense }) => {
  const handleDownloadFile = (link: string) => {
    if (window) {
      window.open(link, "_blank", "noreferrer");
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
            <span className="ant-form-item-explain-error">
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
          {expense.attachmentUrl && (
            <FilePreview
              fileName={
                expense.attachmentUrl.split("/")[
                  expense.attachmentUrl.split("/").length - 1
                ]
              }
              onClick={() => handleDownloadFile(expense.attachmentUrl)}
              suffixIcon={
                <Image
                  src="/icons/download_2.svg"
                  alt=""
                  width={14}
                  preview={false}
                />
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
