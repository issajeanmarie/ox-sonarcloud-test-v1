import React, { FC, SetStateAction } from "react";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";

const { Option } = Select;

interface Props {
  categories: any;
  setDefaultSelected: React.Dispatch<SetStateAction<object | string>>;
  setCurrentPages: React.Dispatch<SetStateAction<number>>;
  setStart: React.Dispatch<SetStateAction<string>>;
  setEnd: React.Dispatch<SetStateAction<string>>;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  setIsFiltered: React.Dispatch<SetStateAction<boolean>>;
}

const FilterClientForm: FC<Props> = ({
  categories,
  setStart,
  setEnd,
  setDefaultSelected,
  setIsVisible,
  setCurrentPages,
  setIsFiltered
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: { start: Date; end: Date; category: string }) => {
    if (values.start || values.end || values.category) {
      setIsFiltered(true);
    }

    setStart(values?.start ? values?.start?.toISOString() : "");
    setEnd(values?.end ? values?.end?.toISOString() : "");

    setDefaultSelected(values?.category ? JSON.parse(values?.category) : "");

    setIsVisible(false);
    setCurrentPages(0);
  };

  const handleClearFilter = () => {
    setStart("");
    setEnd("");
    setDefaultSelected("");

    form.resetFields();
    setIsFiltered(false);

    setIsVisible(false);
    setCurrentPages(0);
  };

  return (
    <div>
      <Form
        name="filter_clients"
        form={form}
        layout="vertical"
        title="FILTER ORDERS"
        onFinish={onFinish}
      >
        <div className="m-5 flex flex-col gap-6">
          <div className="heading1 mb-6">FILTER CLIENTS</div>

          <div className="flex items-center gap-4 ">
            <div className="flex-1">
              <Input name="start" type="date" label="From" allowClear />
            </div>

            <div className="flex-1">
              <Input name="end" type="date" label="To" allowClear />
            </div>
          </div>

          <div className="flex items-center gap-4 overflow-hidden">
            <div className="flex-1">
              <Input
                name="category"
                type="select"
                label="Category"
                allowClear
                placeholder="Select category"
                isGroupDropdown
              >
                <Option value="" key="">
                  All categories
                </Option>

                {categories &&
                  categories.map((category: any) => {
                    return (
                      <Option
                        key={category.name}
                        value={JSON.stringify(category)}
                      >
                        {category?.name}
                      </Option>
                    );
                  })}
              </Input>
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <div className="min-w-[150px]">
              <Button
                type="secondary"
                className="mt-5"
                onClick={() => handleClearFilter()}
              >
                CLEAR FILTER
              </Button>
            </div>

            <div className="min-w-[150px]">
              <Button
                type="primary"
                className="mt-5"
                htmlType="submit"
                form="filter_clients"
                loading={false}
              >
                FILTER
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FilterClientForm;
