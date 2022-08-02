import { Col, Row } from "antd";
import React from "react";
import AnalyticTopContentWrapper from "../Wrappers/AnalyticTopContentWrapper";
import CardColWrapper from "../Cards/CardColWrapper";
import CardRowWrapper from "../Cards/CardRowWrapper";
import MediumCard from "../Cards/MediumCard";
import RevenueBreakdownChart from "../Charts/RevenueBreakdownChart";
import {
  MediumChartWrapper,
  SmallChartWrapper
} from "../Wrappers/ChartWrappers";
import OrderPerCategoriesChart from "../Charts/OrderPerCategoriesChart";

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
          <MediumChartWrapper>
            <RevenueBreakdownChart />
          </MediumChartWrapper>
        </Col>
      </Row>

      <Row className="pb-10 flex justify-between gap-1">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <div className="py-5">
            <span className="opacity-95">Order per Categories</span>
          </div>
          <SmallChartWrapper>
            <OrderPerCategoriesChart />
          </SmallChartWrapper>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <div className="py-5">
            <span className="opacity-95">Weight per Categories</span>
          </div>
          <SmallChartWrapper>
            <OrderPerCategoriesChart />
          </SmallChartWrapper>
        </Col>

        <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
          <div className="py-5">
            <span className="opacity-95">Revenue per Categories</span>
          </div>
          <SmallChartWrapper>
            <OrderPerCategoriesChart />
          </SmallChartWrapper>
        </Col>
      </Row>
    </>
  );
};

export default AnalyticRevenues;
