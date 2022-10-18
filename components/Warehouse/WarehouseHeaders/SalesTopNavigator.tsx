import React, { FC, useState } from "react";
import Image from "next/image";
import { SalesTopNavigatorTypes } from "../../../lib/types/pageTypes/Warehouse/Sales/SalesTopNavigator";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";
import Button from "../../Shared/Button";
import ModalWrapper from "../../Modals/ModalWrapper";
import AddWarehouseOrder from "../../Forms/Warehouse/Add/AddWarehouseOrder";
import { LatLng } from "use-places-autocomplete";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { Form } from "antd";
import { usePostSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { numbersFormatter } from "../../../helpers/numbersFormatter";

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

  const onTransportChange = (value: string) => {
    setTransport(value);
  };
  const createItems = () => {
    setItems([
      ...items,
      {
        id: warehouse,
        weight: weight
      }
    ]);
    setWeight(null);
    setWarehouse("");
  };

  const handleChangeWarehouse = (value: string) => {
    setWarehouse(value);
  };

  const handleChangeWeight = (value: number | null) => {
    setWeight(value);
  };

  const [postSale, { isLoading: isPostingSale }] = usePostSaleMutation();

  const onAddSaleFinish = (values: any) => {
    postSale({
      depotId: values?.depotId,
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

      <div className="flex items-center gap-6 w-[160px]">
        <Button disabled={isSalesLoading} type="secondary">
          DOWNLOAD REPORT
        </Button>
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
        loading={false}
      >
        <AddWarehouseOrder
          createItems={createItems}
          setItems={setItems}
          items={items}
          setLocation={setLocation}
          location={location}
          handleChangeWarehouse={handleChangeWarehouse}
          warehouse={warehouse}
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
