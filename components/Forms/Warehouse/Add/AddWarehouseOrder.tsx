/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Popover, Row, Select } from "antd";
import React, { FC } from "react";
import { requiredField } from "../../../../lib/validation/InputValidations";
import Input from "../../../Shared/Input";
import Button from "../../../Shared/Button";
import Image from "next/image";
import WarehouseItemsTable from "../../../Tables/Warehouse/WarehouseItemsTable";
import { YellowCheckIcon } from "../../../Icons";
import { AddWarehouseOrderTypes } from "../../../../lib/types/warehouse";
import { useUnPaginatedTrucksQuery } from "../../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { useDepotsQuery } from "../../../../lib/api/endpoints/Depots/depotEndpoints";
import { useStockQuery } from "../../../../lib/api/endpoints/Warehouse/stockEndpoints";
import DriverSearch from "../../../Shared/Input/DriverSearch";
import ClientSearch from "../../../Shared/Input/ClientSearch";
import Link from "next/link";
import { routes } from "../../../../config/route-config";

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
  handleChangeWarehouse,
  warehouse,
  handleChangeWeight,
  weight
}) => {
  const colSize = transport === "none" ? 12 : 8;

  const { data: trucks, isLoading: isTrucksLoading } =
    useUnPaginatedTrucksQuery();

  const { data: depots, isLoading: isDepotsLoading } = useDepotsQuery();

  const { data: Stocks, isLoading: isStocksLoading } = useStockQuery({
    page: "",
    size: 1000000,
    start: "",
    end: "",
    depot: "",
    status: "",
    sort: ""
  });

  return (
    <Form
      onFinish={onAddSaleFinish}
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
            name="clientId"
            rules={requiredField("Client")}
            label={
              <div className="flex justify-between items-center">
                <span className="font-bold">Client name</span>
                <Link href={routes.Clients.url} passHref>
                  <span className="font-bold underline cursor-pointer">
                    New client
                  </span>
                </Link>
              </div>
            }
          />
        </Col>
      </Row>

      <Row className="mt-8">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          {items.length > 0 && (
            <>
              <div className="mb-4">
                <span className="font-light">Items</span>
              </div>
              <div className="mb-4">
                <WarehouseItemsTable items={items} setItems={setItems} />
              </div>
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
                {item?.category?.name} - {item?.weight}KGs
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
                  <span className="font-light">Item and weight </span>
                  <span className="font-light">please</span>
                </div>
              }
              title={false}
              trigger="click"
            >
              <Button type="secondary">{YellowCheckIcon}</Button>
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
                  <Button type="secondary">{YellowCheckIcon}</Button>
                </Popover>
              ) : (
                <Button onClick={() => createItems()} type="secondary">
                  {YellowCheckIcon}
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
          <div className="mb-4 mt-4">
            <span className="font-light">Transport</span>
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={colSize}
          lg={colSize}
          xl={colSize}
          xxl={colSize}
        >
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
              inputType="number"
              label="Local"
              placeholder="00"
            />
          </Col>
        )}

        <Col
          xs={24}
          sm={24}
          md={colSize}
          lg={colSize}
          xl={colSize}
          xxl={colSize}
        >
          <Input
            name="marginCost"
            type="text"
            inputType="number"
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
            <DriverSearch name="driverId" label="Driver" />
          )}
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Input
            name="depotId"
            type="select"
            placeholder="Select Depot"
            label="Select Depot"
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
    </Form>
  );
};

export default AddWarehouseOrder;
