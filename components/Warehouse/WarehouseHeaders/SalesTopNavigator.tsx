import React, { FC, useState } from "react";
import Image from "antd/lib/image";
import { SalesTopNavigatorTypes } from "../../../lib/types/pageTypes/Warehouse/Sales/SalesTopNavigator";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";
import Button from "../../Shared/Button";
import ModalWrapper from "../../Modals/ModalWrapper";
import AddWarehouseOrder from "../../Forms/Warehouse/Add/AddWarehouseOrder";
import { LatLng } from "use-places-autocomplete";
import { Col, Form, Row } from "antd";
import { usePostSaleMutation } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import FilterOrdersForm from "../../Forms/Orders/Filter/filter";
import FilterOrdersModal from "../../Shared/Modal";
import { useDispatch } from "react-redux";

const SalesTopNavigator: FC<SalesTopNavigatorTypes> = ({
  showModal,
  setIsModalVisible,
  isModalVisible,
  totalElements,
  isSalesLoading,
  setCurrentPages,
  getSalesAction,
  isFetching,
  isFilterModalVisible,
  setIsFilterModalVisible,
  isFiltered,
  setIsFiltered,
  depotsState
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
          ? JSON.parse(warehouse)?.category?.parentCategory
          : "",
        category: warehouse ? JSON.parse(warehouse)?.categoryName : "",
        unitSellingPrice: warehouse
          ? JSON.parse(warehouse)?.unitSellingPrice
          : 0
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

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const [postSale, { isLoading: isPostingSale }] = usePostSaleMutation();

  const handleAddSaleSuccess = (res: any) => {
    res && dispatch(displayPaginatedData({ payload: res }));

    form.resetFields();
    setIsModalVisible(false);
  };

  const onAddSaleFinish = (values: any) => {
    handleAPIRequests({
      request: postSale,
      depotId: values?.depotId,
      date: values?.date,
      clientId: values?.clientId,
      items: items?.map(({ id, weight }: { id: number; weight: number }) => ({
        id,
        weight
      })),
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
    <Row gutter={2} align="bottom">
      <Col>
        <Heading1>
          {isSalesLoading ? (
            "..."
          ) : (
            <>{totalElements && numbersFormatter(totalElements)} Orders </>
          )}
        </Heading1>
      </Col>

      <Col className="normalText opacity_56 italic">
        {(!isSalesLoading &&
          depotsState?.depotId &&
          `( ${depotsState.depotName} )`) ||
          ""}
      </Col>
    </Row>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div
        className={` p-2 flex items-center justify-center ${
          isFiltered ? "border rounded-lg border-ox-yellow" : ""
        } `}
      >
        <Image
          width={16}
          height={16}
          src="/icons/filter.svg"
          onClick={showFilterModal}
          className="cursor-pointer"
          alt="Filter icon"
          preview={false}
        />
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
        title="NEW SALE ORDER"
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

      <FilterOrdersModal
        isModalVisible={isFilterModalVisible}
        setIsModalVisible={setIsFilterModalVisible}
      >
        <FilterOrdersForm
          getOrdersAction={getSalesAction}
          loading={isFetching}
          setIsFiltered={setIsFiltered}
          setCurrentPages={setCurrentPages}
          setIsVisible={setIsFilterModalVisible}
          isFromSales={true}
        />
      </FilterOrdersModal>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default SalesTopNavigator;
