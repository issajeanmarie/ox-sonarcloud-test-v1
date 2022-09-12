import { Col, Form, Image, Row, Select } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { AddClientTagTypes } from "../../../lib/types/pageTypes/Clients/AddClientTagTypes";

const { Option } = Select;

type TagSchema = {
  id: number;
  name: string;
};

const AddClientTag: FC<AddClientTagTypes> = ({
  onAddClientTagFinish,
  isLoading,
  tags,
  isTagsLoading,
  onTagChange,
  form
}) => {
  return (
    <Form
      onFinish={onAddClientTagFinish}
      form={form}
      name="AddClientTag"
      layout="vertical"
      title=""
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            onChange={onTagChange}
            rules={requiredInput}
            name="name"
            type="select"
            label="Tag name"
            placeholder="Select tag"
            loading={isTagsLoading}
            disabled={isTagsLoading}
            isGroupDropdown
            suffixIcon={
              <Image
                preview={false}
                src="/icons/expand_more_black_24dp.svg"
                alt=""
                width={10}
              />
            }
          >
            {tags?.map((tag: TagSchema) => {
              return (
                <Option value={tag.id} key={tag.id}>
                  {tag.name}
                </Option>
              );
            })}
          </Input>
        </Col>
      </Row>

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            ADD TAG
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddClientTag;
