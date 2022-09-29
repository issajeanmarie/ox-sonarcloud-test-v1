/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row, Select } from "antd";
import React, { FC } from "react";
import { requiredInput } from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import Image from "next/image";
import WarehouseItemsTable from "../../../Tables/Warehouse/WarehouseItemsTable";
import { YellowCheckIcon } from "../../../Icons";
import { AddWarehouseOrderTypes } from "../../../../lib/types/warehouse";
import { useClientsUnpaginatedQuery } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { useUnPaginatedTrucksQuery } from "../../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { useDriversQuery } from "../../../../lib/api/endpoints/Accounts/driversEndpoints";
import { useDepotsQuery } from "../../../../lib/api/endpoints/Depots/depotEndpoints";
import { useStockQuery } from "../../../../lib/api/endpoints/Warehouse/stockEndpoints";

const { Option } = Select;

const AddWarehouseOrder: FC<AddWarehouseOrderTypes> = ({
  location,
  setLocation,
  setItems,
  items,
  createItems,
  onTransportChange,
  transport,
  onAddSaleFinish,
  form,
  handleChangeWarehouse
}) => {
  const { data: clients, isLoading: isClientsLoading } =
    useClientsUnpaginatedQuery();
  const { data: trucks, isLoading: isTrucksLoading } =
    useUnPaginatedTrucksQuery();

  const { data: drivers, isLoading: driversLoading } = useDriversQuery({
    noPagination: true
  });

  const { data: depots, isLoading: isDepotsLoading } = useDepotsQuery();

  const { data: Stocks, isLoading: isStocksLoading } = useStockQuery({
    page: "",
    size: "",
    start: "",
    end: "",
    depot: "",
    status: ""
  });

  return (
    <Form
      onFinish={onAddSaleFinish}
      form={form}
      name="AddWarehouseOrder"
      layout="vertical"
      title=""
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
          <Input
            name="clientId"
            type="select"
            placeholder="Select client name"
            label="Client name"
            isLoading={isClientsLoading}
            disabled={isClientsLoading}
            isGroupDropdown
            rules={requiredInput}
          >
            {clients?.payload?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {item?.names}
              </Option>
            ))}
          </Input>
        </Col>
      </Row>

      <Row className="mt-8">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className="mb-4">
            <span className="font-light">Items</span>
          </div>
          {items.length > 0 && (
            <div className="mb-4">
              <WarehouseItemsTable items={items} setItems={setItems} />
            </div>
          )}
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={[16, 16]}
        align="bottom"
        className="mt-4"
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
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
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Input>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Input name="weight" type="text" label="KGs" placeholder="00" />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
          <Button onClick={() => createItems()} type="secondary">
            {YellowCheckIcon}
          </Button>
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={[16, 16]}
        align="bottom"
        className="mt-4"
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className="mb-4 mt-4">
            <span className="font-light">Transport</span>
          </div>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
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
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Input
              name="localTransportCost"
              type="text"
              label="Local"
              placeholder="00"
            />
          </Col>
        )}

        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Input
            name="marginCost"
            type="text"
            label="Margin"
            placeholder="00"
          />
        </Col>
      </Row>

      <Row className="mt-4" justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          {transport !== "none" && (
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
          )}
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          {transport !== "none" && (
            <Input
              name="driverId"
              type="select"
              placeholder="Select Driver"
              label="Driver"
              isLoading={driversLoading}
              disabled={driversLoading}
              isGroupDropdown
            >
              {drivers?.payload?.map((item: any) => (
                <Option key={item?.id} value={item?.id}>
                  {item?.names}
                </Option>
              ))}
            </Input>
          )}
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="depotId"
            type="select"
            placeholder="Select depot"
            label="Select depot"
            isLoading={isDepotsLoading}
            disabled={isDepotsLoading}
            isGroupDropdown
          >
            {depots?.payload?.map((item: any) => (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Input>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
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

      <Row justify="end" className="mt-7">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Button type="primary" htmlType="submit">
            CONFIRM ORDER
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddWarehouseOrder;
