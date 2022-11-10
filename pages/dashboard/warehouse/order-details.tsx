import { Form, Row } from "antd";
import React, { useEffect, useState } from "react";
import SingleOrderLeft from "../../../components/Warehouse/OrderDetails/Left/SingleOrderLeft";
import SingleOrderRight from "../../../components/Warehouse/OrderDetails/Right/SingleOrderRight";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import SingleOrderTop from "../../../components/Warehouse/OrderDetails/SingleOrderTop";
import {
  useAddSaleItemMutation,
  useDeleteSaleItemMutation,
  useEditSaleMutation,
  useSaleDetailsQuery
} from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { useRouter } from "next/router";
import PageNotFound from "../../../components/Shared/PageNotFound";
import Loader from "../../../components/Shared/Loader";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { LatLng } from "use-places-autocomplete";
import moment from "moment";
import { useRef } from "react";

const OrderDetails = () => {
  const { query } = useRouter();
  const router = useRouter();
  const componentDidMount = useRef(false);

  const {
    data: saleDetails,
    isLoading: isSaleLoading,
    isFetching: isSaleFetching
  } = useSaleDetailsQuery({
    id: query?.sale
  });

  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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

  const [addSaleItem, { isLoading: isAddItemLoading }] =
    useAddSaleItemMutation();

  const [deleteSaleItem] = useDeleteSaleItemMutation();

  const addSaleItemAction = () => {
    const warehouseToPost = {
      id: JSON.parse(warehouse)?.id,
      weight: JSON.parse(warehouse)?.weight
    };

    handleAPIRequests({
      request: addSaleItem,
      saleId: query?.sale,
      ...warehouseToPost
    });
  };

  const deleteSaleItemAction = (itemId: number) => {
    handleAPIRequests({
      request: deleteSaleItem,
      saleId: query?.sale,
      itemId
    });
  };

  const createItems = () => {
    !!saleDetails && addSaleItemAction();

    setItems([
      ...items,
      {
        id: warehouse ? JSON.parse(warehouse)?.id : warehouse,
        weight: weight,
        parentCategory: warehouse
          ? JSON.parse(warehouse)?.category?.parentCategory?.name
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

  const [editSale, { isLoading: isEditSaleLoading }] = useEditSaleMutation();

  const handleEditSaleSuccess = () => {
    setIsEditModalVisible(false);
  };

  const onEditSaleFinish = (values: any) => {
    handleAPIRequests({
      request: editSale,
      id: saleDetails?.payload?.id,
      depotId: values?.depotId,
      date: moment(values?.date)?.format("YYYY-MM-DDTHH:mm"),
      clientId: values?.clientId,
      items: items?.map(({ id, weight }: { id: number; weight: number }) => ({
        id,
        weight
      })),
      marginCost: values?.marginCost,
      localTransportCost:
        transport !== "none" ? values?.localTransportCost : "",
      truckId: transport !== "none" ? values?.truckId : "",
      driverId:
        transport !== "none" && saleDetails?.payload?.transportOrder
          ? values?.driverId
          : "",
      showSuccess: true,
      handleSuccess: handleEditSaleSuccess
    });
  };

  useEffect(() => {
    if (!componentDidMount.current && saleDetails) {
      const currentItems: any[] = [];

      saleDetails?.payload?.saleItems?.map(
        (item: { weight: number; id: number; warehouseItem: any }) => {
          currentItems.push({
            category: item?.warehouseItem?.category?.name,
            id: item.id,
            parentCategory: undefined,
            weight: item?.weight,
            unitSellingPrice: item?.warehouseItem?.unitSellingPrice
          });
        }
      );

      setItems([...items, ...currentItems]);
      componentDidMount.current = true;
    }
  }, [items, saleDetails]);

  return (
    <Layout>
      {router.isReady && !isSaleLoading && !saleDetails ? (
        <PageNotFound />
      ) : (
        <div className="m-0 h-full overflow-hidden">
          <SingleOrderTop
            sale={saleDetails?.payload}
            isSaleLoading={isSaleLoading}
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
            isEditSaleLoading={isEditSaleLoading}
            onEditSaleFinish={onEditSaleFinish}
            setIsEditModalVisible={setIsEditModalVisible}
            isEditModalVisible={isEditModalVisible}
            isAddItemLoading={isAddItemLoading}
            deleteSaleItemAction={deleteSaleItemAction}
            form={form}
          />

          <Row justify="space-between" gutter={[16, 16]} className="p-5">
            {isSaleLoading ? (
              <Loader />
            ) : (
              <>
                <SingleOrderLeft sale={saleDetails?.payload} />

                <SingleOrderRight
                  sale={saleDetails?.payload}
                  isFetching={isSaleFetching}
                />
              </>
            )}
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default WithPrivateRoute(OrderDetails);
