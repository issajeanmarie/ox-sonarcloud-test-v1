import { FC, useEffect, useState } from "react";
import { message, Steps } from "antd";
import { Query } from "../../../lib/types/shared";
import PaymentStatus from "../../Shared/PaymentStatus";
import Header from "./header";
import { localeString } from "../../../utils/numberFormatter";
import Image from "next/image";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { useLazyOrderQuery } from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import Loader from "../../Shared/Loader";
import moment from "moment";
import { Stop } from "../../../lib/types/orders";

const { Step } = Steps;

interface ViewOrderProps {
  orderId: Query;
}

interface DetailsType {
  label: string;
  value: any;
}

const ViewOrder: FC<ViewOrderProps> = ({ orderId }) => {
  const [summary, setSummary] = useState<DetailsType[]>();
  const [orderDetails, setOrderDetails] = useState<DetailsType[]>();
  const [clientDetails, setClientDetails] = useState<DetailsType[]>();

  let totalWeightCounter = 0;

  const [getOrder, { isLoading, data }] = useLazyOrderQuery();

  const generateOrder = () => {
    getOrder(orderId)
      .unwrap()
      .then()
      .catch((e) => {
        message.error(e?.data?.message);
      });
  };

  useEffect(() => {
    if (data) {
      data?.stops.forEach(
        (st) => (totalWeightCounter = totalWeightCounter + st.weight)
      );
      setSummary([
        {
          label: "Job value",
          value: `${localeString(data?.totalAmount)} Rwf`
        },
        {
          label: "Payment status",
          value: data?.paymentStatus && (
            <PaymentStatus status={data?.paymentStatus} />
          )
        },
        {
          label: "Duration",
          value: `${data?.duration || 0} Hour(s)`
        },
        {
          label: "Distance",
          value: data?.distance
        }
      ]);
      setClientDetails([
        {
          label: "Name",
          value: data?.office?.names
        },
        {
          label: "Branch",
          value: data?.office?.location
        },
        {
          label: "Recipient code",
          value: data?.deliveryCode
        }
      ]);
      setOrderDetails([
        {
          label: "Recipeint",
          value: data?.depot.name
        },
        {
          label: "Category",
          value: data?.category.name
        },
        {
          label: "Weight",
          value: `${totalWeightCounter} KGs - 20Rwf/KG`
        },
        {
          label: "Depot",
          value: data?.depot.name
        }
      ]);
    }
  }, [data]);

  useEffect(() => {
    orderId && generateOrder();
  }, [orderId]);

  const StepDescription = ({ st }: { st: Stop }) => {
    return (
      <div>
        <div className="font-semibold" style={{ color: "black" }}>
          {st.location}
        </div>

        <div className="my-4 text-xs font-light">
          {st.arrivalDateTime && st.departureDateTime && (
            <>
              {moment(st.arrivalDateTime).format("HH:MM")} PM -{" "}
              {moment(st.departureDateTime).format("HH:MM")} PM
            </>
          )}
        </div>
        <div className="flex items-center mb-5">
          <div className="flex-1 flex items-center gap-8">
            <span className="heading2">{st.truck.plateNumber}</span>
          </div>
          <div className="flex-2 text-gray-400 font-light">
            {st.driver.names}
          </div>
          <div className="flex-1 text-black font-light text-right">
            {st.weight} KGs
          </div>
          <div className="flex-1 flex items-center gap-5 justify-end">
            <Image
              className="pointer"
              src="/icons/ic-contact-edit.svg"
              alt="Backspace icon"
              width={15}
              height={15}
            />
            <Image
              className="pointer"
              src="/icons/ic-actions-remove.svg"
              alt="Backspace icon"
              width={15}
              height={15}
            />
          </div>
        </div>
      </div>
    );
  };

  const DetailsComponent = ({
    details,
    header
  }: {
    details?: DetailsType[];
    header?: string;
  }) => {
    return (
      <div className="my-12">
        {header ? (
          <div className="font-extralight text-[17px] mb-6">{header}</div>
        ) : null}
        {details?.map((sm, index) => {
          return (
            <div key={index} className="flex items-center mb-5">
              <div className="w-[150px] font-bold">{sm.label}:</div>
              <div className="font-light">{sm.value}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          <Header orderId={orderId} />
          <div className="flex flex-col lg:flex-row p-5 gap-6 overflow-auto h-[83vh]">
            <div className="flex-1 h-min bg-white shadow-[0px_0px_19px_#00000008] rounded p-14">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-ox-dark">
                  ORDER {orderId}
                </span>
                <span className="font-bold">{data.status}</span>
              </div>
              <span className="normalText">
                {moment(data.startDateTime).format("Do MMMM YYYY")}
              </span>
              <DetailsComponent
                details={clientDetails}
                header="Client details"
              />
              <DetailsComponent details={orderDetails} header="Order details" />
              <div className="my-20">
                <div className="font-extralight text-[17px] mb-6">
                  Truck details
                </div>
                {/* {data.stops.map((st, index) => {
                  return ( */}
                <div className="flex items-center mb-5">
                  <div className="flex-1 flex items-center gap-8">
                    <span className="text-gray-400 font-light">1</span>
                    <span className="heading2">
                      {data.stops[0].truck.plateNumber}
                    </span>
                  </div>
                  <div className="flex-1 normalText">
                    {data.stops[0].weight} KGs
                  </div>
                  <div className="flex-1 text-gray-400 font-light">
                    {data.stops[0].driver.names}
                  </div>
                </div>
                {/* ); */}
                {/* })} */}
              </div>
              <div className="mt-20">
                <div className=" mb-6 flex items-center justify-between">
                  <span className="text-[17px] font-extralight">
                    Track Order
                  </span>
                  <span className="link animate">+ Add new stop</span>
                </div>
                <Steps direction="vertical" size="small" current={1}>
                  {data.stops.map((st, index) => {
                    return (
                      <Step
                        key={index}
                        status="finish"
                        description={<StepDescription st={st} />}
                      />
                    );
                  })}

                  {/* <Step status="finish" description={<StepDescription />} /> */}
                  {/* <Step description={<StepDescription />} /> */}
                </Steps>
              </div>
              <div className="mt-20">
                <div className="font-extralight text-[17px] mb-6">
                  Admin&apos;s comment
                </div>
                <div>
                  <Input
                    name="comment"
                    type="text_area"
                    label="Comment"
                    placeholder="Enter something"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-xs opacity_56 nowrap italic text-gray-600">
                    <span className="font-bold">Order created by:</span>{" "}
                    {data?.office?.names}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[45%] flex flex-col gap-7">
              <div className="bg-white shadow-[0px_0px_19px_#00000008] rounded pt-14 px-14 pb-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-ox-dark">
                    ORDER SUMMARY
                  </span>
                </div>
                <DetailsComponent details={summary} />
              </div>
              <div className="bg-white shadow-[0px_0px_19px_#00000008] rounded">
                <div className="p-14 py-5 border-b">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-ox-dark">
                      PAYMENT STATUS
                    </div>
                    <div className="w-[150px]">
                      <Button type="secondary">UPDATE</Button>
                    </div>
                  </div>
                </div>
                <div className="flex divide-x-[1.5px]">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="italic mb-1">Paid</div>
                    <div className="font-bold text-lg text-gray-400">
                      {localeString(data.totalPaid)} Rwf
                    </div>
                  </div>
                  <div className="flex-1 flex py-7 flex-col items-center justify-center">
                    <div className="italic mb-1">Remaining</div>
                    <div className="text-lg text-ox-red font-bold">
                      {localeString(data.remainingAmount)} Rwf
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-[0px_0px_19px_#00000008] rounded p-10">
                <div className="flex items-center justify-between mb-7">
                  <span className="heading1">WRITE OFF</span>
                </div>
                <div>
                  <Input
                    name="reason"
                    type="text_area"
                    label="Reason"
                    placeholder="Enter something"
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <div className="w-[150px]">
                    <Button type="primary">SUBMIT</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewOrder;
