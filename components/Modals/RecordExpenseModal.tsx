import { Col, Form, Image, Row } from "antd";
import Typography from "antd/lib/typography";
import { ReloadOutlined } from "@ant-design/icons";
import React, { FC, useState, useEffect } from "react";
import moment from "moment";
import { requiredField } from "../../lib/validation/InputValidations";
import Input from "../Shared/Input";
import { RecordExpenseTypes } from "../../lib/types/pageTypes/Expenses/RecordExpenseTypes";
import { useDepotsQuery } from "../../lib/api/endpoints/Depots/depotEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import FilePreview from "../Shared/FilePreview";
import FileUploader from "../Shared/FileUploader";
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
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";

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
  const [attachmentUrl, setAttachmentUrl] = useState<File | string | null>(
    null
  );
  const [hasNoEbm, setHasNoEbm] = useState(false);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);

  const watchqQbSupplierId = Form.useWatch("qbSupplierId", form);
  const dispatch = useDispatch();

  const { data: depotsData, isLoading: depotsLoading } = useDepotsQuery();
  const {
    data: suppliersData,
    isLoading: suppliersLoading,
    isFetching: suppliersFetching,
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

  const supplierFromQB = (): { label: string; value: string } | undefined => {
    return suppliers?.find((el: any) => el.value === watchqQbSupplierId);
  };

  if (
    (suppliersError as any)?.status === 401 ||
    ((suppliersError as any)?.data?.message &&
      ((suppliersError as any).data.message.indexOf("Token expired") !== -1 ||
        (suppliersError as any).data.message.indexOf("Token revoked") !==
          -1)) ||
    (trucksError as any)?.status === 401 ||
    ((trucksError as any)?.data?.message &&
      ((trucksError as any).data.message.indexOf("Token expired") !== -1 ||
        (trucksError as any).data.message.indexOf("Token revoked") !== -1)) ||
    (locationsError as any)?.status === 401 ||
    ((locationsError as any)?.data?.message &&
      ((locationsError as any).data.message.indexOf("Token expired") !== -1 ||
        (locationsError as any).data.message.indexOf("Token revoked") !==
          -1)) ||
    (paymentMethodsError as any)?.status === 401 ||
    ((paymentMethodsError as any)?.data?.message &&
      ((paymentMethodsError as any).data.message.indexOf("Token expired") !==
        -1 ||
        (paymentMethodsError as any).data.message.indexOf("Token revoked") !==
          -1)) ||
    (accountsError as any)?.status === 401 ||
    ((accountsError as any)?.data?.message &&
      ((accountsError as any).data.message.indexOf("Token expired") !== -1 ||
        (accountsError as any).data.message.indexOf("Token revoked") !== -1)) ||
    (categoriesError as any)?.status === 401 ||
    ((categoriesError as any)?.data?.message &&
      (categoriesError as any).data.message.indexOf("Token expired") !== -1)
  ) {
    onQBAuthFailure();
  } else if (
    suppliersError ||
    trucksError ||
    locationsError ||
    paymentMethodsError ||
    accountsError ||
    categoriesError
  ) {
    ErrorMessage("Something went wrong!");
  }

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

  const onAttachmentChange = (files: File[]) => {
    setAttachmentUrl(files[0]);
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

    const qbSupplier = supplierFromQB();
    const formData = new FormData();
    Object.keys(values).forEach((key: any) => {
      if (values[key]) {
        if (key === "date") {
          formData.append(key, moment(values[key]).format("YYYY-MM-DD"));
          return;
        }
        // Check if supplier is from Quickbooks
        if (key === "qbSupplierId" && qbSupplier?.value) {
          formData.append("qbSupplierId", qbSupplier.value);
          return;
        }
        formData.append(key, values[key]);
      }
    });
    // if supply is not from Quickbooks, send value entered in supplier field
    formData.append(
      "qbSupplierName",
      qbSupplier?.label || values.qbSupplierId || ""
    );
    formData.append(
      "qbTruckName",
      trucks.find((el: any) => el.value === values.qbTruckId)?.label || ""
    );
    formData.append(
      "qbLocationName",
      locations.find((el: any) => el.value === values.qbLocationId)?.label
    );
    formData.append(
      "qbPaymentMethodName",
      paymentMethods.find((el: any) => el.value === values.qbPaymentMethodId)
        ?.label || ""
    );
    formData.append(
      "qbAccountName",
      accounts.find((el: any) => el.value === values.qbAccountId)?.label || ""
    );
    formData.append(
      "qbCategoryName",
      accounts.find((el: any) => el.value === values.qbCategoryId)?.label || ""
    );
    formData.append("hasEbm", `${!hasNoEbm}`);
    if (typeof attachmentUrl !== "string") {
      formData.append("file", attachmentUrl);
    }

    if (isEdit) {
      handleAPIRequests({
        request: editExpense,
        handleSuccess: handleEditExpenseSuccess,
        showSuccess: true,
        id: editExpenseData?.id,
        formData
      });
      return;
    }

    handleAPIRequests({
      request: recordExpense,
      handleSuccess: handleRecordExpenseSuccess,
      showSuccess: true,
      formData
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
                watchqQbSupplierId && !supplierFromQB()
                  ? "bordered_input border-[#ed7818]"
                  : ""
              }
              label={
                <div className="flex items-center justify-between">
                  Supplier *
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center"
                    title="Refresh suppliers"
                    onClick={refetchSuppliers}
                    disabled={suppliersFetching}
                  >
                    <ReloadOutlined
                      className="text-sm text-ox-red"
                      spin={suppliersFetching}
                    />
                  </button>
                </div>
              }
              help={
                watchqQbSupplierId &&
                !supplierFromQB() && (
                  <span className="ant-form-item-explain-error orage">
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
                  typeof attachmentUrl === "string"
                    ? attachmentUrl.split("/")[
                        attachmentUrl.split("/").length - 1
                      ]
                    : attachmentUrl.name
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
              uploadFile={false}
              onFileChange={onAttachmentChange}
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
            {attachmentError && (
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
