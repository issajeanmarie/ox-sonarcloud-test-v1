/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Popover, Row, Select } from "antd";
import React, { FC, useEffect } from "react";
import { requiredField } from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import Image from "next/image";
import WarehouseItemsTable from "../../../Tables/Warehouse/WarehouseItemsTable";
import { YellowCheckIcon } from "../../../Icons";
import { AddWarehouseOrderTypes } from "../../../../lib/types/warehouse";
import { useUnPaginatedTrucksQuery } from "../../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { useDepotsQuery } from "../../../../lib/api/endpoints/Depots/depotEndpoints";
import { useWarehouseItemsQuery } from "../../../../lib/api/endpoints/Warehouse/stockEndpoints";
import DriverSearch from "../../../Shared/Input/DriverSearch";
import ClientSearch from "../../../Shared/Input/ClientSearch";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useClientQuery } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import moment from "moment";
import { useDriverQuery } from "../../../../lib/api/endpoints/Accounts/driversEndpoints";
import { useState } from "react";

const { Option } = Select;

const AddWarehouseOrder: FC<AddWarehouseOrderTypes> = ({
  location,
  setLocation,
  setItems,
  items,
  createItems,
  onTransportChange,
  transport,
  onEditSaleFinish,
  onAddSaleFinish,
  form,
  handleChangeWarehouse,
  warehouse,
  handleChangeWeight,
  weight,
  isAddItemLoading,
  deleteSaleItemAction,
  sale
}) => {
  const [selectedDepot, setSelectedDepot] = useState<number | undefined>();
  const { data: trucks, isLoading: isTrucksLoading } =
    useUnPaginatedTrucksQuery();

  const depotsState = useSelector(
    (state: { depots: { payload: { depotId: number } } }) =>
      state.depots.payload
  );

  const { data: chosenClientInfo, isFetching: isInitialFetching } =
    useClientQuery(sale?.client?.id ? { id: sale?.client?.id } : skipToken);

  const { data: chosenDriverInfo, isFetching: isDriverInitialFetching } =
    useDriverQuery(
      sale?.transportOrder?.stops[0]?.driver?.id
        ? { id: sale?.transportOrder?.stops[0]?.driver?.id }
        : skipToken
    );

  const { data: depots, isLoading: isDepotsLoading } = useDepotsQuery();

  const { data: Stocks, isFetching: isStocksLoading } = useWarehouseItemsQuery({
    page: "",
    size: 100,
    start: "",
    end: "",
    depot: selectedDepot || depotsState.depotId,
    status: "",
    sort: ""
  });

  const handleSelectDepot = (value: number) => {
    form.setFieldsValue({ warehouseId: "" });
    setSelectedDepot(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      depotId: sale?.depot?.id || depotsState.depotId || "",
      clientId: sale?.client?.id || "",
      date: moment(sale?.saleDate),
      driverId: sale?.transportOrder?.stops[0]?.driver?.id,
      truckId: sale?.transportOrder?.stops[0]?.truck?.id,
      Destination:
        sale?.transportOrder?.stops[sale?.transportOrder?.stops?.length - 1]
          ?.location
    });
  }, [
    depotsState.depotId,
    form,
    sale?.client?.id,
    sale?.depot?.id,
    sale?.saleDate,
    sale?.transportOrder?.stops
  ]);

  useEffect(() => {
    sale?.saleItems?.map(
      (item: { weight: number; id: number; warehouseItem: any }) => {
        setItems([
          ...items,
          {
            category: item?.warehouseItem?.category?.name,
            id: item.id,
            parentCategory: undefined,
            weight: item?.weight
          }
        ]);
      }
    );
  }, [sale?.saleItems]);

  const showTruckOnEdit =
    (sale && sale?.transportOrder && transport !== "none") ||
    (!sale && transport !== "none");

  return (
    <Form
      onFinish={onEditSaleFinish || onAddSaleFinish}
      form={form}
      name="AddWarehouseOrder"
      layout="vertical"
      title=""
      id="AddWarehouseOrder"
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="date"
            type="date"
            label="Date"
            suffixIcon={
              <Image
                src="/icons/ic-actions-calendar.svg"
                alt=""
                width={18}
                height={18}
              />
            }
            rules={[{ required: true, message: "Select date" }]}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <ClientSearch
            label="Client"
            isInitialFetching={isInitialFetching}
            name="clientId"
            rules={requiredField("Client")}
            existingValue={chosenClientInfo?.payload}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="depotId"
            type="select"
            placeholder="Select Depot"
            label="Select Depot"
            isLoading={isDepotsLoading}
            disabled={isDepotsLoading}
            onChange={handleSelectDepot}
            isGroupDropdown
          >
            {depots?.payload?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Input>
        </Col>
      </Row>

      <Row className="mt-8">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className="mb-4 mt-4">
            <span className="font-light">Order details</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          {items?.length > 0 && (
            <>
              <div className="mb-4">
                <span className="font-light">Items</span>
              </div>
              <div className="mb-4">
                <WarehouseItemsTable
                  items={items}
                  setItems={setItems}
                  deleteSaleItemAction={deleteSaleItemAction}
                />
              </div>
            </>
          )}
        </Col>
      </Row>

      <Row justify="space-between" gutter={[16, 16]} align="bottom">
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            allowClear
            onChange={handleChangeWarehouse}
            name="warehouseId"
            type="select"
            placeholder="Select item"
            label="Item"
            isLoading={isStocksLoading}
            disabled={isStocksLoading}
            isGroupDropdown
          >
            {Stocks?.payload?.content?.map((item: any) => (
              <Option key={item?.id} value={JSON.stringify(item)}>
                {item?.categoryName} - {item?.weight}KGs
              </Option>
            ))}
          </Input>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Input
            onChange={handleChangeWeight}
            name="weight"
            type="text"
            inputType="number"
            label="KGs"
            placeholder="00"
          />
        </Col>

        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
          {!weight || !warehouse ? (
            <Popover
              placement="left"
              content={
                <div className="flex flex-col">
                  <span className="font-light">Please add item and weight</span>
                  <span className="font-light">to continue!</span>
                </div>
              }
              title={false}
              trigger="click"
            >
              <Button type="secondary" loading={isAddItemLoading}>
                {!isAddItemLoading && YellowCheckIcon}
              </Button>
            </Popover>
          ) : (
            <>
              {weight > warehouse?.weight ? (
                <Popover
                  placement="left"
                  content={
                    <div className="flex flex-col">
                      <span className="font-light">Weight must be</span>
                      <span className="font-light">
                        less than or equal to {warehouse?.weight}
                      </span>
                    </div>
                  }
                  title={false}
                  trigger="click"
                >
                  <Button type="secondary" loading={isAddItemLoading}>
                    {!isAddItemLoading && YellowCheckIcon}
                  </Button>
                </Popover>
              ) : weight % 50 !== 0 ? (
                <Popover
                  placement="left"
                  content={
                    <div className="flex flex-col">
                      <span className="font-light">
                        Weight must be divisible by 50 KGs
                      </span>
                    </div>
                  }
                  title={false}
                  trigger="click"
                >
                  <Button type="secondary" loading={isAddItemLoading}>
                    {!isAddItemLoading && YellowCheckIcon}
                  </Button>
                </Popover>
              ) : (
                <Button
                  onClick={() => createItems()}
                  type="secondary"
                  loading={isAddItemLoading}
                >
                  {!isAddItemLoading && YellowCheckIcon}
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={[16, 16]}
        align="bottom"
        className="mt-4"
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className="mb-1 mt-4">
            <span className="font-light">Transport</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            onChange={onTransportChange}
            name="transport"
            type="select"
            placeholder="Select Transport"
            label="Transport"
            isGroupDropdown
          >
            <Option value="none">None</Option>
            <Option value="local">Local</Option>
          </Input>
        </Col>

        {transport !== "none" && (
          <>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Input
                name="localTransportCost"
                type="text"
                inputType="number"
                label="Local price"
                placeholder="00"
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Input
                name="truckId"
                type="select"
                placeholder="Select Truck"
                label="Truck"
                isLoading={isTrucksLoading}
                disabled={isTrucksLoading}
                isGroupDropdown
              >
                {trucks?.payload?.map((item: any) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.plateNumber}
                  </Option>
                ))}
              </Input>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              {showTruckOnEdit && (
                <DriverSearch
                  isDriverInitialFetching={isDriverInitialFetching}
                  name="driverId"
                  label="Driver"
                  rules={requiredField("Driver")}
                  existingValue={chosenDriverInfo?.payload}
                />
              )}
            </Col>
          </>
        )}

        <Col
          xs={24}
          sm={24}
          md={transport === "none" ? 12 : 24}
          lg={transport === "none" ? 12 : 24}
          xl={transport === "none" ? 12 : 24}
          xxl={transport === "none" ? 12 : 24}
        >
          <Input
            name="Destination"
            type="location"
            label="Destination"
            placeholder="Search location"
            setLocation={setLocation}
            location={location}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AddWarehouseOrder;
