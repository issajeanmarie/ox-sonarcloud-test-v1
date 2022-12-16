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
import { TruckActivityBreakdownIndicators } from "../Dummies/Indicators";
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

const TruckActivityBreakdownChart: FC<ChartProps> = ({
  chartData,
  isLoading,
  isFetching
}) => {
  /**
   * @author Patrick TUNEZERWANE (AWESOMITY LAB)
   * @since AUgust 02 2022
   */

  const data = {
    labels: chartData?.map((item: any) => item.date),
    datasets: [
      {
        label: "Distance (km)",
        data: chartData?.map((item: any) => item.totalDistance),
        backgroundColor: ["#000000"],
        borderWidth: 0
      },
      {
        label: "Time",
        data: chartData?.map((item: any) => item.totalDuration),
        backgroundColor: ["#E7B522"],
        borderWidth: 0
      }
    ]
  };

  return (
    <>
      {!isLoading && !isFetching && (
        <Row className="my-5 flex justify-end items-center gap-4">
          {TruckActivityBreakdownIndicators?.map((item) => (
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
        ChartSmallLoader("Loading...")
      ) : (
        <Bar height="10%" options={options} data={data} />
      )}
    </>
  );
};

export default TruckActivityBreakdownChart;
