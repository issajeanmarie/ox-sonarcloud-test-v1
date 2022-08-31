import { FC, useMemo, useState } from "react";
import Button from "../../Shared/Button";
import { OrdersResponse, Order_Filter } from "../../../lib/types/orders";
import { localeString } from "../../../utils/numberFormatter";
import { ApiResponseMetadata } from "../../../lib/types/shared";
import FilterOrdersForm from "../../Forms/Orders/Filter/filter";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import Image from "next/image";
import FilterOrdersModal from "../../Shared/Modal";
import { LoadingOutlined } from "@ant-design/icons";

interface OrdersHeaderProps {
  data?: ApiResponseMetadata<OrdersResponse>;
  getOrders: (filters: Order_Filter) => void;
  loading: boolean;
}

const OrdersHeader: FC<OrdersHeaderProps> = ({ data, getOrders, loading }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const router = useRouter();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useMemo(() => {
    if (!loading) handleOk();
  }, [loading]);

  return (
    <div className="sticky top-0 py-4 z-10 bg-[#F6F6F6] shadow-[0px_0px_19px_#00000008]">
      <div className="flex items-center justify-between rounded shadow-[0px_0px_19px_#00000008] bg-white  px-4 py-3">
        <FilterOrdersModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        >
          <FilterOrdersForm
            getOrders={getOrders}
            loading={loading}
            setIsFiltered={setIsFiltered}
          />
        </FilterOrdersModal>
        <div className="text-[17px] font-bold flex items-center gap-5">
          {localeString(data?.payload?.totalElements)} Orders
          {loading && (
            <LoadingOutlined
              className="text-base"
              style={{ color: "#E7B522" }}
            />
          )}
        </div>
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
              onClick={showModal}
              className="cursor-pointer"
              alt="Filter icon"
            />
          </div>
          {/* <div><Button type="secondary">DOWNLOAD REPORT</Button></div> */}
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
    </div>
  );
};

export default OrdersHeader;
