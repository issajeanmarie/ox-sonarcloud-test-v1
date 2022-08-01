import React from "react";
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
import { RevenueBreakdownLabels } from "../Dummies/RevenueBreakdownLabels";
import { RevenueBreakdownIndicators } from "../Dummies/RevenueBreakdownIndicators";

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

const RevenueBreakdownChart = () => {
  /**
   * @author Patrick TUNEZERWANE (AWESOMITY LAB)
   * @since AUgust 01 2022
   */

  const data = {
    labels: RevenueBreakdownLabels,
    datasets: [
      {
        data: [24, 45, 34, 30, 44, 45, 35, 45, 47, 40, 40, 50],
        backgroundColor: ["#EBEFF2"],
        borderWidth: 0
      },
      {
        data: [19, 19, 3, 5, 20, 3, 40, 25, 20, 22, 30, 40],
        backgroundColor: ["#A2B3D1"],
        borderWidth: 0
      },
      {
        data: [13, 19, 3, 5, 23, 3, 40, 16, 15, 10, 20, 35],
        backgroundColor: ["#E3B22B"],
        borderWidth: 0
      }
    ]
  };

  return (
    <>
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
      <Bar height="100%" options={options} data={data} />
    </>
  );
};

export default RevenueBreakdownChart;
