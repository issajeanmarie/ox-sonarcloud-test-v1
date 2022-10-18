/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row, Select } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import Image from "next/image";
import { AddStockTypes } from "../../../../lib/types/warehouse";
import { localeString } from "../../../../utils/numberFormatter";

const { Option } = Select;

const AddStock: FC<AddStockTypes> = ({
  onAddStockFinish,
  form,
  isAddingStock,
  categories,
  isCategoriesLoading,
  orders,
  isOrdersLoading,
  depots,
  isDepotsLoading,
  isSuppliersLoading,
  suppliers
}) => {
  const filteredResult = suppliers?.payload?.content?.filter(
    (item: any) => item.enabled
  );

  return (
    <Form
      form={form}
      onFinish={onAddStockFinish}
      name="AddStock"
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
            name="supplierId"
            type="select"
            placeholder="Select supplier name"
            label="Supplier"
            isLoading={isSuppliersLoading}
            disabled={isSuppliersLoading}
            isGroupDropdown
            rules={requiredInput}
          >
            {filteredResult.map((item: any) => (
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
        className="mt-6"
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <div className="mb-6">
            <span className="font-light">Item info</span>
          </div>
          <Input
            name="categoryId"
            type="select"
            placeholder="Select category"
            label="Category"
            isLoading={isCategoriesLoading}
            disabled={isCategoriesLoading}
            isGroupDropdown
          >
            {categories?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Input>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="SubCategory"
            type="select"
            placeholder="Select category"
            label="Sub-Category"
            isLoading={isCategoriesLoading}
            disabled={isCategoriesLoading}
            isGroupDropdown
          >
            {categories?.map((item: any) => (
              <>
                {item?.subCategories?.map((sub: any) => (
                  <Option key={sub?.id} value={sub?.id}>
                    {sub?.name}
                  </Option>
                ))}
              </>
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
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <Input
            name="weight"
            type="text"
            label="KGs"
            placeholder="Enter the KGs"
          />
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <Input
            name="unitCost"
            type="text"
            label="Unit cost"
            placeholder="Amount"
          />
        </Col>
        <Col flex="auto">
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
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className="mb-2">
            <span className="font-light">Transport</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="depotId"
            type="select"
            placeholder="Select depot"
            label="Select depot"
            isLoading={isDepotsLoading}
            disabled={isDepotsLoading}
            isGroupDropdown
          >
            {depots?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Input>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="lhsOrderId"
            type="select"
            placeholder="Select LHS order"
            label="Select LHS order"
            isLoading={isOrdersLoading}
            disabled={isOrdersLoading}
            isGroupDropdown
          >
            {orders?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {localeString(item?.weight)} KGs -{" "}
                {localeString(item.totalAmount)} Rwf
              </Option>
            ))}
          </Input>
        </Col>
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button loading={isAddingStock} type="primary" htmlType="submit">
            ADD STOCK ITEM
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddStock;
