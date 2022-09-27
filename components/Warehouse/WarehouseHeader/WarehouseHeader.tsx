/* eslint-disable @typescript-eslint/no-explicit-any */
import "react";
import Button from "../../Shared/Button";
// import Image from "next/image";
import { FC, useState } from "react";
import { WarehouseHeaderTypes } from "../../../lib/types/pageTypes/Warehouse/Sales/WarehouseHeaderTypes";
import ModalWrapper from "../../Modals/ModalWrapper";
import DropDownSelector from "../../Shared/DropDownSelector";

const WarehouseHeader: FC<WarehouseHeaderTypes> = ({
  setIsModalVisible,
  isModalVisible,
  query
}) => {
  const [sort, setSort]: any = useState("");

  return (
    <>
      <div className="flex items-center justify-between rounded shadow-[0px_0px_19px_#00000008] bg-white  px-4 py-3">
        <div className="flex gap-10 items-center">
          {query?.wtb === "SALES" && (
            <div className="text-[17px] font-bold flex items-center gap-5">
              2 Orders
            </div>
          )}

          {query?.wtb === "STOCK" && (
            <div className="text-[17px] font-bold flex items-center gap-5">
              3 Items
            </div>
          )}

          {query?.wtb === "SUPPLIERS" && (
            <div className="text-[17px] font-bold flex items-center gap-5">
              2 Suppliers
            </div>
          )}

          {query?.wtb === "SUPPLIERS" || query?.wtb === "STOCK" ? (
            <DropDownSelector
              label="Sort"
              dropDownContent={[
                { id: 0, name: "Recently added", value: "names__desc" },
                { id: 1, name: "Sort item Two", value: "names__asc" },
                { id: 2, name: "Sort item Three", value: "location__desc" },
                { id: 3, name: "Sort item Four", value: "location__asc" }
              ]}
              defaultSelected={sort}
              setDefaultSelected={setSort}
            />
          ) : null}
        </div>

        <div className="flex items-center gap-5">
          {/* <Image
            width={16}
            height={16}
            src="/icons/filter.svg"
            className="cursor-pointer"
            alt="Filter icon"
          /> */}
          {/* {query?.wtb === "SALES" && "filter icon"} */}

          {query?.wtb === "SALES" && (
            <Button type="secondary">DOWNLOAD REPORT</Button>
          )}

          {query?.wtb === "SALES" && <Button type="primary">NEW ORDER</Button>}

          {query?.wtb === "STOCK" && <Button type="primary">NEW STOCK</Button>}

          {query?.wtb === "SUPPLIERS" && (
            <Button type="primary">NEW SUPPLIER</Button>
          )}
        </div>
      </div>

      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title={
          <>
            {query?.wtb === "SALES" && "NEW WAREHOUSE ORDER"}
            {query?.wtb === "STOCK" && "NEW WAREHOUSE ITEM"}
            {query?.wtb === "SUPPLIERS" && "NEW OX SUPPLIER"}
          </>
        }
        loading={false}
      >
        {query?.wtb === "SALES" && "order form"}
        {query?.wtb === "STOCK" && "stock form"}
        {query?.wtb === "SUPPLIERS" && "supplier form"}
      </ModalWrapper>
    </>
  );
};

export default WarehouseHeader;
