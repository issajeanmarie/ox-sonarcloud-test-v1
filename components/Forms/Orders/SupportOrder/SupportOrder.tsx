import { Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { FC, useEffect, useState } from "react";
import { LatLng } from "use-places-autocomplete";
import { useSupportOrderMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import {
  SupportOrderFormValues,
  SupportOrderRequest
} from "../../../../lib/types/orders";
import { Query } from "../../../../lib/types/shared";
import Input from "../../../Shared/Input";
import Header from "./header";

interface SupportOrderProps {
  orderId: Query;
  setSupport: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupportOrder: FC<SupportOrderProps> = ({ orderId, setSupport }) => {
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();
  const [supportOrder, { isLoading }] = useSupportOrderMutation();

  const [form] = useForm();

  const onFinish = (values: SupportOrderFormValues) => {
    const payload: SupportOrderRequest = {
      stop: {
        name: location?.name || "",
        location: location?.name || "",
        coordinates: JSON.stringify(location?.coordinates || {}),
        driverId: values.driverId,
        truckId: values.truckId,
        weight: values.weight,
        position: 1
      },
      paymentPlan: values.paymentPlan,
      amount: values.amount
    };
    supportOrder({ orderId, data: payload })
      .unwrap()
      .then((res) => {
        message.success(res.message);
        setSupport(false);
      })
      .catch((e) => {
        message.error(e.data?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      stop: location?.name
    });
  }, [location]);

  return (
    <div>
      <Header
        orderId={orderId}
        setSupport={setSupport}
        form={form}
        supportOrderLoading={isLoading}
      />
      <div className="w-[800px] m-auto bg-white shadow-[0px_0px_19px_#00000008]  p-14 h-[85vh]">
        <Form onFinish={onFinish} form={form}>
          <div className="text-2xl font-bold text-ox-dark mb-10">
            CREATE A NEW SUPPORTING ORDER
          </div>
          <div className="font-extralight text-[15px] mb-10">Order details</div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="truckId"
                  type="select"
                  label="Truck"
                  placeholder="Select truck"
                  options={[{ label: "RAA 123", value: 31 }]}
                  rules={[{ required: true, message: "Truck is required" }]}
                />
              </div>
            </div>
            <div className="flex-1">
              <Input
                name="stop"
                type="location"
                placeholder="Search location"
                setLocation={setLocation}
                location={location}
                label="Stop"
                rules={[{ required: true, message: "Search for a location" }]}
              />
            </div>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="driverId"
                  label="Driver"
                  type="select"
                  placeholder="Select driver"
                  options={[{ label: "David KAMANZI", value: 7 }]}
                  rules={[{ required: true, message: "Driver is required" }]}
                />
              </div>
            </div>
            <div className="flex-1">
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
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="amount"
                  type="text"
                  placeholder="00"
                  label="Rate / KG"
                  inputType="number"
                  suffixIcon="Rwf"
                  rules={[{ required: true, message: "Weight is required" }]}
                />
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
        </Form>
      </div>
    </div>
  );
};

export default SupportOrder;
