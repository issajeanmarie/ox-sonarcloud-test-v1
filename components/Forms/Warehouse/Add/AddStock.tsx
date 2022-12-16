/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import {
  requiredField,
  requiredInput
} from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Image from "next/image";
import { AddStockTypes } from "../../../../lib/types/warehouse";
import { useSelector } from "react-redux";
import CircleCheckbox from "../../../Shared/Custom";
import moment from "moment";
import { localeString } from "../../../../utils/numberFormatter";

const { Option } = Select;

const AddStock: FC<AddStockTypes> = ({
  onAddStockFinish,
  form,
  categories,
  isCategoriesLoading,
  depots,
  isDepotsLoading,
  isSuppliersLoading,
  suppliers,
  checkbox,
  setCheckbox,
  lhsOrders
}) => {
  const filteredResult = suppliers?.payload?.content?.filter(
    (item: any) => item.enabled
  );

  const filteredCategories = categories?.filter(
    (category: { subCategories: [] }) => category.subCategories.length > 0
  );

  const [parentCategoryChange, setParentCategory] = useState();

  const onParentCategoryChange = (value: any) => {
    setParentCategory(value);
    form.setFieldsValue({ SubCategory: "" });
  };

  const depotsState = useSelector(
    (state: { depots: { payload: { depotId: number } } }) =>
      state.depots.payload
  );

  useEffect(() => {
    form.setFieldsValue({
      depotId: depotsState.depotId || ""
    });
  }, [depotsState.depotId, form]);

  return (
    <Form
      form={form}
      onFinish={onAddStockFinish}
      name="AddStock"
      layout="vertical"
      title=""
      id="AddStock"
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
        className="mt-6"
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <div className="mb-6">
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
          >
            {filteredCategories?.map((item: any) => (
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
            rules={requiredField("Sub-Category")}
            isGroupDropdown
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
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="weight"
            type="text"
            label="KGs"
            placeholder="Enter the KGs"
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

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="depotId"
            type="select"
            placeholder="Select Depot"
            label="Select Depot"
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
            isLoading={isDepotsLoading}
            disabled={isDepotsLoading}
            isGroupDropdown
          >
            {lhsOrders?.map((item: any) => (
              <Option key={item?.weight} value={item?.id}>
                {`${localeString(item.weight)} KGs - ${localeString(
                  item.totalAmount
                )} Rwf - `}{" "}
                <span className="captionText italic">
                  {moment(item.startDateTime).format("YYYY/MM/DD")}
                </span>
              </Option>
            ))}
          </Input>
        </Col>
      </Row>

      <Row align="middle" className="mt-10">
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <div className="flex items-center gap-4">
            <span className="font-bold underline">Add another item</span>
            <CircleCheckbox
              defaultValue={checkbox}
              checked={checkbox}
              setState={setCheckbox}
              state={checkbox}
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default AddStock;
