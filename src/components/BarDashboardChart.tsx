import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import "chart.js/auto";

type frontEndGraphOneData = {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: 1;
    }
  ];
};

type Props = {
  data: frontEndGraphOneData;
};

const options = {
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function BarDashboardChart({ data }: Props) {
  return (
    <div className="bg-white w-full h-96 lg:h-[34rem] lg:w-2/3 lg:justify-self-start px-8 pt-8 pb-10 flex flex-col gap-4 rounded-3xl">
      <h1 className="text-lg font-semibold">Last 30 Days</h1>
      <Bar className="pb-5" options={options} data={data} />
    </div>
  );
}

export default BarDashboardChart;
