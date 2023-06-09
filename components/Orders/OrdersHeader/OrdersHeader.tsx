import { FC, useEffect, useMemo, useState } from "react";
import Button from "../../Shared/Button";
import { OrdersResponse, Order_Filter } from "../../../lib/types/orders";
import { localeString } from "../../../utils/numberFormatter";
import { ApiResponseMetadata } from "../../../lib/types/shared";
import FilterOrdersForm from "../../Forms/Orders/Filter/filter";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import Image from "antd/lib/image";
import FilterOrdersModal from "../../Shared/Modal";
import { getFromLocal } from "../../../helpers/handleLocalStorage";
import { OX_ORDERS_FILTERS } from "../../../config/constants";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";

interface OrdersHeaderProps {
  data?: ApiResponseMetadata<OrdersResponse>;
  getOrdersAction: (filters: Order_Filter) => void;
  loading: boolean;
  setCurrentPages: React.Dispatch<React.SetStateAction<number>>;
}

const OrdersHeader: FC<OrdersHeaderProps> = ({
  data,
  getOrdersAction,
  loading,
  setCurrentPages
}) => {
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

  useEffect(() => {
    const savedFilters = getFromLocal(OX_ORDERS_FILTERS);
    if (savedFilters) setIsFiltered(true);
  }, []);

  const LeftSide = (
    <Heading1>{localeString(data?.payload?.totalElements)} Orders</Heading1>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div
        className={` rounded p-3 flex items-center justify-center ${
          isFiltered ? "border border-ox-yellow" : "border border-gray-200 "
        } `}
      >
        <Image
          width={16}
          height={16}
          src="/icons/filter.svg"
          data-test-id="order-filter"
          onClick={showModal}
          className="cursor-pointer"
          alt="Filter icon"
          preview={false}
        />
      </div>

      <div className="flex items-center gap-6 w-[200px]">
        <Button
          id="new-order-btn"
          onClick={() => router.push(routes.newOrder.url)}
          type="primary"
        >
          NEW ORDER
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <FilterOrdersModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <FilterOrdersForm
          getOrdersAction={getOrdersAction}
          loading={loading}
          setIsFiltered={setIsFiltered}
          setCurrentPages={setCurrentPages}
        />
      </FilterOrdersModal>

      <Navbar type="CENTER" LeftSide={LeftSide} RightSide={RightSide} />
    </>
  );
};

export default OrdersHeader;
