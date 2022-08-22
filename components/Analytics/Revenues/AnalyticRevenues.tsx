import { Col, Row } from "antd";
import React, { FC } from "react";
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
import { AnalyticRevenuesTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticRevenuesTypes";
import { AnalyticCardsLoader } from "../../Shared/Loaders/Loaders";
import { numbersFormatter } from "../../../helpers/numbersFormatter";

const AnalyticRevenues: FC<AnalyticRevenuesTypes> = ({
  active,
  revenueData,
  revenueLoading,
  revenueFetching
}) => {
  return (
    <>
      <AnalyticTopContentWrapper active={active}>
        {revenueLoading ? (
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
                title="Clients served"
                subTitle={`${
                  revenueData?.totalCustomers &&
                  numbersFormatter(revenueData?.totalCustomers)
                } total clients`}
                count={revenueData?.totalServedCustomers}
                isFetching={revenueFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Revenues made in Rwf"
                subTitle={`${
                  revenueData?.totalRevenueByJobPaidByKg &&
                  numbersFormatter(revenueData?.totalRevenueByJobPaidByKg)
                } Rwf (0%) paid per KG`}
                count={revenueData?.totalRevenueByJob}
                isFetching={revenueFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Cash collected"
                subTitle={`${
                  revenueData?.totalCollectedAmountPaidByKg &&
                  numbersFormatter(revenueData?.totalCollectedAmountPaidByKg)
                } Rwf (0%) paid per KG`}
                count={revenueData?.totalCollectedAmount}
                isFetching={revenueFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Total distance in KM"
                subTitle={`${
                  revenueData?.totalDistanceByJobs &&
                  numbersFormatter(revenueData?.totalDistanceByJobs)
                } Hrs (0%) with cargo`}
                count={revenueData?.totalDistance}
                isFetching={revenueFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Total hours"
                subTitle={`${
                  revenueData?.totalHoursByJobs &&
                  numbersFormatter(revenueData?.totalHoursByJobs)
                } Hrs (0%) with cargo`}
                count={revenueData?.totalHours}
                isFetching={revenueFetching}
              />
            </CardColWrapper>
            <CardColWrapper active={active}>
              <MediumCard
                title="Total weight in KG"
                subTitle="..."
                count={revenueData?.totalWeight}
                isFetching={revenueFetching}
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
            <RevenueBreakdownChart />
          </MediumChartWrapper>
        </Col>
      </Row>

      <Row className="pb-10 flex justify-between gap-1">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <div className="py-6">
            <span className="opacity-95">Order per Categories</span>
          </div>
          <SmallChartWrapper>
            <OrderPerCategoriesChart />
          </SmallChartWrapper>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <div className="py-6">
            <span className="opacity-95">Weight per Categories</span>
          </div>
          <SmallChartWrapper>
            <OrderPerCategoriesChart />
          </SmallChartWrapper>
        </Col>

        <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
          <div className="py-6">
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
