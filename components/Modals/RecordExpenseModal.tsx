import { Col, Form, Image, Row } from "antd";
import Typography from "antd/lib/typography";
import React, { FC, useState, useEffect } from "react";
import { requiredField } from "../../lib/validation/InputValidations";
import Input from "../Shared/Input";
import { RecordExpenseTypes } from "../../lib/types/pageTypes/Expenses/RecordExpenseTypes";
import { useDepotsQuery } from "../../lib/api/endpoints/Depots/depotEndpoints";
import { useLazyGetTrucksQuery } from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { TruckSchema } from "../../lib/types/trucksTypes";
import FilePreview from "../Shared/FilePreview";
import FileUploader from "../Shared/FileUploader";
import moment from "moment";
import {
  useEditExpenseMutation,
  usePostExpenseMutation
} from "../../lib/api/endpoints/Expenses/expensesEndpoint";
import Button from "../Shared/Button";
import CircleCheckbox from "../Shared/Custom/CircleCheckbox";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";
import ModalWrapper from "../Modals/ModalWrapper";
import { QB_PAYMENT_TYPES } from "../../config/constants";

const { Text } = Typography;

const RecordExpenseModal: FC<RecordExpenseTypes> = ({
  isModalVisible,
  setIsModalVisible,
  onRecordExpenseFinish,
  onEditExpenseFinish,
  isEdit = false,
  editExpenseData
}) => {
  const [form] = Form.useForm();
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const [hasNoEbm, setHasNoEbm] = useState(false);
  const [, setUploadFailure] = useState(null);
  const [, setUploadSuccess] = useState(false);

  const dispatch = useDispatch();

  const { data: depotsData } = useDepotsQuery();
  const [getTrucks, { data: trucksData, isLoading: trucksLoading }] =
    useLazyGetTrucksQuery();
  const [recordExpense, { isLoading: isRecordLoading }] =
    usePostExpenseMutation();
  const [editExpense, { isLoading: isEditLoading }] = useEditExpenseMutation();

  const depots = depotsData?.payload?.map((depot) => ({
    label: `${depot.name}`,
    value: depot.id
  }));

  const trucks = trucksData?.payload?.map((truck: TruckSchema) => ({
    label: `${truck.plateNumber}`,
    value: truck.id
  }));

  const accounts = [
    { label: "MOMO", value: "1" },
    { label: "Cash on hand", value: "2" }
  ];

  const paymentMethods = [
    { label: "MOMO", value: "1" },
    { label: "Cash on hand", value: "2" }
  ];
  const suppliers = [
    { label: "Elvis Rugamba", value: "1" },
    { label: "Brian Gitego", value: "2" }
  ];
  const categories = [
    { label: "Cat 1", value: "1" },
    { label: "Cat 2", value: "2" }
  ];

  useEffect(() => {
    handleAPIRequests({
      request: getTrucks,
      page: 0,
      noPagination: true,
      showFailure: true
    });
  }, [getTrucks]);

  useEffect(() => {
    if (isEdit && editExpenseData) {
      form.setFieldsValue({
        ...editExpenseData,
        depotId: editExpenseData.depot.id,
        date: moment(editExpenseData.date)
      });
      if (editExpenseData.attachmentUrl) {
        setAttachmentUrl(editExpenseData.attachmentUrl);
      }
      if (editExpenseData.hasEbm) {
        setHasNoEbm(!editExpenseData.hasEbm);
      }
    }

    return () => {
      form.resetFields();
      if (attachmentUrl) {
        setAttachmentUrl(null);
      }
      if (hasNoEbm) {
        setHasNoEbm(false);
      }
    };
  }, [isEdit, editExpenseData, form]);

  const handleRecordExpenseSuccess = (res: any) => {
    form.resetFields();
    setAttachmentUrl(null);
    setHasNoEbm(false);
    dispatch(displayPaginatedData(res));
    onRecordExpenseFinish();
  };

  const handleEditExpenseSuccess = (res: any) => {
    form.resetFields();
    setAttachmentUrl(null);
    setHasNoEbm(false);
    onEditExpenseFinish(res);
  };

  const onRecordExpense = (values: any) => {
    const payload = {
      ...values,
      qbTruckName:
        trucks.find((el: any) => el.value === values.qbTruckId)?.label || "",
      qbSupplierName:
        suppliers.find((el: any) => el.value === values.qbSupplierId)?.label ||
        "",
      attachmentUrl,
      hasEbm: !hasNoEbm
    };

    if (isEdit) {
      handleAPIRequests({
        request: editExpense,
        handleSuccess: handleEditExpenseSuccess,
        showSuccess: true,
        id: editExpenseData?.id,
        ...payload
      });
      return;
    }

    handleAPIRequests({
      request: recordExpense,
      handleSuccess: handleRecordExpenseSuccess,
      showSuccess: true,
      ...payload
    });
  };

  return (
    <ModalWrapper
      setIsModalVisible={setIsModalVisible}
      isModalVisible={isModalVisible}
      title="NEW EXPENSE"
      loading={false}
      footerWidth={24}
      footerContent={
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col flex="none">
            <Row gutter={16} align="middle">
              <Col>
                <span className="heading2 underline">No EBM</span>
              </Col>

              <Col>
                <CircleCheckbox
                  defaultValue={false}
                  checked={hasNoEbm}
                  setState={setHasNoEbm}
                  state={hasNoEbm}
                />
              </Col>
            </Row>
          </Col>
          <Col flex="none">
            <Button
              type="primary"
              form="ReacordExpense"
              htmlType="submit"
              loading={isRecordLoading || isEditLoading}
            >
              {!isEdit ? "ADD EXPENSE" : "SAVE CHANGES"}
            </Button>
          </Col>
        </Row>
      }
    >
      <Form
        onFinish={onRecordExpense}
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
              name="depotId"
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

          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Input
              type="select"
              name="qbPaymentMethodId"
              label="Payment method"
              rules={requiredField("Payment method")}
              placeholder="What did you pay with"
              options={paymentMethods}
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
              name="qbPaymentType"
              label="Payment type"
              rules={requiredField("Payment type")}
              placeholder="Cash on hand"
              options={QB_PAYMENT_TYPES}
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
              name="qbAccountId"
              label="Payment account"
              rules={requiredField("Payment account")}
              placeholder="Cash on hand"
              options={accounts}
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

          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Input
              type="select"
              name="qbTruckId"
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
              type="select"
              name="qbCategoryId"
              label="Category"
              placeholder="Select category"
              rules={requiredField("Category")}
              options={categories}
              // isLoading={trucksLoading}
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
              name="qbSupplierId"
              label="Supplier"
              rules={requiredField("Supplier")}
              placeholder="Select the name of the business that was paid"
              options={suppliers}
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
              name="qbLocationId"
              label="Location"
              placeholder="Select location"
              rules={requiredField("Category")}
              options={categories}
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
              type="text_area"
              name="description"
              label="Description"
              placeholder="Description"
              rules={requiredField("Description")}
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
            {attachmentUrl && (
              <FilePreview
                fileName={
                  attachmentUrl.split("/")[attachmentUrl.split("/").length - 1]
                }
                onClick={() => setAttachmentUrl(null)}
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
              setUploadedPicInfo={setAttachmentUrl}
              setUploadLoading={setIsUploadingAttachment}
              setUploadSuccess={setUploadSuccess}
              setUploadFailure={setUploadFailure}
            />
          </Col>
        </Row>
      </Form>
    </ModalWrapper>
  );
};

export default RecordExpenseModal;
