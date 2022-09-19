import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const
    },
    title: {
      display: false,
      text: "Here we go"
    }
  }
};

export function TruckRevenueBreakdownChart({ chartData }: any) {
  const labels = chartData?.map((data: any) => data.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Total amount",
        data: chartData?.map((label: any) => label.totalAmount),
        backgroundColor: ["#E7B522"]
      },
      {
        label: "Distance",
        data: chartData?.map((label: any) => label.totalDistance),
        backgroundColor: ["#2A3548"]
      }
    ]
  };

  return <Line options={options} data={data} />;
}
