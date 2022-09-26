import { FC, useEffect, useMemo, useState } from "react";
import Input from "../../../Shared/Input";
import Image from "next/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "../../../../components/Shared/Button";
import { useCategoriesQuery } from "../../../../lib/api/endpoints/Category/categoryEndpoints";
import { Form, Select } from "antd";
import { useClientQuery } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { AddEditProps } from "../../../../lib/types/components/AddEditProps";
import { OrderRequestBody, Stop_Request } from "../../../../lib/types/orders";
import { LatLng } from "use-places-autocomplete";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { Office } from "../../../../lib/types/shared";
import { Category } from "../../../../lib/types/categories";
import { useLazyGetTrucksQuery } from "../../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { DriverSchema, TruckSchema } from "../../../../lib/types/trucksTypes";
import { useDepotsQuery } from "../../../../lib/api/endpoints/Depots/depotEndpoints";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import DriverSearch from "../../../Shared/Input/DriverSearch";
import { requiredField } from "../../../../lib/validation/InputValidations";
import ClientSearch from "../../../Shared/Input/ClientSearch";
import { useRouter } from "next/router";
import { routes } from "../../../../config/route-config";
import {
  getFromLocal,
  saveToLocal
} from "../../../../helpers/handleLocalStorage";
import { OX_NEW_ORDER_VALUES } from "../../../../config/constants";
import { useDriverQuery } from "../../../../lib/api/endpoints/Accounts/driversEndpoints";
import { useSelector } from "react-redux";

const { Option, OptGroup } = Select;

const AddEditOrder: FC<AddEditProps> = ({ title, form, addOrderAction }) => {
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery();

  const router = useRouter();

  const depotsState = useSelector(
    (state: { depots: { payload: { depotId: number } } }) =>
      state.depots.payload
  );

  const [getTrucks, { data, isLoading: trucksLoading }] =
    useLazyGetTrucksQuery();
  const [chosenClientId, setChosenClientId] = useState<number>();
  const [chosenDriverId, setChosenDriverId] = useState<number>();
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
  } = useClientQuery(chosenClientId ? { id: chosenClientId } : skipToken);
  const { data: chosenDriverInfo, isFetching: isDriverInitialFetching } =
    useDriverQuery(chosenDriverId ? { id: chosenDriverId } : skipToken);

  const { data: drivers, isLoading: driversLoading } = useDriversQuery({
    noPagination: true
  });

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

  const { data: depots, isLoading: depotsLoading } = useDepotsQuery();

  const onValuesChange = (
    changedValues: OrderRequestBody,
    allValues: OrderRequestBody
  ) => {
    saveToLocal({
      name: OX_NEW_ORDER_VALUES,
      value: { ...allValues, location }
    });
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
    handleAPIRequests({
      request: getTrucks,
      page: 0,
      noPagination: true,
      showFailure: true
    });
  }, [getTrucks]);

  useEffect(() => {
    form.setFieldsValue({
      stop1: location?.name
    });
  }, [form, location]);

  useEffect(() => {
    stopDetailsForm.setFieldsValue({
      subStop: subStopLocation?.name
    });
  }, [stopDetailsForm, subStopLocation]);

  useMemo(() => {
    form.setFieldsValue({
      branchId: null
    });
  }, [form]);

  useEffect(() => {
    const values = getFromLocal(OX_NEW_ORDER_VALUES);
    setChosenClientId(values?.clientId);
    setLocation(values?.location);
    setChosenDriverId(values?.driverId);

    form.setFieldsValue({
      clientId: values?.clientId,
      officeId: values?.officeId,
      paymentPlan: values?.paymentPlan,
      startDateTime: moment(values?.startDateTime),
      categoryId: values?.categoryId,
      weight: values?.weight,
      driverId: values?.driverId,
      depotId: depotsState?.depotId || values?.depotId,
      amount: values?.amount,
      truckId: values?.truckId,
      stop1: values?.stop1
    });
  }, [form]);

  return (
    <div>
      <div className="text-2xl font-bold text-ox-dark mb-10">{title}</div>
      <Form
        name="Login"
        form={form}
        layout="vertical"
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
                <Row
                  onClick={() => router.push(routes.Client.url)}
                  className="link animate"
                >
                  <Col>New client</Col>
                </Row>
              </div>

              <div>
                <ClientSearch
                  isInitialFetching={chosenClientLoading}
                  name="clientId"
                  rules={requiredField("Client")}
                  existingValue={chosenClientInfo?.payload}
                />
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
                isLoading={chosenClientLoading || isFetching}
                disabled={
                  chosenClientLoading || isFetching || !chosenClientInfo
                }
                isGroupDropdown
                rules={[{ required: true, message: "Branch is required" }]}
              >
                {chosenClientInfo?.payload?.offices.map((office: Office) => (
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
                  rules={requiredField("Start date")}
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
                rules={requiredField("Stop location")}
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
                  rules={requiredField("Category")}
                >
                  {categories?.payload?.map((el: Category) => {
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
                rules={requiredField("Weight")}
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
                  rules={requiredField("Plan")}
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
                rules={requiredField("Rate")}
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

                  <Row
                    onClick={() => router.push(routes.Trucks.url)}
                    className="link animate"
                  >
                    <Col>New truck</Col>
                  </Row>
                </div>
                <div>
                  <Input
                    name="truckId"
                    type="select"
                    placeholder="Select truck"
                    isLoading={trucksLoading}
                    disabled={trucksLoading}
                    isGroupDropdown
                    rules={requiredField("Truck")}
                  >
                    {data?.payload?.map((truck: TruckSchema) => {
                      return (
                        <Option value={truck.id} key={truck.plateNumber}>
                          {truck.plateNumber}
                        </Option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="heading2">Driver</span>

                  <Row
                    onClick={() => router.push(routes.Accounts.url)}
                    className="link animate"
                  >
                    <Col>New driver</Col>
                  </Row>
                </div>
                <div>
                  <DriverSearch
                    isDriverInitialFetching={isDriverInitialFetching}
                    name="driverId"
                    label=""
                    rules={requiredField("Driver")}
                    existingValue={chosenDriverInfo?.payload}
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
                  isGroupDropdown
                  isLoading={depotsLoading}
                  disabled={depotsLoading}
                  options={[{ label: "Tyazo Depot", value: 1 }]}
                  rules={requiredField("Depot")}
                >
                  {depots?.payload.map((dp) => {
                    return (
                      <Option value={dp.id} key={dp.name}>
                        {dp.name}
                      </Option>
                    );
                  })}
                </Input>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </Form>

        {/* Truck details */}

      <div className="mb-14">
        <div className="font-extralight text-[15px] mb-10">Stop details</div>
        {stops?.length !== 0 && (
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
                rules={requiredField("Location")}
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
