import { Col, Row } from "antd";
import React, { FC } from "react";
import AnalyticTopContentWrapper from "../Wrappers/AnalyticTopContentWrapper";
import CardColWrapper from "../../Cards/CardColWrapper";
import CardRowWrapper from "../../Cards/CardRowWrapper";
import MediumCard from "../../Cards/MediumCard";
import RevenueBreakdownChart from "../Charts/RevenueBreakdownChart";
import {
  MediumChartWrapper,
  SmallChartWrapper
} from "../Wrappers/ChartWrappers";
import OrderPerCategoriesChart from "../Charts/OrderPerCategoriesChart";
import { AnalyticRevenuesTypes } from "../../../lib/types/pageTypes/Analytics/AnalyticRevenuesTypes";
import {
  AnalyticCardsLoader,
  SmallSpinLoader
} from "../../Shared/Loaders/Loaders";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import { revenuePercentageCalculator } from "../../../helpers/pacentageCalculators";
import WeightPerCategoriesChart from "../Charts/WeightPerCategoriesChart";
import RevenuePerCategoriesChart from "../Charts/RevenuePerCategoriesChart";

const AnalyticRevenues: FC<AnalyticRevenuesTypes> = ({
  active,
  revenueData,
  revenueLoading,
  revenueFetching,
  start,
  end
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
          <CardRowWrapper cardsNumber={6} active={active}>
            <CardColWrapper cardsNumber={6} active={active}>
              <MediumCard
                scope="CLIENTS"
                start={start}
                end={end}
                title="Clients served"
                subTitle={`${
                  revenueData?.totalCustomers &&
                  numbersFormatter(revenueData?.totalCustomers)
                } total clients`}
                count={revenueData?.totalServedCustomers || 0}
                isFetching={revenueFetching}
              />
            </CardColWrapper>

            <CardColWrapper cardsNumber={6} active={active}>
              <MediumCard
                scope="REVENUE"
                start={start}
                end={end}
                title="Revenue made in Rwf"
                subTitle={`${
                  revenueData?.totalSalesRevenue &&
                  numbersFormatter(revenueData?.totalSalesRevenue)
                } Rwf (${revenuePercentageCalculator(
                  revenueData?.totalSalesRevenue,
                  revenueData?.totalRevenue + revenueData?.totalSalesRevenue
                )}%) warehouse sales`}
                count={
                  revenueData?.totalRevenue + revenueData?.totalSalesRevenue ||
                  0
                }
                isFetching={revenueFetching}
              />
            </CardColWrapper>

            <CardColWrapper cardsNumber={6} active={active}>
              <MediumCard
                title="Cash collected"
                subTitle={`${
                  revenueData?.totalCollectedAmountPaidByKg &&
                  numbersFormatter(revenueData?.totalCollectedAmountPaidByKg)
                } Rwf (${revenuePercentageCalculator(
                  revenueData?.totalCollectedAmountPaidByKg,
                  revenueData?.totalCollectedAmount
                )}%) paid per KG`}
                count={revenueData?.totalCollectedAmount || 0}
                isFetching={revenueFetching}
              />
            </CardColWrapper>
            <CardColWrapper cardsNumber={6} active={active}>
              <MediumCard
                scope="DISTANCE"
                start={start}
                end={end}
                title="Total distance in KM"
                subTitle={`${
                  revenueData?.totalDistanceByJobs &&
                  numbersFormatter(revenueData?.totalDistanceByJobs)
                } Hrs (${revenuePercentageCalculator(
                  revenueData?.totalDistance,
                  revenueData?.totalDistanceByJobs
                )}%) with cargo`}
                count={revenueData?.totalDistance || 0}
                isFetching={revenueFetching}
              />
            </CardColWrapper>

            <CardColWrapper cardsNumber={6} active={active}>
              <MediumCard
                scope="HOURS_BY_JOB"
                start={start}
                end={end}
                title="Total hours"
                subTitle={`${
                  revenueData?.totalHoursByJobs &&
                  numbersFormatter(revenueData?.totalHoursByJobs)
                } Hrs (${revenuePercentageCalculator(
                  revenueData?.totalHoursByJobs,
                  revenueData?.totalHours
                )}%) with cargo`}
                count={revenueData?.totalHours || 0}
                isFetching={revenueFetching}
              />
            </CardColWrapper>

            <CardColWrapper cardsNumber={6} active={active}>
              <MediumCard
                title="Total weight in KG"
                subTitle="..."
                count={revenueData?.totalWeight || 0}
                isFetching={revenueFetching}
              />
            </CardColWrapper>
          </CardRowWrapper>
        )}
      </AnalyticTopContentWrapper>
      <Row>
        <Col className="pb-4" xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <span className="opacity-95">
            {revenueLoading || revenueFetching ? (
              <span className="text-xs">Loading Revenue breakdown...</span>
            ) : (
              "Revenue breakdown"
            )}
          </span>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <MediumChartWrapper>
            <RevenueBreakdownChart
              chartData={revenueData}
              isLoading={revenueLoading}
              isFetching={revenueFetching}
            />
          </MediumChartWrapper>
        </Col>
      </Row>

      <Row className="pb-10 flex justify-between gap-1">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <div className="py-6">
            <span className="opacity-95">
              {revenueLoading || revenueFetching ? (
                <span className="text-xs">Loading Order per Categories...</span>
              ) : (
                "Order per Categories"
              )}
            </span>
          </div>
          {revenueLoading || revenueFetching ? (
            <SmallChartWrapper>
              <div className="w-full h-full flex justify-center items-center">
                <SmallSpinLoader />
              </div>
            </SmallChartWrapper>
          ) : (
            <>
              <SmallChartWrapper>
                <OrderPerCategoriesChart
                  chartData={revenueData}
                  isLoading={revenueLoading}
                  isFetching={revenueFetching}
                />
              </SmallChartWrapper>
            </>
          )}
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <div className="py-6">
            <span className="opacity-95">
              {revenueLoading || revenueFetching ? (
                <span className="text-xs">
                  Loading Weight per Categories...
                </span>
              ) : (
                "Weight per Categories"
              )}
            </span>
          </div>
          {revenueLoading || revenueFetching ? (
            <SmallChartWrapper>
              <div className="w-full h-full flex justify-center items-center">
                <SmallSpinLoader />
              </div>
            </SmallChartWrapper>
          ) : (
            <>
              <SmallChartWrapper>
                <WeightPerCategoriesChart
                  chartData={revenueData}
                  isLoading={revenueLoading}
                  isFetching={revenueFetching}
                />
              </SmallChartWrapper>
            </>
          )}
        </Col>

        <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
          <div className="py-6">
            <span className="opacity-95">
              {revenueLoading || revenueFetching ? (
                <span className="text-xs">
                  Loading Revenue per Categories...
                </span>
              ) : (
                "Revenue per Categories"
              )}
            </span>
          </div>
          {revenueLoading || revenueFetching ? (
            <SmallChartWrapper>
              <div className="w-full h-full flex justify-center items-center">
                <SmallSpinLoader />
              </div>
            </SmallChartWrapper>
          ) : (
            <>
              <SmallChartWrapper>
                <RevenuePerCategoriesChart
                  chartData={revenueData}
                  isLoading={revenueLoading}
                  isFetching={revenueFetching}
                />
              </SmallChartWrapper>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AnalyticRevenues;
