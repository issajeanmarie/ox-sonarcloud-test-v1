import React, { FC } from "react";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { localeString } from "../../../utils/numberFormatter";
import Button from "../../Shared/Button";
import ModalWrapper from "../../Modals/ModalWrapper";
import { Form } from "antd";
import { StockTopNavigatorTypes } from "../../../lib/types/pageTypes/Warehouse/Stock/StockTopNavigator";
import DropDownSelector from "../../Shared/DropDownSelector";
import AddStock from "../../Forms/Warehouse/Add/AddStock";
import { usePostStockMutation } from "../../../lib/api/endpoints/Warehouse/stockEndpoints";
import { useCategoriesQuery } from "../../../lib/api/endpoints/Category/categoryEndpoints";
import { useLhsOrdersQuery } from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import { useDepotsQuery } from "../../../lib/api/endpoints/Depots/depotEndpoints";
import { useSuppliersQuery } from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

const StockTopNavigator: FC<StockTopNavigatorTypes> = ({
  showModal,
  setIsModalVisible,
  isModalVisible,
  selectedSort,
  setSelectedSort,
  stocksNumber
}) => {
  const [form] = Form.useForm();

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const { data: lhsOrders, isLoading: isLhsOrdersLoading } =
    useLhsOrdersQuery();

  const { data: suppliers, isLoading: isSuppliersLoading } = useSuppliersQuery({
    page: "",
    size: 10000000,
    sort: ""
  });

  const dispatch = useDispatch();

  const { data: depots, isLoading: isDepotsLoadind } = useDepotsQuery();
  const [postStock, { isLoading: isAddingStock }] = usePostStockMutation();

  const handleAddStockSuccess = ({ payload }: any) => {
    form.resetFields();
    setIsModalVisible(false);

    dispatch(displayPaginatedData({ payload }));
  };

  const onAddStockFinish = (values: any) => {
    handleAPIRequests({
      request: postStock,
      inDate: values?.inDate,
      expiryDate: values?.expiryDate,
      supplierId: values?.supplierId,
      weight: values?.weight,
      unitCost: values?.unitCost,
      depotId: values?.depotId,
      categoryId: values?.SubCategory,
      lhsOrderId: values?.lhsOrderId,
      showSuccess: true,
      handleSuccess: handleAddStockSuccess
    });
  };

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>
          <Heading1>{localeString(stocksNumber || 0)} Items</Heading1>
        </Col>

        <Col>
          <DropDownSelector
            label="Sort"
            setDefaultSelected={setSelectedSort}
            defaultSelected={selectedSort}
            dropDownContent={[
              { id: 0, name: "Z-A (Names)", value: "NAMES_DESC" },
              { id: 1, name: "A-Z (Names)", value: "NAMES_ASC" },
              { id: 2, name: "Z-A (Date)", value: "DATE_DESC" },
              { id: 3, name: "A-Z (Date)", value: "DATE_ASC" }
            ]}
          />
        </Col>
      </Row>
    </Col>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6 w-[120px]">
        <Button onClick={showModal} type="primary">
          NEW STOCK
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW WAREHOUSE ITEM"
        loading={false}
      >
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
      </ModalWrapper>
      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default StockTopNavigator;
