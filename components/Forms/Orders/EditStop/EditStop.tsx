/* eslint-disable react-hooks/exhaustive-deps */
import { Form, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { FC, useEffect } from "react";
import { useEditStopMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { EditStopRequest, Order, Stop } from "../../../../lib/types/orders";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";

interface EditStopProps {
  order: Order;
  stop?: Stop;
  closeModal: () => void;
}

const EditStop: FC<EditStopProps> = ({ order, stop, closeModal }) => {
  const [editStop, { isLoading }] = useEditStopMutation();

  const [form] = useForm();

  const handleOnFinish = (values: EditStopRequest) => {
    if (stop) {
      const data = {
        ...values,
        departureDateTime: moment(values.departureDateTime).format(
          "YYYY-MM-DDTHH:mm"
        ),
        arrivalDateTime: moment(values.arrivalDateTime).format(
          "YYYY-MM-DDTHH:mm"
        ),
        name: stop.name,
        location: stop.location,
        coordinates: stop.coordinates || "",
        position: stop.position
      };
      editStop({ orderId: order.id, stopId: stop?.id, data })
        .unwrap()
        .then((res) => {
          message.success(res.message);
          form.resetFields();
          closeModal();
        })
        .catch((e) => {
          message.error(e.data?.message || "Something went wrong");
        });
    }
  };

  useEffect(() => {
    if (stop) {
      form.setFieldsValue({
        arrivalDateTime: stop?.arrivalDateTime
          ? moment(stop.arrivalDateTime)
          : "",
        departureDateTime: stop?.departureDateTime
          ? moment(stop.departureDateTime)
          : "",
        weight: stop?.weight,
        odometer: stop?.odometer
      });
    }
  }, [stop]);

  return (
    <div className="m-8">
      <div className="heading1 mb-14">Edit {stop?.name}</div>
      <Form form={form} onFinish={handleOnFinish}>
        <div className="my-10">
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1">
              <Input
                name="arrivalDateTime"
                type="date"
                label="Arrival time"
                showTime
                dateFormat="YYYY-MM-DD HH:mm a"
                placeholder="Select time"
                options={[{ label: "David KAMANZI", value: 7 }]}
                rules={[
                  { required: true, message: "Choose a start time to continue" }
                ]}
              />
            </div>
            <div className="flex-1">
              <Input
                name="departureDateTime"
                type="date"
                label="End time"
                showTime
                dateFormat="YYYY-MM-DDTHH:mm a"
                placeholder="Select time"
                options={[{ label: "RAA 123", value: 31 }]}
                rules={[
                  { required: true, message: "Choose an end time to continue" }
                ]}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1">
              <Input
                name="weight"
                type="text"
                inputType="number"
                label="Weight"
                suffixIcon="KGs"
                placeholder="Enter weight"
                options={[{ label: "David KAMANZI", value: 7 }]}
                rules={[{ required: true, message: "Weight is required" }]}
              />
            </div>
            <div className="flex-1">
              <Input
                name="odometer"
                type="text"
                label="Odometer"
                placeholder="Enter odometer"
                options={[{ label: "RAA 123", value: 31 }]}
                rules={[{ required: true, message: "Odometer is required" }]}
              />
            </div>
          </div>
          <div className="mt-14">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              SAVE
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditStop;
