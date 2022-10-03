import React, { FC, useEffect } from "react";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import { PAYMENT_STATUS } from "../../../../utils/options";
import { Order_Filter } from "../../../../lib/types/orders";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useLazyGetTrucksQuery } from "../../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { TruckSchema } from "../../../../lib/types/trucksTypes";
import {
  getFromLocal,
  removeFromLocal,
  saveToLocal
} from "../../../../helpers/handleLocalStorage";
import { OX_ORDERS_FILTERS } from "../../../../config/constants";
import { yearDateFormat } from "../../../../config/dateFormats";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import DriverSearch from "../../../Shared/Input/DriverSearch";

const { Option } = Select;

interface FilterOrdersFormProps {
  getOrdersAction: ({ filter, depot }: Order_Filter) => void;
  loading: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterOrdersForm: FC<FilterOrdersFormProps> = ({
  getOrdersAction,
  setIsFiltered,
  loading
}) => {
  const [getTrucks, { data: trucks, isLoading: trucksLoading }] =
    useLazyGetTrucksQuery();

  const handleOnFinish = (values: Order_Filter) => {
    setIsFiltered(true);
    const data = {
      ...values,
      start: values.start && moment(values.start).format("YYYY-MM-DD"),
      end: values.end && moment(values.end).format("YYYY-MM-DD")
    };

    removeFromLocal(OX_ORDERS_FILTERS);

    getOrdersAction({
      filter: data?.filter || "",
      start: data?.start || "",
      end: data?.end || "",
      momoRefCode: data.momoRefCode || "",
      truck: data.truck || "",
      driver: data.driver || ""
    });

    // CHECK IF VALUES ARE EMPTY TO DELETE LOCAL STORAGE VALUES
    if (
      !data.filter &&
      !data.start &&
      !data.end &&
      !data.momoRefCode &&
      !data.truck &&
      !data.driver
    ) {
      setIsFiltered(false);
      removeFromLocal(OX_ORDERS_FILTERS);
    } else {
      saveToLocal({
        name: OX_ORDERS_FILTERS,
        value: data
      });
    }
  };

  const clearFilter = () => {
    removeFromLocal(OX_ORDERS_FILTERS);
    setIsFiltered(false);
    form.resetFields();

    getOrdersAction({
      filter: "",
      start: "",
      end: "",
      momoRefCode: "",
      truck: "",
      driver: ""
    });
  };

  useEffect(() => {
    handleAPIRequests({
      request: getTrucks,
      page: 0,
      noPagination: true,
      showFailure: true
    });
  }, [getTrucks]);

  const [form] = useForm();

  const savedFilters = getFromLocal(OX_ORDERS_FILTERS);

  const initialValues = {
    start: savedFilters?.start
      ? moment(savedFilters?.start, yearDateFormat)
      : "",
    end: savedFilters?.end ? moment(savedFilters?.end, yearDateFormat) : "",
    momoRefCode: savedFilters?.momoRefCode || "",
    filter: savedFilters?.filter || "",
    driver: savedFilters?.driver || "",
    truck: savedFilters?.truck || ""
  };

  return (
    <div>
      <Form
        name="Filter orders"
        form={form}
        initialValues={initialValues}
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
                allowClear
              />
            </div>
            <div className="flex-1">
              <Input
                name="momoRefCode"
                type="text"
                label="By MoMo ref"
                placeholder="Enter momo ref"
                allowClear
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex-1">
              <Input
                name="truck"
                type="select"
                label="Truck"
                allowClear
                placeholder="Select truck"
                isLoading={trucksLoading}
                disabled={trucksLoading}
                isGroupDropdown
              >
                {trucks?.map((truck: TruckSchema) => {
                  return (
                    <Option value={truck.id} key={truck.plateNumber}>
                      {truck.plateNumber}
                    </Option>
                  );
                })}
              </Input>
            </div>
            <div className="flex-1">
              <DriverSearch label="Driver" />
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex-1">
              <Input name="start" type="date" label="From" allowClear />
            </div>
            <div className="flex-1">
              <Input name="end" type="date" label="To" allowClear />
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
