import { Col, Row } from "antd";
import React from "react";
import AnalyticTopContentWrapper from "../Wrappers/AnalyticTopContentWrapper";
import CardColWrapper from "../Cards/CardColWrapper";
import CardRowWrapper from "../Cards/CardRowWrapper";
import MediumCard from "../Cards/MediumCard";
import RevenueBreakdownChart from "../Charts/RevenueBreakdownChart";
import ChartWrapper from "../Wrappers/ChartWrapper";

const AnalyticRevenues = () => {
  return (
    <>
      <AnalyticTopContentWrapper>
        <CardRowWrapper>
          <CardColWrapper>
            <MediumCard
              title="Clients served"
              subTitle="520 total clients"
              count="5"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="Revenues made in Rwf"
              subTitle="0 Rwf (0%) paid per KG"
              count="120,000"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="Cash collected"
              subTitle="0 Rwf (0%) paid per KG"
              count="50,000"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="Total distance in KM"
              subTitle="0 Hrs (0%) with cargo"
              count="15"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="Total hours"
              subTitle="0 Hrs (0%) with cargo"
              count="72"
            />
          </CardColWrapper>
          <CardColWrapper>
            <MediumCard
              title="Total weight in KG"
              subTitle="..."
              count="1,500"
            />
          </CardColWrapper>
        </CardRowWrapper>
      </AnalyticTopContentWrapper>
      <Row>
        <Col className="pb-4" xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <span className="opacity-95">Revenue breakdown</span>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <ChartWrapper>
            <RevenueBreakdownChart />
          </ChartWrapper>
        </Col>
      </Row>
    </>
  );
};

export default AnalyticRevenues;
