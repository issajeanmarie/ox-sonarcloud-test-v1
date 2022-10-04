/* eslint-disable react-hooks/exhaustive-deps */
import { Form, message, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC, useEffect, useState } from "react";
import { LatLng } from "use-places-autocomplete";
import { useAddStopMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { useLazyGetTrucksQuery } from "../../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { AddStopRequest, Order } from "../../../../lib/types/orders";
import { TruckSchema } from "../../../../lib/types/trucksTypes";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import ModalWrapper from "../../../Modals/ModalWrapper";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import DriverSearch from "../../../Shared/Input/DriverSearch";

const { Option } = Select;

interface AddStopProps {
  order: Order;
  closeModal: () => void;
  isAddStopModal: boolean;
  setIsAddStopModal: any;
}

const AddStop: FC<AddStopProps> = ({
  order,
  closeModal,
  isAddStopModal,
  setIsAddStopModal
}) => {
  const [addStop, { isLoading }] = useAddStopMutation();

  const [form] = useForm();
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const handleOnFinish = (values: AddStopRequest) => {
    const data = {
      ...values,
      name: location?.name || "",
      weight: Number(values.weight),
      coordinates: JSON.stringify(location?.coordinates || {}),
      position: order.stops.length + 1
    };

    addStop({ orderId: order.id, data })
      .unwrap()
      .then((res) => {
        message.success(res.message);
        form.resetFields();
        setLocation(undefined);
        closeModal();
      })
      .catch((e) => {
        message.error(e.data?.message || "Something went wrong");
      });
  };

  const [getTrucks, { data: trucks, isLoading: trucksLoading }] =
    useLazyGetTrucksQuery();

  useEffect(() => {
    form.setFieldsValue({
      location: location?.name
    });
  }, [location]);

  useEffect(() => {
    handleAPIRequests({
      request: getTrucks,
      page: 0,
      noPagination: true,
      showFailure: true
    });
  }, [getTrucks]);

  return (
    <ModalWrapper
      title="ADD A STOP"
      loading={isLoading}
      isModalVisible={isAddStopModal}
      setIsModalVisible={setIsAddStopModal}
    >
      <Form form={form} onFinish={handleOnFinish}>
        <div className="mb-10">
          <div>
            <Input
              name="location"
              type="location"
              label="Location"
              placeholder="Search location"
              setLocation={setLocation}
              rules={[{ required: true, message: "Location is required" }]}
            />
          </div>
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1">
              <DriverSearch
                label="Driver"
                rules={requiredField("Driver")}
                name="driverId"
              />
            </div>

            <div className="flex-1">
              <Input
                name="truckId"
                type="select"
                label="Truck"
                placeholder="Select truck"
                isLoading={trucksLoading}
                disabled={trucksLoading}
                isGroupDropdown
                rules={[{ required: true, message: "Truck is required" }]}
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
          </div>
          <div className="mb-10">
            <Input
              name="weight"
              type="text"
              label="Weight"
              placeholder="Enter weight"
              suffixIcon="KGs"
              inputType="number"
              rules={[{ required: true, message: "Weight is required" }]}
            />
          </div>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Add
          </Button>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default AddStop;
