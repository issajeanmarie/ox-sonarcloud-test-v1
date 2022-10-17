import Form from "antd/lib/form";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import {
  useCreateTruckMutation,
  useEditTruckMutation
} from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { yearsList } from "../../helpers/yearsList";
import { useDispatch, useSelector } from "react-redux";
import { useDepotsQuery } from "../../lib/api/endpoints/Depots/depotEndpoints";
import { CreateTruckRequest } from "../../lib/types/trucksTypes";
import { displaySingleTruck } from "../../lib/redux/slices/trucksSlice";
import { requiredField } from "../../lib/validation/InputValidations";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useEffect } from "react";
import ModalWrapper from "../Modals/ModalWrapper";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";

type Types = {
  isVisible: boolean;
  setIsVisible: any;
  editTruckData?: any;
  setEditTruckData?: any;
  setIsUserEditing?: any;
  isUserEditing?: boolean;
  fromTruckProfile?: boolean | undefined;
};

type SingleTruckTypes = {
  id: number;
  plateNumber: string;
  lastInspection: any;
  model: string;
  capacity: number;
  active: boolean;
};

const NewTruckModal = ({
  isVisible,
  setIsVisible,
  editTruckData,
  setEditTruckData,
  isUserEditing,
  setIsUserEditing,
  fromTruckProfile
}: Types) => {
  const years = yearsList().map((year) => ({ label: `${year}`, value: year }));

  const [form] = Form.useForm();

  const { data } = useDepotsQuery();
  const [createTruck, { isLoading }] = useCreateTruckMutation();
  const trucksState = useSelector(
    (state: any) => state.paginatedData.displayPaginatedData
  );
  const [editTruck, { isLoading: isEditTruckLoading }] = useEditTruckMutation();
  const dispatch = useDispatch();

  const depots = data?.payload?.map((depot) => ({
    label: `${depot.name}`,
    value: depot.id
  }));

  const handleCreateTruckSuccess = (res: any) => {
    handleCancel();
    dispatch(displayPaginatedData(res));
  };

  const handleEditTruckSuccess = (res: any) => {
    if (!fromTruckProfile) {
      const newResult: object[] = [];

      trucksState?.payload?.content?.map((result: SingleTruckTypes) => {
        if (result.id !== res?.payload?.id) {
          newResult.push(result);
        } else {
          newResult.push(res?.payload);
        }
      });

      const newPayload = {
        payload: {
          totalElements: trucksState?.payload?.totalElements,
          totalPages: trucksState?.payload?.totalPages,
          content: newResult
        }
      };

      dispatch(displayPaginatedData({ payload: newPayload, replace: true }));
    } else {
      dispatch(displaySingleTruck(res?.payload));
    }

    handleCancel();
  };

  const onFinish = (values: CreateTruckRequest) => {
    if (isUserEditing) {
      handleAPIRequests({
        request: editTruck,
        handleSuccess: handleEditTruckSuccess,
        successMessage: "Truck updated successfully!",
        showSuccess: true,
        id: editTruckData?.id,
        ...values
      });

      return;
    }

    handleAPIRequests({
      request: createTruck,
      handleSuccess: handleCreateTruckSuccess,
      showSuccess: true,
      successMessage: "Truck created successfully!",
      ...values
    });
  };

  const handleCancel = () => {
    setIsVisible(false);
    setEditTruckData && setEditTruckData(null);
    setIsUserEditing && setIsUserEditing(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      plateNumber: editTruckData?.plateNumber || "",
      yearManufactured: editTruckData?.yearManufactured || "",
      model: editTruckData?.model || "",
      type: editTruckData?.type || "",
      fuelCardAssigned: editTruckData?.fuelCardAssigned || "",
      fuelType: editTruckData?.fuelType || "",
      engineNumber: editTruckData?.engineNumber || "",
      engineOilType: editTruckData?.engineOilType || "",
      capacity: editTruckData?.capacity || "",
      chassisNumber: editTruckData?.chassisNumber || "",
      tireSize: editTruckData?.tireSize || "",
      tireBrand: editTruckData?.tireBrand || "",
      trackingUnitSerialNumber: editTruckData?.trackingUnitSerialNumber || "",
      depotId: editTruckData?.depot?.id || ""
    });
  }, [editTruckData, form]);

  return (
    <ModalWrapper
      title={
        isUserEditing
          ? `EDIT TRUCK - ${editTruckData?.plateNumber || "Unknown"}`
          : "NEW TRUCK"
      }
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={isLoading}
      onCancel={handleCancel}
      destroyOnClose
    >
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
                type="text"
                label="Model"
                placeholder="Model"
                rules={requiredField("Model")}
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
                { label: "Cold truck", value: "COLD_TRUCK" },
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
              depotId
              name="depotId"
              type="select"
              label="Depot"
              placeholder="Choose depot"
              options={depots}
              rules={requiredField("Depot")}
            />
          </div>
        </div>

        <div className="flex gap-10 mb-5">
          <div className="flex-1"></div>

          <div className="flex-1">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading || isEditTruckLoading}
            >
              {isUserEditing ? "EDIT" : "ADD"} TRUCK
            </Button>
          </div>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default NewTruckModal;
