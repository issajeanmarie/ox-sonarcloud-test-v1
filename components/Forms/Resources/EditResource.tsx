import React, { FC } from "react";
import Form from "antd/lib/form";
import Input from "../../Shared/Input";
import Typography from "antd/lib/typography";
import { Row, Col } from "antd";
import { EditResourceTypes } from "../../../lib/types/pageTypes/Resources/EditResourceTypes";
import { requiredInput } from "../../../lib/validation/InputValidations";

const { Text } = Typography;

const EditResource: FC<EditResourceTypes> = ({
  onEditResourceFinish,
  form
}) => {
  const [val, setVal] = React.useState("");
  const [pasted, setPasted] = React.useState(false);

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
      name="EditResource"
      onFinish={onEditResourceFinish}
      layout="vertical"
      form={form}
      title=""
      id="EditResource"
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
            <Text className="heading2 mato8">Test the pasted link</Text>
          </a>
        </Col>
      </Row>
    </Form>
  );
};

export default EditResource;
