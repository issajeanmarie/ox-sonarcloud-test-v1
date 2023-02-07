import { Col, Form, Image, Row } from "antd";
import Typography from "antd/lib/typography";
import React, { FC, useState, useEffect } from "react";
import { requiredField } from "../../lib/validation/InputValidations";
import Input from "../Shared/Input";
import { RecordExpenseTypes } from "../../lib/types/pageTypes/Expenses/RecordExpenseTypes";
import { useDepotsQuery } from "../../lib/api/endpoints/Depots/depotEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import FilePreview from "../Shared/FilePreview";
import FileUploader from "../Shared/FileUploader";
import moment from "moment";
import {
  useAccountsQuery,
  useCategoriesQuery,
  useEditExpenseMutation,
  useLocationsQuery,
  usePaymentMethodsQuery,
  usePostExpenseMutation,
  useSuppliersQuery,
  useTrucksQuery
} from "../../lib/api/endpoints/Expenses/expensesEndpoint";
import Button from "../Shared/Button";
import CircleCheckbox from "../Shared/Custom/CircleCheckbox";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";
import ModalWrapper from "../Modals/ModalWrapper";
import { QB_PAYMENT_TYPES } from "../../config/constants";
import { QBSchema } from "../../lib/types/expenses";
import { userType } from "../../helpers/getLoggedInUser";
import ExtendableSelect from "../Shared/Input/ExtendableSelect";
import { ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

const RecordExpenseModal: FC<RecordExpenseTypes> = ({
  isModalVisible,
  setIsModalVisible,
  onRecordExpenseFinish,
  onEditExpenseFinish,
  isEdit = false,
  editExpenseData,
  onCancel,
  onQBAuthFailure
}) => {
  const [form] = Form.useForm();
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const [hasNoEbm, setHasNoEbm] = useState(false);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [uploadFailure, setUploadFailure] = useState(null);

  const dispatch = useDispatch();

  const { data: depotsData, isLoading: depotsLoading } = useDepotsQuery();
  const {
    data: suppliersData,
    isLoading: suppliersLoading,
    error: suppliersError,
    refetch: refetchSuppliers
  } = useSuppliersQuery();
  const {
    data: trucksData,
    isLoading: trucksLoading,
    error: trucksError
  } = useTrucksQuery();
  const {
    data: locationsData,
    isLoading: locationsLoading,
    error: locationsError
  } = useLocationsQuery();
  const {
    data: paymentMethodsData,
    isLoading: paymentMethodsLoading,
    error: paymentMethodsError
  } = usePaymentMethodsQuery();
  const {
    data: accountsData,
    isLoading: accountsLoading,
    error: accountsError
  } = useAccountsQuery();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useCategoriesQuery();
  const [recordExpense, { isLoading: isRecordLoading }] =
    usePostExpenseMutation();
  const [editExpense, { isLoading: isEditLoading }] = useEditExpenseMutation();

  const depots = depotsData?.payload?.map((depot) => ({
    label: depot.name,
    value: depot.id
  }));

  const suppliers = suppliersData?.payload?.map((supplier: QBSchema) => ({
    label: supplier.Name,
    value: supplier.Id
  }));

  const trucks = trucksData?.payload?.map((truck: QBSchema) => ({
    label: truck.Name,
    value: truck.Id
  }));

  const locations = locationsData?.payload?.map((location: QBSchema) => ({
    label: location.Name,
    value: location.Id
  }));

  const paymentMethods = paymentMethodsData?.payload?.map(
    (paymentMethod: QBSchema) => ({
      label: paymentMethod.Name,
      value: paymentMethod.Id
    })
  );

  const accounts = accountsData?.payload?.map((account: QBSchema) => ({
    label: account.Name,
    value: account.Id
  }));

  const categories = categoriesData?.payload?.map((category: QBSchema) => ({
    label: category.Name,
    value: category.Id
  }));

  if (
    (suppliersError as any)?.status === 401 ||
    // (suppliersError as any)?.message?.indexOf("Token expired") !== -1 ||
    (trucksError as any)?.status === 401 ||
    // (trucksError as any)?.message?.indexOf("Token expired") !== -1 ||
    (locationsError as any)?.status === 401 ||
    // (locationsError as any)?.message?.indexOf("Token expired") !== -1 ||
    (paymentMethodsError as any)?.status === 401 ||
    // (paymentMethodsError as any)?.message?.indexOf("Token expired") !== -1 ||
    (accountsError as any)?.status === 401 ||
    // (accountsError as any)?.message?.indexOf("Token expired") !== -1 ||
    (categoriesError as any)?.status === 401
    // (categoriesError as any)?.message?.indexOf("Token expired") !== -1
  ) {
    onQBAuthFailure();
  }

  const setUploadSuccess = () => {
    setAttachmentError(null);
  };

  useEffect(() => {
    if (isEdit && editExpenseData) {
      form.setFieldsValue({
        ...editExpenseData,
        depotId: editExpenseData.depot.id,
        date: moment(editExpenseData.date),
        qbSupplierId:
          editExpenseData.qbSupplierId || editExpenseData.qbSupplierName
      });
      if (editExpenseData.attachmentUrl) {
        setAttachmentUrl(editExpenseData.attachmentUrl);
      }
      if (typeof editExpenseData.hasEbm === "boolean") {
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

  const handleCancel = () => {
    form.resetFields();
    if (attachmentUrl) {
      setAttachmentUrl(null);
    }
    if (hasNoEbm) {
      setHasNoEbm(false);
    }
    setIsModalVisible(false);
    onCancel && onCancel();
  };

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
    if (!attachmentUrl) {
      setAttachmentError("Supporting document is required");
      return;
    }

    const payload = {
      ...values,
      qbSupplierId: !isNaN(Number(values.qbSupplierId))
        ? values.qbSupplierId
        : null,
      qbSupplierName: !isNaN(Number(values.qbSupplierId))
        ? suppliers.find((el: any) => el.value === values.qbSupplierId)?.label
        : values.qbSupplierId || "",
      qbTruckName:
        trucks.find((el: any) => el.value === values.qbTruckId)?.label || "",
      qbLocationName:
        locations.find((el: any) => el.value === values.qbLocationId)?.label ||
        "",
      qbPaymentMethodName:
        paymentMethods.find((el: any) => el.value === values.qbPaymentMethodId)
          ?.label || "",
      qbAccountName:
        accounts.find((el: any) => el.value === values.qbAccountId)?.label ||
        "",
      qbCategoryName:
        accounts.find((el: any) => el.value === values.qbCategoryId)?.label ||
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
      onCancel={handleCancel}
      title="RECORD EXPENSE"
      loading={isRecordLoading || isEditLoading}
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
              label="Depot *"
              placeholder="Select depot"
              rules={requiredField("Depot")}
              options={depots}
              isLoading={depotsLoading}
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
              label="Date *"
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
            <ExtendableSelect
              type="select"
              name="qbSupplierId"
              rules={requiredField("Supplier")}
              placeholder="Select the name of the business that was paid"
              options={suppliers}
              isLoading={suppliersLoading}
              className={
                editExpenseData && !editExpenseData.qbSupplierId
                  ? "bordered_input border-[#dc0000]"
                  : ""
              }
              label={
                <div className="flex items-center justify-between">
                  Supplier *
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center"
                    onClick={refetchSuppliers}
                    title="Refresh suppliers"
                  >
                    <ReloadOutlined
                      className="text-sm text-ox-red"
                      spin={suppliersLoading}
                    />
                  </button>
                </div>
              }
              help={
                editExpenseData &&
                !editExpenseData.qbSupplierId && (
                  <span className="ant-form-item-explain-error">
                    This supplier is not present in the Quickbooks
                  </span>
                )
              }
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
              label="Amount *"
              placeholder="00"
              rules={requiredField("Amount")}
              suffixIcon={<Text className="normalText">Rwf</Text>}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Input
              type="select"
              name="qbTruckId"
              label="Select truck *"
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
              name="qbLocationId"
              label="Location *"
              placeholder="Select location"
              rules={requiredField("Category")}
              options={locations}
              isLoading={locationsLoading}
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
              label="Description *"
              placeholder="Description"
              rules={requiredField("Description")}
            />
          </Col>
        </Row>

        <Row className="mt-8 mb-6">
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <span className="font-light">Attach a supporting document</span>
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="space-between">
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
              setUploadLoading={setIsUploadingAttachment}
              setUploadedPicInfo={setAttachmentUrl}
              setUploadSuccess={setUploadSuccess}
              setUploadFailure={setUploadFailure}
              validations={[
                ".pdf",
                "image/*",
                ".doc",
                ".docx",
                ".xml",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={24}>
            {(attachmentError || uploadFailure) && (
              <div className="ant-form-item-explain ant-form-item-explain-connected">
                <span role="alert" className="ant-form-item-explain-error">
                  Supporting document is required
                </span>
              </div>
            )}
          </Col>
        </Row>

        {(userType().isAdmin || userType().isSuperAdmin) && (
          <>
            <Row className="mt-8 mb-6">
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <span className="font-light">For Accountants</span>
              </Col>
            </Row>

            <Row justify="space-between" gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Input
                  type="select"
                  name="qbPaymentMethodId"
                  label="Payment method"
                  placeholder="What did you pay with"
                  options={paymentMethods}
                  isLoading={paymentMethodsLoading}
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
                  placeholder="Cash on hand"
                  options={accounts}
                  isLoading={accountsLoading}
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
                  options={categories}
                  isLoading={categoriesLoading}
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
            </Row>
          </>
        )}
      </Form>
    </ModalWrapper>
  );
};

export default RecordExpenseModal;
