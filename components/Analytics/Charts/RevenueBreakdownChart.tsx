/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Col, Row } from "antd";
import { BsFillSquareFill } from "react-icons/bs";
import { firstLetterCapitalizer } from "../../../helpers/firstLetterCapitalizer";
import { RevenueBreakdownIndicators } from "../Dummies/Indicators";
import { ChartProps } from "../../../lib/types/pageTypes/Analytics/ChartProps";
import { ChartSmallLoader } from "../../Shared/Loaders/Loaders";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const
    },
    title: {
      display: false,
      text: "Awesome chart"
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
};

const RevenueBreakdownChart: FC<ChartProps> = ({
  chartData,
  isLoading,
  isFetching
}) => {
  /**
   * @author Patrick TUNEZERWANE (AWESOMITY LAB)
   * @since AUgust 01 2022
   */

  const data = {
    labels: chartData?.dates?.map((item: any) => item.date),
    datasets: [
      {
        label: "Total",
        data: chartData?.dates?.map((item: any) => item.totalAmount),
        backgroundColor: ["#EBEFF2"],
        borderWidth: 0
      },
      {
        label: "Paid",
        data: chartData?.dates?.map((item: any) => item.totalPaid),
        backgroundColor: ["#A2B3D1"],
        borderWidth: 0
      },
      {
        label: "Unpaid",
        data: chartData?.dates?.map((item: any) => item.totalUnpaid),
        backgroundColor: ["#E3B22B"],
        borderWidth: 0
      }
    ]
  };

  return (
    <>
      {!isLoading && !isFetching && (
        <Row className="my-5 flex justify-end items-center gap-4">
          {RevenueBreakdownIndicators?.map((item) => (
            <Col
              key={item?.id}
              style={{ display: "flex", gap: "0.4rem" }}
              className="none"
            >
              <span>
                <BsFillSquareFill
                  style={{
                    color: item?.color,
                    fontSize: "0.8rem"
                  }}
                />
              </span>
              <span className="text-xs font-light">
                {item?.text && firstLetterCapitalizer(item?.text)}
              </span>
            </Col>
          ))}
        </Row>
      )}

      {isLoading || isFetching ? (
        ChartSmallLoader("Wait for revenue breakdown chart")
      ) : (
        <Bar height="100%" options={options} data={data} />
      )}
    </>
  );
};

export default RevenueBreakdownChart;
