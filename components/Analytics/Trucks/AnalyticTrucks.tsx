import React from "react";
import AnalyticTopContentWrapper from "../Wrappers/AnalyticTopContentWrapper";
import CardColWrapper from "../Cards/CardColWrapper";
import CardRowWrapper from "../Cards/CardRowWrapper";
import MediumCard from "../Cards/MediumCard";
import TrucksUsageTable from "../Tables/TrucksUsageTable";
import TrucksUsage from "./TrucksUsage";

const AnalyticTrucks = () => {
  return (
    <>
      <AnalyticTopContentWrapper>
        <CardRowWrapper>
          <CardColWrapper>
            <MediumCard
              title="Number of trucks"
              subTitle="The total number of trucks"
              count="56"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="In use"
              subTitle="Those ready to be used"
              count="48"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="Deactivated"
              subTitle="In garage or out of service"
              count="8"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="Top performing"
              subTitle="The truck that is doing great"
              count="RAC 533 H"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="Worst performing"
              subTitle="The truck that is performing poorly"
              count="RAD 625 M"
            />
          </CardColWrapper>
        </CardRowWrapper>

        <TrucksUsage />
      </AnalyticTopContentWrapper>

      <TrucksUsageTable />
    </>
  );
};

export default AnalyticTrucks;
