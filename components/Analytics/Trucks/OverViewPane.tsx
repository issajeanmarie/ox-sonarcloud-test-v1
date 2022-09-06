import React, { useEffect, useRef } from "react";
import Row from "antd/lib/row";
import info from "antd/lib/message";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Divider from "antd/lib/divider";
import CustomInput from "../../Shared/Input";
import CustomButton from "../../Shared/Button/button";
import TruckOverviewCard from "./TruckOverviewCard";
import { useLazyGetTruckOverviewQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useRouter } from "next/router";
import Loader from "../../Shared/Loader";

const OvervieWPane = () => {
  const [getTruckOverview, { isLoading, data }] =
    useLazyGetTruckOverviewQuery();
  const componentDidMount = useRef(false);

  const router = useRouter();
  const { id: truckId } = router.query;

  useEffect(() => {
    if (!componentDidMount.current && truckId) {
      getTruckOverview(truckId)
        .unwrap()
        .then()
        .catch((err) => info.error(err?.data?.message || "Something is wrong"));

      componentDidMount.current = true;
    }
  }, [truckId, getTruckOverview]);

  const cardsData = [
    { name: "Repairs done", num: data?.repairsDone },
    {
      name: "Unresolved issues reports",
      num: data?.unresolvedIssues
    },
    { name: "KMs driven by OX", num: data?.kmsDriven },
    { name: "Out of service days", num: data?.outOfServiceDays },
    {
      name: "Days since last repair",
      num: data?.daysSinceLastRepair
    },
    { name: "KMs since last repair", num: data?.kmsSinceLastRepair }
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Row
            justify="space-between"
            className="bg-white my-4 mb-12 rounded shadow-[0px_0px_19px_#2A354808]"
          >
            <Col className="flex items-center gap-4">
              <CustomInput
                // onSelectChange={onSortChange}
                type="select"
                label=""
                options={[
                  { label: "Revenue", value: "REVENUE" },
                  { label: "Distance", value: "DISTANCE" },
                  { label: "Weight", value: "WEIGHT" }
                ]}
                name="sort"
                suffixIcon={
                  <Image
                    preview={false}
                    src="/icons/expand_more_black_24dp.svg"
                    alt=""
                    width={10}
                  />
                }
              />
              <CustomInput
                type="date"
                name="Start"
                placeholder="Start"
                suffixIcon={
                  <Image
                    preview={false}
                    src="/icons/ic-actions-calendar.svg"
                    alt=""
                    width={18}
                  />
                }
              />
              <CustomInput
                type="date"
                name="End"
                placeholder="End"
                suffixIcon={
                  <Image
                    preview={false}
                    src="/icons/ic-actions-calendar.svg"
                    alt=""
                    width={18}
                  />
                }
              />
            </Col>

            <Col className="flex items-center gap-4">
              <CustomButton type="secondary">
                <span className="text-sm">DOWNLOAD SHIFT</span>
              </CustomButton>
            </Col>
          </Row>

          <Divider />

          <Row
            gutter={24}
            className="overviewcards_row p-0"
            justify="space-between"
          >
            {cardsData?.map((data) => (
              <Col key={data?.name} span={8} className="mb-8">
                <TruckOverviewCard data={data} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
export default OvervieWPane;
