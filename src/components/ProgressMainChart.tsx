import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { datasets } from "./GoalsMainCharts";

type Props = { data: data; percentage: number; changedData: number };

type data = {
  labels: string[];
  datasets: datasets[];
};
const options = {
  responsive: true,
  color: "white",
  borderColor: "transparent",
  plugins: {
    tooltip: {
      enabled: true,
    },
  },
};

function ProgressMainChart({ data, percentage, changedData }: Props) {
  const [finalData, setFinalData] = useState({
    labels: ["Done", "All"],
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 10],
        backgroundColor: ["green", "red"],
      },
    ],
  });

  useEffect(() => {
    setFinalData(data);
  }, [changedData, data]);

  return (
    <div className="xl:w-2/3 mx-auto max-h-60 text-white">
      <h2 className="text-lg font-medium">
        {finalData.datasets[0].label} - {percentage}%
      </h2>
      <Doughnut options={options} className="h-fit" data={finalData} />
    </div>
  );
}

export default ProgressMainChart;
