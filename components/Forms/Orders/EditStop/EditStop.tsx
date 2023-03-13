/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { FC, useEffect } from "react";
import { useEditStopMutation } from "../../../../lib/api/endpoints/Orders/ordersEndpoints";
import { EditStopRequest, Order, Stop } from "../../../../lib/types/orders";
import { requiredField } from "../../../../lib/validation/InputValidations";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import ModalWrapper from "../../../Modals/ModalWrapper";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";

interface EditStopProps {
  order: Order;
  stop?: Stop;
  closeModal: () => void;
  isEditStopModal: boolean;
  setIsEditStopModal: any;
}

const EditStop: FC<EditStopProps> = ({
  order,
  stop,
  closeModal,
  isEditStopModal,
  setIsEditStopModal
}) => {
  const [editStop, { isLoading }] = useEditStopMutation();

  const [form] = useForm();

  const handleEditStopSuccess = () => {
    form.resetFields();
    closeModal();
  };

  const handleOnFinish = (values: EditStopRequest) => {
    if (stop) {
      const data = {
        ...values,
        name: stop.name,
        location: stop.location,
        coordinates: stop.coordinates || "",
        position: stop.position
      };

      handleAPIRequests({
        request: editStop,
        orderId: order.id,
        stopId: stop?.id,
        data,
        showSuccess: true,
        handleSuccess: handleEditStopSuccess
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
    <ModalWrapper
      footerContent={
        <Button
          form="EditStopOnOrder"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          SAVE
        </Button>
      }
      title={`Edit ${stop?.name?.split(",")[0]} stop`}
      loading={isLoading}
      isModalVisible={isEditStopModal}
      setIsModalVisible={setIsEditStopModal}
    >
      <Form id="EditStopOnOrder" form={form} onFinish={handleOnFinish}>
        <div className="flex items-center gap-4 my-5">
          <div className="flex-1">
            <Input
              name="arrivalDateTime"
              type="date"
              label="Arrival time"
              showTime
              dateFormat="YYYY-MM-DD HH:mm a"
              placeholder="Start time"
              rules={requiredField("Arrival time")}
            />
          </div>
          <div className="flex-1">
            <Input
              name="departureDateTime"
              type="date"
              label="End time"
              showTime
              dateFormat="YYYY-MM-DDTHH:mm a"
              placeholder="End time"
              rules={requiredField("End time")}
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
              rules={requiredField("Weight")}
            />
          </div>
          <div className="flex-1">
            <Input
              name="odometer"
              type="text"
              label="Odometer"
              placeholder="Enter odometer"
            />
          </div>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default EditStop;
