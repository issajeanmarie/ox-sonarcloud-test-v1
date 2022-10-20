import { FC, useState } from "react";
import Header from "./header";
import AddOrderForm from "../../Forms/Orders/AddEdit";
import { useForm } from "antd/lib/form/Form";
import { useCreateOrderMutation } from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import { OrderRequestBody } from "../../../lib/types/orders";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import Content from "../../Shared/Content";

const AddOrder: FC = () => {
  const [isCreateOrderSuccess, setIsCreateOrderSuccess] =
    useState<boolean>(false);

  const [form] = useForm();

  const closeModal = () => setIsCreateOrderSuccess(false);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleNewOrderSuccess = () => {
    setIsCreateOrderSuccess(true);
  };

  const addOrderAction = (payload: OrderRequestBody) => {
    handleAPIRequests({
      request: createOrder,
      ...payload,
      handleSuccess: handleNewOrderSuccess
    });
  };

  return (
    <div>
      <Header
        form={form}
        createOrderLoading={isLoading}
        isCreateOrderSuccess={isCreateOrderSuccess}
        setIsCreateOrderSuccess={setIsCreateOrderSuccess}
        closeModal={closeModal}
      />

      <Content isOverflowHidden={false} navType="FULL">
        <div className="w-[800px] m-auto bg-white shadow-[0px_0px_19px_#00000008] mt-5 p-14">
          <AddOrderForm
            mode="edit"
            title="CREATE A NEW ORDER"
            form={form}
            addOrderAction={addOrderAction}
          />
        </div>
      </Content>
    </div>
  );
};

export default AddOrder;
