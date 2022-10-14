import React, { FC, useState } from "react";
import Form from "antd/lib/form";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import { Row, Col } from "antd";
import { AddResourceTypes } from "../../../lib/types/pageTypes/Resources/AddResourceTypes";
import { requiredInput } from "../../../lib/validation/InputValidations";

const { Text } = Typography;

const AddNewResource: FC<AddResourceTypes> = ({
  onAddResourceFinish,
  form,
  isLoading
}) => {
  const [val, setVal] = useState("");
  const [pasted, setPasted] = useState(false);

  const handleChange = (e: React.SetStateAction<string>) => {
    if (!pasted) {
      setVal(e);
    }
    setPasted(false);
  };

  const handlePaste = () => {
    setPasted(true);
  };

  return (
    <Form
      name="AddNewResource"
      onFinish={onAddResourceFinish}
      layout="vertical"
      form={form}
      title=""
    >
      <div className="gap-10 mb-5">
        <div className="flex-1">
          <div>
            <Input
              name="title"
              type="text"
              placeholder="Enter the resource title"
              inputType="text"
              label="Title"
              rules={requiredInput}
            />
          </div>
        </div>
        <div className="flex-1  mato32">
          <Input
            name="link"
            type="text"
            label="Link"
            placeholder="Paste the link here"
            inputType="text"
            rules={requiredInput}
            onPaste={handlePaste}
            onChange={(e: React.SetStateAction<string>) => handleChange(e)}
          />
        </div>
      </div>

      <Row>
        <Col className="gutter-row" span={18}>
          <a href={val} target="_blank" rel="noopener noreferrer">
            <Row gutter={16} align="middle">
              <Col>
                <Text className="heading2 mato8 underline">
                  Test the pasted link
                </Text>
              </Col>

              <Image
                preview={false}
                width={12}
                className="mt-2"
                alt="New tab"
                src="/icons/newTab.png"
              />
            </Row>
          </a>
        </Col>
        <Col className="gutter-row" span={6}>
          <Button
            type="primary"
            htmlType="submit"
            size="small"
            loading={isLoading}
          >
            ADD RESOURCE
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewResource;
