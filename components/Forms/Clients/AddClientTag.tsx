import { Col, Form, Image, Row } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../lib/validation/InputValidations";
import Input from "../../Shared/Input";
import { AddClientTagTypes } from "../../../lib/types/pageTypes/Clients/AddClientTagTypes";

type TagSchema = {
  id: number;
  name: string;
};

const AddClientTag: FC<AddClientTagTypes> = ({
  onAddClientTagFinish,
  tags,
  isTagsLoading,
  form
}) => {
  return (
    <Form
      onFinish={onAddClientTagFinish}
      form={form}
      name="AddClientTag"
      layout="vertical"
      title=""
      id="AddClientTag"
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            rules={requiredInput}
            list="tags"
            name="name"
            type="text"
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
          />

          <datalist id="tags">
            {tags?.map((tag: TagSchema) => {
              return <option key={tag.id} value={tag.name} />;
            })}
          </datalist>
        </Col>
      </Row>
    </Form>
  );
};

export default AddClientTag;
