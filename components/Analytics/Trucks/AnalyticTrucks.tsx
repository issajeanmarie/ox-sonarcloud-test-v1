import React, { FC } from "react";
import AnalyticTopContentWrapper from "../Wrappers/AnalyticTopContentWrapper";
import CardColWrapper from "../Cards/CardColWrapper";
import CardRowWrapper from "../Cards/CardRowWrapper";
import MediumCard from "../Cards/MediumCard";
import TrucksUsageTable from "../Tables/TrucksUsageTable";
import TrucksUsage from "./TrucksUsage";
import { AnalyticTrucksTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticTrucksTypes";
import {
  AnalyticCardsLoader,
  ColsTableLoader
} from "../../Shared/Loaders/Loaders";

const AnalyticTrucks: FC<AnalyticTrucksTypes> = ({
  active,
  truckData,
  truckLoading,
  truckFetching,
  onSortChange,
  sorter
}) => {
  return (
    <>
      <AnalyticTopContentWrapper active={active}>
        {truckLoading ? (
          <>
            <CardRowWrapper active={active}>
              {[...Array(5)].map((_, index) => (
                <AnalyticCardsLoader key={index} />
              ))}
            </CardRowWrapper>
          </>
        ) : (
          <CardRowWrapper active={active}>
            <CardColWrapper active={active}>
              <MediumCard
                title="Number of trucks"
                subTitle="The total number of trucks"
                count={truckData?.payload?.numberOfTrucks}
                isFetching={truckFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="In use"
                subTitle="Those ready to be used"
                count={truckData?.payload?.inUse}
                isFetching={truckFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Deactivated"
                subTitle="In garage or out of service"
                count={truckData?.payload?.notInUse}
                isFetching={truckFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Top performing"
                subTitle="The truck that is doing great"
                count={truckData?.payload?.topPerforming}
                isFetching={truckFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Worst performing"
                subTitle="The truck that is performing poorly"
                count={truckData?.payload?.worstPerforming}
                isFetching={truckFetching}
              />
            </CardColWrapper>
          </CardRowWrapper>
        )}
        {!truckLoading && (
          <TrucksUsage onSortChange={onSortChange} sorter={sorter} />
        )}
      </AnalyticTopContentWrapper>

      {truckLoading ? (
        <>
          {[...Array(15)].map((_, index) => (
            <ColsTableLoader key={index} />
          ))}
        </>
      ) : (
        <TrucksUsageTable
          truckData={truckData?.payload?.truckAnalytics}
          truckFetching={truckFetching}
        />
      )}
    </>
  );
};

export default AnalyticTrucks;
