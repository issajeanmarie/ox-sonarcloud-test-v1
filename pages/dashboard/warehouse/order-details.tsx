import { Form, Row } from "antd";
import React, { useState } from "react";
import SingleOrderLeft from "../../../components/Warehouse/OrderDetails/Left/SingleOrderLeft";
import SingleOrderRight from "../../../components/Warehouse/OrderDetails/Right/SingleOrderRight";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import SingleOrderTop from "../../../components/Warehouse/OrderDetails/SingleOrderTop";
import {
  useEditSaleMutation,
  useSaleDetailsQuery
} from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { useRouter } from "next/router";
import PageNotFound from "../../../components/Shared/PageNotFound";
import Loader from "../../../components/Shared/Loader";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { LatLng } from "use-places-autocomplete";
import moment from "moment";

const OrderDetails = () => {
  const { query } = useRouter();
  const router = useRouter();

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
      items: items,
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
