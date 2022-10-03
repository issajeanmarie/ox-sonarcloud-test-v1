import { FC, useEffect, useMemo, useState } from "react";
import Button from "../../Shared/Button";
import { OrdersResponse, Order_Filter } from "../../../lib/types/orders";
import { localeString } from "../../../utils/numberFormatter";
import { ApiResponseMetadata } from "../../../lib/types/shared";
import FilterOrdersForm from "../../Forms/Orders/Filter/filter";
import { useRouter } from "next/router";
import { routes } from "../../../config/route-config";
import Image from "next/image";
import FilterOrdersModal from "../../Shared/Modal";
import { getFromLocal } from "../../../helpers/handleLocalStorage";
import { OX_ORDERS_FILTERS } from "../../../config/constants";
import Navbar from "../../Shared/Content/Navbar";
import Heading1 from "../../Shared/Text/Heading1";

interface OrdersHeaderProps {
  data?: ApiResponseMetadata<OrdersResponse>;
  getOrdersAction: (filters: Order_Filter) => void;
  loading: boolean;
}

const OrdersHeader: FC<OrdersHeaderProps> = ({
  data,
  getOrdersAction,
  loading
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
        />
      </FilterOrdersModal>

      <Navbar
        type="CENTER"
        LeftSide={
          <>
            <Heading1>
              {localeString(data?.payload?.totalElements)} Orders
            </Heading1>
          </>
        }
        RightSide={
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

            <div className="flex items-center gap-6 w-[200px]">
              <Button
                onClick={() => router.push(routes.newOrder.url)}
                type="primary"
              >
                NEW ORDER
              </Button>
            </div>

            {/* <div>
              <Button
                type="primary"
                onClick={() => router.push(routes.newOrder.url)}
              >
                NEW ORDER
              </Button>
            </div> */}
          </div>
        }
      />
      {/* <div className="sticky top-0 py-4 z-20 bg-[#F6F6F6] shadow-[0px_0px_19px_#00000008]">
        <div className="flex items-center justify-between rounded shadow-[0px_0px_19px_#00000008] bg-white  px-4 py-3">
         
          
          
        </div>
      </div> */}
    </>
  );
};

export default OrdersHeader;
