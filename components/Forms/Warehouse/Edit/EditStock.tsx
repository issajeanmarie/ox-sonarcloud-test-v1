/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row, Select } from "antd";
import React, { FC } from "react";
import Input from "../../../Shared/Input";
import Image from "next/image";
import { EditStockTypes } from "../../../../lib/types/warehouse";
import moment from "moment";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { localeString } from "../../../../utils/numberFormatter";

const { Option } = Select;

const EditStock: FC<EditStockTypes> = ({
  onEditStockFinish,
  form,
  isDepotsLoading,
  isSuppliersLoading,
  suppliers,
  lhsOrders
}) => {
  const filteredResult = suppliers?.payload?.content?.filter(
    (item: any) => item.enabled
  );

  const [parentCategoryChange, setParentCategory] = useState(
    itemToEdit?.category?.parentCategory?.id
  );

  const onParentCategoryChange = (value: any) => {
    setParentCategory(value);
    form.setFieldsValue({ SubCategory: "" });
  };

  return (
    <Form
      form={form}
      onFinish={onEditStockFinish}
      name="EditStock"
      id="EditStock"
      layout="vertical"
      title=""
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="inDate"
            type="date"
            label="Date"
            suffixIcon={
              <Image
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
                height={18}
              />
            }
            rules={[{ required: true, message: "Select date" }]}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            defaultValue={itemToEdit?.supplierName}
            name="supplierId"
            type="select"
            placeholder="Select supplier name"
            label="Supplier"
            isLoading={isSuppliersLoading}
            disabled={isSuppliersLoading}
            isGroupDropdown
            rules={requiredField("Supplier")}
          >
            {filteredResult?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {item?.names}
              </Option>
            ))}
          </Input>
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={[16, 16]}
        align="bottom"
        className="mt-4"
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="weight"
            type="text"
            label="KGs"
            placeholder="Enter the KGs"
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="expiryDate"
            type="date"
            label="Expiry date"
            suffixIcon={
              <Image
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
                height={18}
              />
            }
            rules={[{ required: true, message: "Select date" }]}
          />
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={[16, 16]}
        align="bottom"
        className="mt-6"
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="unitBuyingPrice"
            type="text"
            label="Unit buying price"
            placeholder="Amount"
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="unitSellingPrice"
            type="text"
            label="Unit selling price"
            placeholder="Amount"
          />
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={[16, 16]}
        align="bottom"
        className="mt-6"
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className="mb-2">
            <span className="font-light">Transport</span>
          </div>
        </Col>

        <Col span={24}>
          <Input
            name="lhsOrderId"
            type="select"
            placeholder="Select LHS order"
            label="Select LHS order"
            isLoading={isDepotsLoading}
            disabled={isDepotsLoading}
            isGroupDropdown
            defaultValue={itemToEdit?.lhsOrder?.id}
          >
            {lhsOrders?.map((item: any) => (
              <Option key={item?.weight} value={item?.id}>
                {`${localeString(item.weight)} KGs - ${localeString(
                  item.totalAmount
                )} Rwf - `}{" "}
                <span className="captionText italic">
                  {moment(item.stateDateTime).format("ddd/MM/YYYY")}
                </span>
              </Option>
            ))} */}
          </Input>
        </Col>
      </Row>
    </Form>
  );
};

export default EditStock;
