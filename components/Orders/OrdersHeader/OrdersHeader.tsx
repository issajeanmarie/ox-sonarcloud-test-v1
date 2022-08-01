import { FC, useState } from "react";
import Button from "../../Shared/Button";
import { FilterOutlined } from "@ant-design/icons";
import { OrdersResponse } from "../../../lib/types/orders";
import { localeString } from "../../../utils/numberFormatter";
import { ApiResponseMetadata } from "../../../lib/types/shared";
import FilterOrdersForm from "../../Forms/Orders/Filter/filter";
import { Modal } from "antd";

interface OrdersHeaderProps {
  data?: ApiResponseMetadata<OrdersResponse>;
}

const OrdersHeader: FC<OrdersHeaderProps> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white flex items-center justify-between rounded shadow-sm py-3 px-4 sticky top-0 z-10">
      <Modal
        title={false}
        width={600}
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FilterOrdersForm />
      </Modal>
      <div className="text-[17px] font-bold">
        {localeString(data?.payload?.totalElements)} Orders
      </div>
      <div className="flex items-center gap-4">
        <div>
          <FilterOutlined onClick={showModal} className="text-2xl" />
        </div>
        <div>
          <Button type="secondary">DOWNLOAD REPORT</Button>
        </div>
        <div>
          <Button type="primary">NEW ORDER</Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
