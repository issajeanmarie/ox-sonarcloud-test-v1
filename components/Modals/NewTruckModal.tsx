import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import { useCreateTruckMutation } from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { yearsList } from "../../helpers/yearsList";
import { BackendErrorTypes } from "../../lib/types/shared";
import { useDispatch } from "react-redux";
import {
  CreateTruckRequest,
  CreateTruckResponse
} from "../../lib/types/trucksTypes";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";
import { displayTrucks } from "../../lib/redux/slices/trucksSlice";
import { requiredField } from "../../lib/validation/InputValidations";

type Types = {
  isVisible: boolean;
  setIsVisible: any;
};

const NewTruckModal = ({ isVisible, setIsVisible }: Types) => {
  const years = yearsList().map((year) => ({ label: `${year}`, value: year }));
  const [form] = Form.useForm();

  const [createTruck, { isLoading }] = useCreateTruckMutation();
  const dispatch = useDispatch();

  const onFinish = (values: CreateTruckRequest) => {
    createTruck(values)
      .unwrap()
      .then((res: CreateTruckResponse) => {
        handleCancel();
        dispatch(displayTrucks(res));
        form.resetFields();
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(err?.data?.message || "Something went wrong")
      );
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      title={false}
      footer={false}
      visible={isVisible}
      closable={!isLoading}
      onCancel={handleCancel}
      centered
      maskClosable={!isLoading}
    >
      <div className="m-10">
        <div className="text-2xl font-bold  text-ox-dark mb-10">NEW TRUCK</div>

        <Form
          name="CreateTruck"
          onFinish={onFinish}
          layout="vertical"
          form={form}
          title="Plate number"
        >
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="plateNumber"
                  type="text"
                  placeholder="Format (AAA 000 A)"
                  inputType="text"
                  label="Plate number"
                  rules={requiredField("Plate number")}
                />
              </div>
            </div>
            <div className="flex-1">
              <Input
                name="yearManufactured"
                type="select"
                label="Year"
                placeholder="Year"
                options={years}
                rules={requiredField("Year")}
              />
            </div>
          </div>

          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="model"
                  type="select"
                  label="Modal"
                  placeholder="Modal"
                  rules={requiredField("Modal")}
                  options={[
                    { label: "BMW", value: "BMW" },
                    { label: "Benz", value: "Benz" }
                  ]}
                />
              </div>
            </div>

            <div className="flex-1">
              <Input
                name="type"
                type="select"
                label="Category"
                placeholder="Category"
                rules={requiredField("Category")}
                options={[
                  { label: "Pickup", value: "PICKUP" },
                  { label: "Col truck", value: "COLD_TRUCK" },
                  { label: "Long haul", value: "LONG_HAUL" }
                ]}
              />
            </div>
          </div>

          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="fuelCardAssigned"
                  type="text"
                  placeholder="Enter fuel card assigned"
                  inputType="text"
                  rules={requiredField("Fuel card")}
                  label="Fuel card assigned"
                />
              </div>
            </div>

            <div className="flex-1">
              <Input
                name="fuelType"
                type="select"
                label="Fuel type"
                placeholder="Choose fuel type"
                rules={requiredField("Fuel type")}
                options={[
                  { label: "Diesel", value: "DIESEL" },
                  { label: "Petrol", value: "PETROL" },
                  { label: "Electricity", value: "ELECTRICITY" }
                ]}
              />
            </div>
          </div>

          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="engineNumber"
                  type="text"
                  placeholder="Enter engine number"
                  inputType="text"
                  label="Engine number"
                  rules={requiredField("Engine number")}
                />
              </div>
            </div>

            <div className="flex-1">
              <Input
                name="engineOilType"
                type="text"
                placeholder="Enter engine oil type"
                rules={requiredField("Engine oil type")}
                inputType="text"
                label="Engine oil type"
              />
            </div>
          </div>

          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="capacity"
                  type="text"
                  placeholder="Enter weight capacity"
                  inputType="text"
                  label="Weight capacity"
                  rules={requiredField("Capacity")}
                />
              </div>
            </div>

            <div className="flex-1">
              <Input
                name="chassisNumber"
                type="text"
                placeholder="Enter chassis number"
                inputType="text"
                label="Chassis number"
                rules={requiredField("Chassis number")}
              />
            </div>
          </div>

          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="tireSize"
                  type="text"
                  placeholder="Enter tire size"
                  inputType="text"
                  label="Tire size"
                  rules={requiredField("Tire size")}
                />
              </div>
            </div>

            <div className="flex-1">
              <Input
                name="tireBrand"
                type="text"
                placeholder="Enter tire brand"
                inputType="text"
                label="Tire brand"
                rules={requiredField("Tire brand")}
              />
            </div>
          </div>

          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="trackingUnitSerialNumber"
                  type="text"
                  placeholder="Enter trucking unit serial number"
                  inputType="text"
                  label="Tracking unit serial number"
                  rules={requiredField("Serial number")}
                />
              </div>
            </div>

            <div className="flex-1">
              <Input
                name="depotId"
                type="select"
                label="Depot"
                placeholder="Choose depot"
                options={[
                  { label: "Depot one", value: 1 },
                  { label: "Depot two", value: 2 }
                ]}
                rules={requiredField("Depot")}
              />
            </div>
          </div>

          <div className="flex gap-10 mb-5">
            <div className="flex-1"></div>

            <div className="flex-1">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                ADD TRUCK
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default NewTruckModal;
