/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { chartCutout } from "../../../lib/charts/cutouts";
import { ChartProps } from "../../../lib/types/pageTypes/Analytics/ChartProps";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  cutout: chartCutout
};

const WeightPerCategoriesChart: FC<ChartProps> = ({ chartData }) => {
  const data = {
    labels: chartData?.payload?.map((item: any) => item?.serviceName),
    datasets: [
      {
        data: chartData?.payload?.map((item: any) => item?.total),
        backgroundColor: ["#E3B221", "#EAEFF2", "#2A3548"],
        borderWidth: 0
      }
    ]
  };

  return (
    <>
      <Doughnut options={options} data={data} />
    </>
  );
};

export default WeightPerCategoriesChart;
