/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row, Select } from "antd";
import React, { FC, useState } from "react";
import { requiredInput } from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Image from "next/image";
import { EditStockTypes } from "../../../../lib/types/warehouse";

const { Option } = Select;

const EditStock: FC<EditStockTypes> = ({
  onEditStockFinish,
  form,
  categories,
  isCategoriesLoading,
  orders,
  isOrdersLoading,
  depots,
  isDepotsLoading,
  isSuppliersLoading,
  suppliers,
  itemToEdit
}) => {
  const filteredSuppliers = suppliers?.payload?.content?.filter(
    (supplier: any) => supplier.enabled
  );

  const [parentCategoryChange, setParentCategory] = useState(
    itemToEdit?.category?.parentCategory?.id
  );

  const onParentCategoryChange = (value: any) => {
    setParentCategory(value);
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
            name="supplierId"
            type="select"
            placeholder="Select supplier name"
            label="Supplier"
            isLoading={isSuppliersLoading}
            disabled={isSuppliersLoading}
            isGroupDropdown
            rules={requiredInput}
          >
            {filteredSuppliers?.map((item: any) => (
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
          <div className="mb-4">
            <span className="font-light">Item info</span>
          </div>
          <Input
            onChange={onParentCategoryChange}
            name="categoryId"
            type="select"
            placeholder="Select category"
            label="Category"
            isLoading={isCategoriesLoading}
            disabled={isCategoriesLoading}
            isGroupDropdown
            defaultValue={itemToEdit?.category?.parentCategory?.name}
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
            notFoundContent={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 0"
                }}
              >
                {parentCategoryChange ? (
                  <span>No sub-categories found</span>
                ) : (
                  <span>Select category first</span>
                )}
              </div>
            }
            name="SubCategory"
            type="select"
            placeholder="Select category"
            label="Sub-Category"
            isLoading={isCategoriesLoading}
            disabled={isCategoriesLoading}
            isGroupDropdown
            defaultValue={itemToEdit?.category?.name}
          >
            {categories
              ?.filter((item: any) => item.id === parentCategoryChange)
              .map((subCategory: any) => (
                <>
                  {subCategory?.subCategories?.map((sub: any) => (
                    <Option
                      key={sub?.id}
                      className="text10 dark_grey fowe400"
                      value={sub?.id}
                    >
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
        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
          <Input name="weight" type="text" label="KGs" placeholder="00" />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
          <Input
            name="unitCost"
            type="text"
            label="Unit cost"
            placeholder="00"
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
        className="mt-4"
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className="my-2">
            <span className="font-light">Transport</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="depotId"
            type="select"
            placeholder="Select Depot"
            label="Select Depot"
            isLoading={isDepotsLoading}
            disabled={isDepotsLoading}
            isGroupDropdown
            defaultValue={itemToEdit?.lhsOrder?.depot?.id}
          >
            {depots?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Input>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="lhsOrderId"
            type="select"
            placeholder="Select LHS order"
            label="Select LHS order"
            isLoading={isOrdersLoading}
            disabled={isOrdersLoading}
            isGroupDropdown
            defaultValue={itemToEdit?.lhsOrder?.id}
          >
            {orders?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {item?.id}
              </Option>
            ))}
          </Input>
        </Col>
      </Row>
    </Form>
  );
};

export default EditStock;
