import { FC, useEffect, useMemo, useState } from "react";
import Input from "../../../Shared/Input";
import Image from "next/image";
import Button from "../../../../components/Shared/Button";
import { useCategoriesQuery } from "../../../../lib/api/endpoints/Category/categoryEndpoints";
import { Form, Select } from "antd";
import {
  useClientQuery,
  useClientsQuery
} from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { AddEditProps } from "../../../../lib/types/components/AddEditProps";
import { OrderRequestBody, Stop_Request } from "../../../../lib/types/orders";
import { LatLng } from "use-places-autocomplete";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";

const { Option, OptGroup } = Select;

interface ObjectTypes {
  names: string;
  id: number | string;
  name: string;
  parentCategory: string;
  subCategories: [];
}

const AddEditOrder: FC<AddEditProps> = ({ title }) => {
  const { data: categories } = useCategoriesQuery();
  const { data: clients } = useClientsQuery({
    page: "",
    size: "",
    org: "",
    dest: "",
    hq: "",
    categoryId: "",
    q: "",
    sort: "",
    source: ""
  });
  const [form] = Form.useForm();
  const [chosenClientId, setChosenClientId] = useState<number>();
  const [stops, setStops] = useState<Stop_Request[]>([]);
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();
  const [subStopLocation, setSubStopLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const [stopDetailsForm] = useForm();

  const {
    data: chosenClientInfo,
    isLoading: chosenClientLoading,
    isFetching
  } = useClientQuery(chosenClientId ?? skipToken);

  const handleCreateOrder = (values: OrderRequestBody) => {
    const stopsWithTrucksAndDrivers: Stop_Request[] = [];
    location &&
      stopsWithTrucksAndDrivers.push({
        coordinates: JSON.stringify(location.coordinates || {}),
        driverId: values.driverId,
        location: location.name,
        name: location.name,
        position: 1,
        truckId: values.truckId,
        weight: Number(values.weight)
      });
    stops.forEach((st) => {
      stopsWithTrucksAndDrivers.push({
        ...st,
        truckId: values.truckId,
        driverId: values.driverId,
        weight: Number(values.weight),
        position: stopsWithTrucksAndDrivers.length + 1
      });
    });
    const payload: OrderRequestBody = {
      ...values,
      stops: stopsWithTrucksAndDrivers,
      startDateTime: moment(values.startDateTime).format("YYYY-MM-DDTHH:mm"),
      amount: Number(values.amount)
    };

    addOrderAction(payload);
  };

  const onValuesChange = (
    changedValues: OrderRequestBody,
    allValues: OrderRequestBody
  ) => {
    if (allValues?.clientId) {
      setChosenClientId(allValues?.clientId);
    }
  };

  const handleAddStop = () => {
    const locationDetails: Stop_Request = {
      position: stops?.length + 1,
      location: subStopLocation?.name || "",
      driverId: 0,
      truckId: 0,
      weight: 0,
      name: subStopLocation?.name || "",
      coordinates: JSON.stringify(subStopLocation?.coordinates || {})
    };
    setStops([...stops, locationDetails]);
    stopDetailsForm.resetFields();
    setSubStopLocation(undefined);
  };

  const handleRemoveStop = (index: number) => {
    const newStops = stops.filter((value, dataIndex) => dataIndex !== index);
    setStops(newStops);
  };

  useEffect(() => {
    form.setFieldsValue({
      stop1: location?.name
    });
  }, [location]);

  useEffect(() => {
    stopDetailsForm.setFieldsValue({
      subStop: subStopLocation?.name
    });
  }, [subStopLocation]);

  useMemo(() => {
    form.setFieldsValue({
      branchId: null
    });
  }, [form]);

  return (
    <div>
      <div className="text-2xl font-bold text-ox-dark mb-10">{title}</div>
      <Form
        name="Login"
        form={form}
        layout="vertical"
        title="New order"
        onValuesChange={onValuesChange}
        onFinish={handleCreateOrder}
      >
        {/*  Client's details */}
        <div className="mb-14">
          <div className="font-extralight text-[15px] mb-6">Client details</div>
          <div className="flex gap-10">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="heading2">Client name</span>
                <span className="link animate">New client</span>
              </div>

              <div>
                <Input
                  name="clientId"
                  type="select"
                  placeholder="Select client"
                  isGroupDropdown
                  isLoading={clientsLoading}
                  disabled={clientsLoading}
                  rules={[{ required: true, message: "Choose a client" }]}
                >
                  {clients?.payload?.content.map((client) => (
                    <Option value={client.id} key={client.names}>
                      {client.names}
                    </Option>
                  ))}
                </Input>
              </div>
            </div>
            <div className="flex-1">
              <div className=" mb-2 flex items-center justify-between">
                <span className="heading2"> Branch</span>

                {!form.getFieldValue("clientId") && (
                  <span className="text-xs text-gray-400 font-light">
                    Choose client first to continue
                  </span>
                )}
              </div>
              <Input
                name="officeId"
                type="select"
                placeholder="Select branch"
                // label="Branch"
                isLoading={chosenClientLoading || isFetching}
                disabled={
                  chosenClientLoading || isFetching || !chosenClientInfo
                }
                isGroupDropdown
                rules={[{ required: true, message: "Branch is required" }]}
              >
                {chosenClientInfo?.payload?.offices.map((office) => (
                  <Option value={office.id} key={office.names}>
                    {office.names}
                  </Option>
                ))}
              </Input>
            </div>
          </div>
        </div>

        {/* Order details */}

        <div className="mb-14">
          <div className="font-extralight text-[15px] mb-10">Order details</div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="startDateTime"
                  type="date"
                  label="Date"
                  options={[{ label: "RTC", value: 1 }]}
                  suffixIcon={
                    <Image
                      src="/icons/ic-actions-calendar.svg"
                      alt="Calendar icon"
                      width={18}
                      height={18}
                    />
                  }
                  rules={[{ required: true, message: "Select start date" }]}
                />
              </div>
            </div>
            <div className="flex-1">
              <Input
                name="stop1"
                type="location"
                inputType="text"
                placeholder="Search location"
                setLocation={setLocation}
                location={location}
                label="Stop 1"
                rules={[{ required: true, message: "Choose stop location" }]}
              />
            </div>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="categoryId"
                  type="select"
                  label="Category"
                  placeholder="Select category"
                  isLoading={categoriesLoading}
                  disabled={categoriesLoading}
                  isGroupDropdown
                  rules={[{ required: true, message: "Choose category" }]}
                >
                  {categories?.payload?.map((el) => {
                    if (!el.parentCategory && el?.subCategories?.length !== 0) {
                      return (
                        <OptGroup key={el.name} label={el.name} title={el.name}>
                          {el?.subCategories?.map((el) => (
                            <Option key={el.name} value={el.id} title={el.name}>
                              {el.name}
                            </Option>
                          ))}
                        </OptGroup>
                      );
                    }
                    if (
                      !el?.parentCategory &&
                      el?.subCategories?.length === 0
                    ) {
                      return (
                        <Option value={el.id} key={el.id} title={el.name}>
                          {el.name}
                        </Option>
                      );
                    }
                    return null;
                  })}
                </Input>
              </div>
            </div>
            <div className="flex-1">
              <Input
                name="weight"
                type="text"
                placeholder="00"
                label="Expected weight"
                inputType="number"
                suffixIcon="KGs"
                rules={[{ required: true, message: "Weight is required" }]}
              />
            </div>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="paymentPlan"
                  type="select"
                  label="Plan"
                  placeholder="Select plan"
                  options={[
                    { label: "Per job", value: "PAY_BY_JOB" },
                    { label: "Per Kilogram", value: "PAY_BY_KG" }
                  ]}
                  rules={[
                    { required: true, message: "Select a plan to continue" }
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <Input
                name="amount"
                type="text"
                placeholder="00"
                label="Rate"
                inputType="number"
                suffixIcon="Rwf"
                rules={[{ required: true, message: "Rate is required" }]}
              />
            </div>
          </div>
        </div>

        {/* Truck details */}

        <div className="mb-14">
          <div className="font-extralight text-[15px] mb-10">Truck details</div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="heading2">Truck</span>
                  <span className="link animate">New truck</span>
                </div>
                <div>
                  <Input
                    name="truckId"
                    type="select"
                    placeholder="Select truck"
                    options={[{ label: "RAA 123", value: 31 }]}
                    rules={[{ required: true, message: "Truck is required" }]}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="heading2">Driver</span>
                  <span className="link animate">New driver</span>
                </div>
                <div>
                  <Input
                    name="driverId"
                    type="select"
                    placeholder="Select driver"
                    options={[{ label: "David KAMANZI", value: 7 }]}
                    rules={[{ required: true, message: "Driver is required" }]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="depotId"
                  type="select"
                  label="Depot"
                  placeholder="Select depot"
                  options={[{ label: "Tyazo Depot", value: 1 }]}
                  rules={[
                    { required: true, message: "Choose depot to continue" }
                  ]}
                />
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </Form>

      {/* Stop details */}

      <div className="mb-14">
        <div className="font-extralight text-[15px] mb-10">Stop details</div>
        {stops.length !== 0 && (
          <div className="mb-10">
            {stops.map((st, index) => {
              return (
                <div key={index} className="flex items-center mb-3">
                  <div className="flex-1 text-sm flex items-center gap-3">
                    <div className="text-gray-400">{index + 1}</div>
                    <div className="heading2">{st.name}</div>
                  </div>
                  <div>
                    <Image
                      className="pointer"
                      width={12}
                      height={12}
                      src="/icons/ic-actions-close-simple.svg"
                      alt="Close icon"
                      onClick={() => handleRemoveStop(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Form form={stopDetailsForm} onFinish={handleAddStop}>
          <div className="flex gap-10">
            <div className="flex-1">
              <Input
                name="subStop"
                type="location"
                placeholder="Search location"
                setLocation={setSubStopLocation}
                location={subStopLocation}
                label="Add stop"
                rules={[{ required: true, message: "Search for a location" }]}
              />
            </div>
            <div className="w-[142px] h-[65px] flex items-end">
              <Button type="secondary" htmlType="submit">
                ADD STOP
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEditOrder;
