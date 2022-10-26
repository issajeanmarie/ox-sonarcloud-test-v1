import React, { FC, useState } from "react";
import Image from "next/image";
import { SalesTopNavigatorTypes } from "../../../lib/types/pageTypes/Warehouse/Sales/SalesTopNavigator";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";
import Button from "../../Shared/Button";
import ModalWrapper from "../../Modals/ModalWrapper";
import AddWarehouseOrder from "../../Forms/Warehouse/Add/AddWarehouseOrder";
import { LatLng } from "use-places-autocomplete";
import { Form } from "antd";
import { usePostSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { useDispatch } from "react-redux";

const SalesTopNavigator: FC<SalesTopNavigatorTypes> = ({
  showModal,
  setIsModalVisible,
  isModalVisible,
  totalElements,
  isSalesLoading
}) => {
  const [form] = Form.useForm();
  const [items, setItems]: any = useState([]);
  const [warehouse, setWarehouse] = useState("");
  const [weight, setWeight] = useState<number | null>(null);
  const [transport, setTransport] = useState("");
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

  const dispatch = useDispatch();

  const onTransportChange = (value: string) => {
    setTransport(value);
  };

  const createItems = () => {
    setItems([
      ...items,
      {
        id: warehouse ? JSON.parse(warehouse)?.id : warehouse,
        weight: weight,
        parentCategory: warehouse
          ? JSON.parse(warehouse)?.category?.parentCategory?.name
          : "",
        category: warehouse ? JSON.parse(warehouse)?.category?.name : ""
      }
    ]);
    setWarehouse("");
    setWeight(null);
    form.resetFields(["warehouseId", "weight"]);
  };

  const handleChangeWarehouse = (value: string) => {
    setWarehouse(value);
  };

  const handleChangeWeight = (value: number | null) => {
    setWeight(value);
  };

  const [postSale, { isLoading: isPostingSale }] = usePostSaleMutation();

  const handleAddSaleSuccess = ({ payload }: any) => {
    form.resetFields();
    setIsModalVisible(false);

    dispatch(displayPaginatedData({ payload }));
  };

  const onAddSaleFinish = (values: any) => {
    handleAPIRequests({
      request: postSale,
      depotId: values?.depotId,
      date: values?.date,
      clientId: values?.clientId,
      items: items,
      marginCost: values?.marginCost,
      localTransportCost:
        transport !== "none" ? values?.localTransportCost : "",
      truckId: transport !== "none" ? values?.truckId : "",
      driverId: transport !== "none" ? values?.driverId : "",
      destination: {
        name: location ? location?.name : "",
        location: location ? location?.name : "",
        coordinates: location ? JSON.stringify(location?.coordinates) : ""
      },
      showSuccess: true,
      handleSuccess: handleAddSaleSuccess
    });
  };

  const LeftSide = (
    <Heading1>
      {isSalesLoading ? (
        "..."
      ) : (
        <>{totalElements && numbersFormatter(totalElements)} Orders</>
      )}
    </Heading1>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className={` p-2 flex items-center justify-center`}>
        {!isSalesLoading && (
          <Image
            width={16}
            height={16}
            src="/icons/filter.svg"
            className="cursor-pointer"
            alt="Filter icon"
          />
        )}
      </div>

      <div className="flex items-center gap-6 w-[120px]">
        <Button onClick={showModal} type="primary">
          NEW ORDER
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW WAREHOUSE ORDER"
        loading={isPostingSale}
        footerContent={
          <Button
            form="AddWarehouseOrder"
            loading={isPostingSale}
            type="primary"
            htmlType="submit"
          >
            CONFIRM ORDER
          </Button>
        }
      >
        <AddWarehouseOrder
          createItems={createItems}
          setItems={setItems}
          items={items}
          setLocation={setLocation}
          location={location}
          handleChangeWarehouse={handleChangeWarehouse}
          warehouse={warehouse ? JSON.parse(warehouse) : warehouse}
          handleChangeWeight={handleChangeWeight}
          weight={weight}
          onTransportChange={onTransportChange}
          transport={transport}
          isPostingSale={isPostingSale}
          onAddSaleFinish={onAddSaleFinish}
          form={form}
        />
      </ModalWrapper>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default SalesTopNavigator;
