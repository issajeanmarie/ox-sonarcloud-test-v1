import { Col, Image, Row } from "antd";
import React from "react";
import CustomButton from "../../Shared/Button/button";
import CustomInput from "../../Shared/Input";

const AddCategory = () => {
  return (
    <>
      <Col>
        <CustomInput
          type="text"
          name="search"
          placeholder="Search category"
          suffixIcon={
            <Image
              width={14}
              src="/icons/ic-actions-search-DESKTOP-JLD6GCT.svg"
              preview={false}
              alt=""
            />
          }
        />
      </Col>

      <Row className="flex items-center gap-4">
        <Col>
          <CustomInput
            type="text"
            name="name"
            placeholder="Enter category name"
          />
        </Col>
        <Col>
          <CustomButton type="primary">ADD CATEGORY</CustomButton>
        </Col>
      </Row>
    </>
  );
};

export default AddCategory;
