import { Col, Row } from "antd";
import React, { FC } from "react";
import AnalyticTopContentWrapper from "../Wrappers/AnalyticTopContentWrapper";
import CardColWrapper from "../Cards/CardColWrapper";
import CardRowWrapper from "../Cards/CardRowWrapper";
import { MediumChartWrapper } from "../Wrappers/ChartWrappers";
import RevenueBreakdownChartKPIs from "../Charts/RevenueBreakdownChartKPIs";
import RevenueKGKChartPIs from "../Charts/RevenueKGKChartPIs";
import { AnalyticKPIsTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticKPIsTypes";
import LargeCard from "../Cards/LargeCard";

const AnalyticKPIs: FC<AnalyticKPIsTypes> = ({ active }) => {
  return (
    <>
      <AnalyticTopContentWrapper active={active}>
        <CardRowWrapper active={active}>
          <CardColWrapper active={active}>
            <LargeCard
              title="Revenue"
              amount1="200,000"
              amount2="700,0000"
              percentage="40"
              traveled=""
            />
          </CardColWrapper>
          <CardColWrapper active={active}>
            <LargeCard
              title="Revenue / KM"
              amount1="200,000"
              amount2="700,0000"
              percentage="75"
              traveled="576 KM Travelled"
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
            <RevenueBreakdownChartKPIs />
          </MediumChartWrapper>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="pb-4" xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <span className="opacity-95">Revenue / KG</span>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <MediumChartWrapper>
            <RevenueKGKChartPIs />
          </MediumChartWrapper>
        </Col>
      </Row>
    </>
  );
};

export default AnalyticKPIs;
