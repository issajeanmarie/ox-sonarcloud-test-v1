import { FC, useMemo, useState } from "react";
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
import { OrderRequestBody } from "../../../../lib/types/orders";

const { Option, OptGroup } = Select;

const AddEditOrder: FC<AddEditProps> = ({ title }) => {
  const { data: categories } = useCategoriesQuery();
  const { data: clients } = useClientsQuery();
  const [form] = Form.useForm();
  const [chosenClientId, setChosenClientId] = useState<number>();

  const onValuesChange = (
    changedValues: OrderRequestBody,
    allValues: OrderRequestBody
  ) => {
    if (allValues?.clientId) {
      setChosenClientId(allValues?.clientId);
    }
  };

  const {
    data: chosenClientInfo,
    isLoading: chosenClientLoading,
    isFetching
  } = useClientQuery(chosenClientId ?? skipToken);

  useMemo(() => {
    form.setFieldsValue({
      branchId: null
    });
  }, [chosenClientLoading, isFetching]);

  return (
    <div>
      <div className="text-lg font-bold text-ox-dark mb-10">{title}</div>
      <Form
        name="Login"
        form={form}
        layout="vertical"
        title="New order"
        onValuesChange={onValuesChange}
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
              <Input
                name="branchId"
                type="select"
                placeholder="Select branch"
                label="Branch"
                isLoading={chosenClientLoading || isFetching}
                disabled={
                  chosenClientLoading || isFetching || !chosenClientInfo
                }
                isGroupDropdown
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
                  name="startTime"
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
                />
              </div>
            </div>
            <div className="flex-1">
              <Input
                name="googleLocation"
                type="location"
                inputType="text"
                placeholder="Search location"
                label="Stop 1"
              />
            </div>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="itemsCategory"
                  type="select"
                  label="Category"
                  placeholder="Select category"
                  isGroupDropdown
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
                name="expectedWeight"
                type="text"
                placeholder="00"
                label="Expected weight"
                inputType="number"
                suffixIcon="KGs"
              />
            </div>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="planId"
                  type="select"
                  label="Plan"
                  placeholder="Select plan"
                  options={[
                    { label: "Per job", value: "PAY_BY_JOB" },
                    { label: "Per Kilogram", value: "PAY_BY_KG" }
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <Input
                name="rate"
                type="text"
                placeholder="00"
                label="Rate"
                inputType="number"
                suffixIcon="Rwf"
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
                />
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>

        {/* Stop details */}

        <div className="mb-14">
          <div className="font-extralight text-[15px] mb-10">Stop details</div>
          <div className="flex items-center mb-10">
            <div className="flex-1 text-sm flex items-center gap-3">
              <div className="text-gray-400">1</div>
              <div className="heading2">Musanze, Kanzenze KK 000 St 7</div>
            </div>
            <div>
              <Image
                className="pointer"
                width={12}
                height={12}
                src="/icons/ic-actions-close-simple.svg"
                alt="Close icon"
              />
            </div>
          </div>
          <div className="flex items-end gap-10">
            <div className="flex-1">
              <Input
                name="stop"
                type="location"
                placeholder="Search location"
                label="Add stop"
              />
            </div>
            <div className="w-[142px]">
              <Button type="secondary">ADD STOP</Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddEditOrder;
