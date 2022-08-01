import { Col, Row } from "antd";
import React from "react";
import MediumCard from "../Cards/MediumCard";
import TrucksUsageTable from "../Tables/TrucksUsageTable";
import TrucksUsage from "./TrucksUsage";

const AnalyticTrucks = () => {
  return (
    <>
      <div className="bg-ox-white sticky top-[3.60rem] z-10">
        <Row className="flex justify-between py-5">
          <Col flex="none">
            <MediumCard
              title="Number of trucks"
              subTitle="The total number of trucks"
              count="56"
            />
          </Col>
          <Col flex="none">
            <MediumCard
              title="In use"
              subTitle="Those ready to be used"
              count="48"
            />
          </Col>
          <Col flex="none">
            <MediumCard
              title="Deactivated"
              subTitle="In garage or out of service"
              count="8"
            />
          </Col>
          <Col flex="none">
            <MediumCard
              title="Top performing"
              subTitle="The truck that is doing great"
              count="RAC 533 H"
            />
          </Col>
          <Col flex="none">
            <MediumCard
              title="Worst performing"
              subTitle="The truck that is performing poorly"
              count="RAD 625 M"
            />
          </Col>
        </Row>

        <TrucksUsage />
      </div>

      <TrucksUsageTable />
    </>
  );
};

export default AnalyticTrucks;
