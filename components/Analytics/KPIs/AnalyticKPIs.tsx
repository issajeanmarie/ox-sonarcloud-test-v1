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
import { AnalyticCardsLoader } from "../../Shared/Loaders/Loaders";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { KPIsPacentageCalculator } from "../../../helpers/pacentageCalculators";

const AnalyticKPIs: FC<AnalyticKPIsTypes> = ({
  active,
  KPIsData,
  KPIsLoading,
  KPIsFetching
}) => {
  return (
    <>
      <AnalyticTopContentWrapper active={active}>
        {KPIsLoading ? (
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
              <LargeCard
                title="Revenue"
                amount1={KPIsData?.averageActualPerDay}
                amount2={KPIsData?.averageTargetPerDay}
                percentage={
                  KPIsData?.averageActualPerDay &&
                  KPIsPacentageCalculator(
                    KPIsData?.averageActualPerDay,
                    KPIsData?.averageTargetPerDay
                  )
                }
                traveled=""
                isFetching={KPIsFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <LargeCard
                title="Revenue / KM"
                amount1={KPIsData?.averageActualPerKm}
                amount2={KPIsData?.averageTargetPerKm}
                percentage={
                  KPIsData?.averageActualPerKm &&
                  KPIsPacentageCalculator(
                    KPIsData?.averageActualPerKm,
                    KPIsData?.averageTargetPerKm
                  )
                }
                traveled={`${
                  KPIsData?.totalKms && numbersFormatter(KPIsData?.totalKms)
                } KM Travelled`}
                isFetching={KPIsFetching}
              />
            </CardColWrapper>
          </CardRowWrapper>
        )}
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
