import { FC, useState } from "react";
import Button from "../../Shared/Button";
import { OrdersResponse } from "../../../lib/types/orders";
import { localeString } from "../../../utils/numberFormatter";
import { ApiResponseMetadata } from "../../../lib/types/shared";
import FilterOrdersForm from "../../Forms/Orders/Filter/filter";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import Image from "next/image";

interface OrdersHeaderProps {
  data?: ApiResponseMetadata<OrdersResponse>;
}

const OrdersHeader: FC<OrdersHeaderProps> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const router = useRouter();

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
    <div className="bg-white flex items-center justify-between rounded shadow-[0px_0px_19px_#00000008] py-3 px-4 sticky top-0 z-10">
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
      <div className="flex items-center gap-5">
        <div>
          <Image
            width={16}
            height={16}
            src="/icons/filter.svg"
            onClick={showModal}
            className="cursor-pointer"
            alt="Filter icon"
          />
        </div>
        <div>{/* <Button type="secondary">DOWNLOAD REPORT</Button> */}</div>
        <div>
          <Button
            type="primary"
            onClick={() => router.push(routes.newOrder.url)}
          >
            NEW ORDER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
