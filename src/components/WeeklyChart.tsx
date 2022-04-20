import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  person_uid: string | undefined;
  changedData: number;
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};
/**
const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Task 1",
      data: [10, 11, 20, 15, 25, 9, 18],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointStyle: "circle",
      pointRadius: 10,
      pointHoverRadius: 15,
    },
    {
      label: "Task 2",
      data: [18, 9, 25, 10, 20, 11, 10],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      pointStyle: "circle",
      pointRadius: 10,
      pointHoverRadius: 15,
    },
  ],
};
 */

function WeeklyChart({ person_uid, changedData }: Props) {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Task 1",
        data: [10, 11, 20, 15, 25, 9, 18],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  });

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.post(
          "/mainDashboard",
          JSON.stringify({
            person_uid,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.data.message === "no data.") {
          setShowChart(false);
        } else {
          setData(response.data.data);
          setShowChart(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [changedData]);

  return (
    <div className="w-full">
      {showChart ? (
        <Line options={options} data={data} />
      ) : (
        <h1>You have to set your favourites tasks or create one at least. </h1>
      )}
    </div>
  );
}

export default WeeklyChart;
