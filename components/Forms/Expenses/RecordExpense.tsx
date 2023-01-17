import { Col, Form, Image, Row } from "antd";
import Typography from "antd/lib/typography";
import React, { FC, useState, useEffect } from "react";
import { requiredField } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import { RecordExpenseTypes } from "../../../lib/types/pageTypes/Expenses/RecordExpenseTypes";
import { ECONOMIC_STATUS } from "../../../config/constants";
import { useDepotsQuery } from "../../../lib/api/endpoints/Depots/depotEndpoints";
import { useLazyGetTrucksQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { TruckSchema } from "../../../lib/types/trucksTypes";
import FilePreview from "../../Shared/FilePreview";
import FileUploader from "../../Shared/FileUploader";
import moment from "moment";

const { Text } = Typography;

const RecordExpense: FC<RecordExpenseTypes> = ({
  onRecordExpenseFinish,
  editExpenseData
}) => {
  const [form] = Form.useForm();
  const [attachment, setAttachment] = useState<string | null>(null);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const [, setUploadFailure] = useState(null);
  const [, setUploadSuccess] = useState(false);
  const { data: depotsData } = useDepotsQuery();
  const [getTrucks, { data: trucksData, isLoading: trucksLoading }] =
    useLazyGetTrucksQuery();

  const depots = depotsData?.payload?.map((depot) => ({
    label: `${depot.name}`,
    value: depot.id
  }));
  const trucks = trucksData?.payload?.map((truck: TruckSchema) => ({
    label: `${truck.plateNumber}`,
    value: truck.id
  }));

  useEffect(() => {
    handleAPIRequests({
      request: getTrucks,
      page: 0,
      noPagination: true,
      showFailure: true
    });
  }, [getTrucks]);

  useEffect(() => {
    if (editExpenseData) {
      form.setFieldsValue({
        id: editExpenseData.id,
        depot: editExpenseData.depot,
        supplier: editExpenseData.supplier,
        payee: editExpenseData.payee,
        truck: editExpenseData.truck,
        date: moment(editExpenseData.createdAt),
        amount: editExpenseData.amount,
        attachment: editExpenseData.attachment
      });
      if (editExpenseData.attachment) {
        setAttachment(editExpenseData.attachment);
      }
    }

    return () => {
      form.resetFields();
      if (attachment) {
        setAttachment(null);
      }
    };
  }, [editExpenseData, form]);

  return (
    <Form
      onFinish={onRecordExpenseFinish}
      form={form}
      name="ReacordExpense"
      layout="vertical"
      title=""
      id="ReacordExpense"
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            type="select"
            name="depot"
            label="Depot"
            placeholder="Select depot"
            rules={requiredField("Depot")}
            options={depots}
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            type="date"
            name="date"
            label="Date"
            rules={requiredField("Date")}
            options={[{ label: "RTC", value: 1 }]}
            suffixIcon={
              <Image
                src="/icons/ic-actions-calendar.svg"
                alt="Calendar icon"
                width={18}
                height={18}
              />
            }
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            type="select"
            name="supplier"
            label="Supplier"
            rules={requiredField("Supplier")}
            placeholder="Select the name of the business that was paid"
            options={ECONOMIC_STATUS}
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            type="select"
            name="payee"
            label="Payee"
            rules={requiredField("Payee")}
            placeholder="Select the actual name of the person who was paid"
            options={ECONOMIC_STATUS}
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            type="select"
            name="truck"
            label="Select truck"
            placeholder="No truck"
            rules={requiredField("Truck")}
            options={trucks}
            isLoading={trucksLoading}
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            type="text"
            name="amount"
            label="Amount"
            placeholder="00"
            rules={requiredField("Amount")}
            suffixIcon={<Text className="normalText">Rwf</Text>}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            type="text_area"
            name="description"
            label="Description"
            placeholder="Description"
          />
        </Col>
      </Row>

      <Row className="mt-8">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <span className="font-light">Attach a supporting document</span>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="space-between" className="mt-6">
        <Col xs={24} sm={24} md={15}>
          {attachment && (
            <FilePreview
              fileName={attachment.split("/")[attachment.split("/").length - 1]}
              onClick={() => setAttachment(null)}
              suffixIcon={
                <Image
                  src="/icons/close_black_24dp.svg"
                  alt=""
                  width={24}
                  preview={false}
                />
              }
            />
          )}
        </Col>
        <Col flex="none">
          <FileUploader
            uploadLoading={isUploadingAttachment}
            setUploadedPicInfo={setAttachment}
            setUploadLoading={setIsUploadingAttachment}
            setUploadSuccess={setUploadSuccess}
            setUploadFailure={setUploadFailure}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default RecordExpense;
