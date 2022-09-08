import React, { FC, useEffect } from "react";
import Form from "antd/lib/form";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { PAYMENT_STATUS } from "../../../../utils/options";
import { Order_Filter } from "../../../../lib/types/orders";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useGetTrucksMutation } from "../../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { message, Select } from "antd";
import { TruckSchema } from "../../../../lib/types/trucksTypes";

const { Option } = Select;

interface FilterOrdersFormProps {
  getOrders: (filter: Order_Filter) => void;
  loading: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterOrdersForm: FC<FilterOrdersFormProps> = ({
  getOrders,
  setIsFiltered,
  loading
}) => {
  const [getTrucks, { data, isLoading: trucksLoading }] =
    useGetTrucksMutation();

  const handleOnFinish = (values: Order_Filter) => {
    setIsFiltered(true);
    const data = {
      ...values,
      start: values.start && moment(values.start).format("YYYY-MM-DD"),
      end: values.end && moment(values.end).format("YYYY-MM-DD")
    };
    getOrders(data);
  };

  const clearFilter = () => {
    setIsFiltered(false);
    form.resetFields();
    getOrders({});
  };

  useEffect(() => {
    getTrucks({ page: 0, size: 10000 })
      .unwrap()
      .then()
      .catch((e) => {
        message.error(e.data?.messag || "Cannot get trucks");
      });
  }, [getTrucks]);

  const [form] = useForm();

  return (
    <div>
      <Form
        name="Filter orders"
        form={form}
        layout="vertical"
        title="FILTER ORDERS"
        onFinish={handleOnFinish}
      >
        <div className="m-5 flex flex-col gap-6">
          <div className="heading1 mb-6">FILTER ORDERS</div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                name="filter"
                type="select"
                options={PAYMENT_STATUS}
                label="By payment status"
                placeholder="Choose payment status"
              />
            </div>
            <div className="flex-1">
              <Input
                name="momoRefCode"
                type="text"
                label="By MoMo ref"
                placeholder="Enter momo ref"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex-1">
              <Input
                name="truck"
                type="select"
                label="By truck"
                placeholder="Choose truck"
                loading={trucksLoading}
                disabled={trucksLoading}
                isGroupDropdown
                options={[{ label: "RAA 123", value: 31 }]}
              >
                {data?.payload?.content.map((truck: TruckSchema) => {
                  return (
                    <Option value={truck.id} key={truck.plateNumber}>
                      {truck.plateNumber}
                    </Option>
                  );
                })}
              </Input>
            </div>
            <div className="flex-1">
              <Input
                name="driver"
                type="select"
                label="By Driver"
                options={[{ label: "David KAMANZI", value: 7 }]}
                placeholder="Choose driver"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex-1">
              <Input name="start" type="date" label="From" />
            </div>
            <div className="flex-1">
              <Input name="end" type="date" label="To" />
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <div className="min-w-[150px]">
              <Button onClick={clearFilter} type="secondary" className="mt-5">
                CLEAR FILTER
              </Button>
            </div>
            <div className="min-w-[150px]">
              <Button
                type="primary"
                className="mt-5"
                htmlType="submit"
                loading={loading}
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

export default FilterOrdersForm;
