import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { chartCutout } from "../../../lib/charts/cutouts";

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

const OrderPerCategoriesChart = () => {
  const data = {
    labels: ["Coffee", "Furniture"],
    datasets: [
      {
        label: "# of Votes",
        data: [30, 70],
        backgroundColor: ["#E3B221", "#EAEFF2"],
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

export default OrderPerCategoriesChart;
