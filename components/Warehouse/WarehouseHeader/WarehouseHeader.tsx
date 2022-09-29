/* eslint-disable @typescript-eslint/no-explicit-any */
import "react";
import Button from "../../Shared/Button";
// import Image from "next/image";
import { FC, useState } from "react";
import { WarehouseHeaderTypes } from "../../../lib/types/pageTypes/Warehouse/Sales/WarehouseHeaderTypes";
import ModalWrapper from "../../Modals/ModalWrapper";
import DropDownSelector from "../../Shared/DropDownSelector";
import AddWarehouseOrder from "../../Forms/Warehouse/Add/AddWarehouseOrder";
import AddStock from "../../Forms/Warehouse/Add/AddStock";
import AddSupplier from "../../Forms/Warehouse/Add/AddSupplier";
import { LatLng } from "use-places-autocomplete";
import { usePostStockMutation } from "../../../lib/api/endpoints/Warehouse/stockEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { Form } from "antd";
import { useCategoriesQuery } from "../../../lib/api/endpoints/Category/categoryEndpoints";
import { useLhsOrdersQuery } from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import { useDepotsQuery } from "../../../lib/api/endpoints/Depots/depotEndpoints";
import {
  usePostSupplierMutation,
  useSuppliersQuery
} from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { usePostSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";

const WarehouseHeader: FC<WarehouseHeaderTypes> = ({
  setIsModalVisible,
  isModalVisible,
  showModal,
  query,
  setSort,
  sort,
  data,
  dataLoading
}) => {
  const [form] = Form.useForm();
  const [items, setItems]: any = useState([]);
  const [warehouse, setWarehouse] = useState("");
  const [transport, setTransport] = useState("");
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const { data: lhsOrders, isLoading: isLhsOrdersLoading } =
    useLhsOrdersQuery();

  const { data: suppliers, isLoading: isSuppliersLoading } = useSuppliersQuery({
    page: "",
    size: 10000000,
    sort: ""
  });

  const { data: depots, isLoading: isDepotsLoadind } = useDepotsQuery();
  const [postStock, { isLoading: isAddingStock }] = usePostStockMutation();
  const [postSupplier, { isLoading: isAddingSupplier }] =
    usePostSupplierMutation();
  const [postSale, { isLoading: isPostingSale }] = usePostSaleMutation();

  //SALES
  const onTransportChange = (value: string) => {
    setTransport(value);
  };
  const createItems = () => {
    setItems([
      ...items,
      {
        id: warehouse,
        weight: ""
      }
    ]);
    setLocation(undefined);
  };

  const handleChangeWarehouse = (value: string) => {
    setWarehouse(value);
  };

  const onAddSaleFinish = (values: any) => {
    postSale({
      depotId: values?.depotId,
      warehouseId: values?.warehouseId,
      date: values?.date,
      clientId: values?.clientId,
      items: items,
      marginCost: values?.marginCost,
      localTransportCost: values?.localTransportCost,
      truckId: values?.truckId,
      driverId: values?.driverId,
      destination: {
        name: location ? location?.name : "",
        location: location ? location?.name : "",
        coordinates: location ? JSON.stringify(location?.coordinates) : ""
      }
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(
          err?.data?.payload
            ? err?.data?.payload[0]?.messageError
            : err?.data?.message
        )
      );
  };

  //STOCK
  const onAddStockFinish = (values: any) => {
    postStock({
      inDate: values?.inDate,
      expiryDate: values?.expiryDate,
      supplierId: values?.supplierId,
      weight: values?.weight,
      unitCost: values?.unitCost,
      depotId: values?.depotId,
      categoryId: values?.SubCategory,
      lhsOrderId: values?.lhsOrderId
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(
          err?.data?.payload
            ? err?.data?.payload[0]?.messageError
            : err?.data?.message
        )
      );
  };

  //SUPPLIER
  const onAddSupplierFinish = (values: any) => {
    postSupplier({
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      location: location ? location?.name : "",
      coordinates: location ? JSON.stringify(location?.coordinates) : "",
      tinNumber: values?.tinNumber,
      economicStatus: values?.economicStatus
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setLocation(undefined);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(
          err?.data?.payload
            ? err?.data?.payload[0]?.messageError
            : err?.data?.message
        )
      );
  };

  return (
    <>
      <div className="flex items-center justify-between rounded shadow-[0px_0px_19px_#00000008] bg-white  px-4 py-3">
        <div className="flex gap-10 items-center">
          {query?.wtb === "SALES" && (
            <div className="text-[17px] font-bold flex items-center gap-5">
              {dataLoading ? (
                <span>...</span>
              ) : (
                <>
                  {data?.totalElements !== 0 && (
                    <>
                      {data?.totalElements &&
                        numbersFormatter(data?.totalElements)}{" "}
                    </>
                  )}
                </>
              )}
              {data?.totalElements === 0 ? (
                "No Orders"
              ) : (
                <>{data?.totalElements === 1 ? "Order" : "Orders"}</>
              )}
            </div>
          )}

          {query?.wtb === "STOCK" && (
            <div className="text-[17px] font-bold flex items-center gap-5">
              {dataLoading ? (
                <span>...</span>
              ) : (
                <>
                  {data?.totalElements !== 0 && (
                    <>
                      {data?.totalElements &&
                        numbersFormatter(data?.totalElements)}{" "}
                    </>
                  )}
                </>
              )}
              {data?.totalElements === 0 ? (
                "No Items"
              ) : (
                <>{data?.totalElements === 1 ? "Item" : "Items"}</>
              )}
            </div>
          )}

          {query?.wtb === "SUPPLIERS" && (
            <div className="text-[17px] font-bold flex items-center gap-5">
              {dataLoading ? (
                <span>...</span>
              ) : (
                <>
                  {data?.totalElements !== 0 && (
                    <>
                      {data?.totalElements &&
                        numbersFormatter(data?.totalElements)}{" "}
                    </>
                  )}
                </>
              )}
              {data?.totalElements === 0 ? (
                "No Suppliers"
              ) : (
                <>{data?.totalElements === 1 ? "Supplier" : "Suppliers"}</>
              )}
            </div>
          )}

          {query?.wtb === "SUPPLIERS" || query?.wtb === "STOCK" ? (
            <DropDownSelector
              label="Sort"
              dropDownContent={[
                { id: 0, name: "Z-A (Names)", value: "NAMES_DESC" },
                { id: 1, name: "A-Z (Names)", value: "NAMES_ASC" },
                { id: 2, name: "Z-A (Date)", value: "DATE_DESC" },
                { id: 3, name: "A-Z (Date)", value: "DATE_ASC" }
              ]}
              defaultSelected={sort}
              setDefaultSelected={setSort}
            />
          ) : null}
        </div>

        <div className="flex items-center gap-5">
          {/* <Image
            width={16}
            height={16}
            src="/icons/filter.svg"
            className="cursor-pointer"
            alt="Filter icon"
          /> */}
          {/* {query?.wtb === "SALES" && "filter icon"} */}

          {query?.wtb === "SALES" && (
            <Button type="secondary">DOWNLOAD REPORT</Button>
          )}

          {query?.wtb === "SALES" && (
            <Button onClick={showModal} type="primary">
              NEW ORDER
            </Button>
          )}

          {query?.wtb === "STOCK" && (
            <Button onClick={showModal} type="primary">
              NEW STOCK
            </Button>
          )}

          {query?.wtb === "SUPPLIERS" && (
            <Button onClick={showModal} type="primary">
              NEW SUPPLIER
            </Button>
          )}
        </div>
      </div>

      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title={
          <>
            {query?.wtb === "SALES" && "NEW WAREHOUSE ORDER"}
            {query?.wtb === "STOCK" && "NEW WAREHOUSE ITEM"}
            {query?.wtb === "SUPPLIERS" && "NEW OX SUPPLIER"}
          </>
        }
        loading={isAddingSupplier}
      >
        {query?.wtb === "SALES" && (
          <AddWarehouseOrder
            createItems={createItems}
            setItems={setItems}
            items={items}
            setLocation={setLocation}
            location={location}
            handleChangeWarehouse={handleChangeWarehouse}
            onTransportChange={onTransportChange}
            transport={transport}
            isPostingSale={isPostingSale}
            onAddSaleFinish={onAddSaleFinish}
            form={form}
          />
        )}
        {query?.wtb === "STOCK" && (
          <AddStock
            onAddStockFinish={onAddStockFinish}
            isAddingStock={isAddingStock}
            form={form}
            categories={categories?.payload}
            isCategoriesLoading={isCategoriesLoading}
            orders={lhsOrders?.payload?.content}
            isOrdersLoading={isLhsOrdersLoading}
            depots={depots?.payload}
            isDepotsLoading={isDepotsLoadind}
            suppliers={suppliers}
            isSuppliersLoading={isSuppliersLoading}
          />
        )}
        {query?.wtb === "SUPPLIERS" && (
          <AddSupplier
            onAddSupplierFinish={onAddSupplierFinish}
            form={form}
            isLoading={isAddingSupplier}
            setLocation={setLocation}
            location={location}
          />
        )}
      </ModalWrapper>
    </>
  );
};

export default WarehouseHeader;
