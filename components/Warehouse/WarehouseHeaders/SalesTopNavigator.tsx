import React, { FC, useState } from "react";
import Image from "next/image";
import { SalesTopNavigatorTypes } from "../../../lib/types/pageTypes/Warehouse/Sales/SalesTopNavigator";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";
import { localeString } from "../../../utils/numberFormatter";
import Button from "../../Shared/Button";
import ModalWrapper from "../../Modals/ModalWrapper";
import AddWarehouseOrder from "../../Forms/Warehouse/Add/AddWarehouseOrder";
import { LatLng } from "use-places-autocomplete";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { Form } from "antd";
import { usePostSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";

const SalesTopNavigator: FC<SalesTopNavigatorTypes> = ({
  showModal,
  setIsModalVisible,
  isModalVisible
}) => {
  const [form] = Form.useForm();
  const [items, setItems]: any = useState([]);
  const [warehouse, setWarehouse] = useState("");
  const [transport, setTransport] = useState("");
  const [location, setLocation] = useState<{
    name: string;
    coordinates: LatLng;
  }>();

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

  const [postSale, { isLoading: isPostingSale }] = usePostSaleMutation();

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

  const LeftSide = <Heading1>{localeString(12)} Orders</Heading1>;

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className={` p-2 flex items-center justify-center`}>
        <Image
          width={16}
          height={16}
          src="/icons/filter.svg"
          className="cursor-pointer"
          alt="Filter icon"
        />
      </div>

      <div className="flex items-center gap-6 w-[160px]">
        <Button type="secondary">DOWNLOAD REPORT</Button>
      </div>

      <div className="flex items-center gap-6 w-[140px]">
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
        loading={false}
      >
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
      </ModalWrapper>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default SalesTopNavigator;
