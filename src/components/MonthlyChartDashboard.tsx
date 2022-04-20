import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { ChartProps, Line } from "react-chartjs-2";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SelectorMonthlyChart from "./SelectorMonthlyChart";
import { monthChartData } from "../pages/Dashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
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
  person_uid?: string;
  data: ChartData<"line">;
  actualTask: string;
  tasks: string[];
  month: string;
  months: string[];
  setMonthInfo: Dispatch<SetStateAction<monthChartData>>;
  monthGraphInfo: monthChartData;
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

function MonthlyChartDashboard({
  person_uid,
  data,
  actualTask,
  tasks,
  month,
  months,
  setMonthInfo,
  monthGraphInfo,
}: Props) {
  const [chartData, setChartData] = useState(data);
  const [selectedTask, setSelectedTask] = useState(actualTask);
  const [selectedMonth, setSelectedMonth] = useState(month);

  const axiosPrivate = useAxiosPrivate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChangeGraph = async () => {
    try {
      const response = await axiosPrivate.post(
        "/refreshgraph",
        JSON.stringify({
          person_uid,
          taskName: selectedTask,
          month: monthNames.indexOf(selectedMonth) + 1,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response.data.data);

        let months = response.data.data.months.map(
          (month: number) => monthNames[month - 1]
        );

        setChartData(response.data.data.data);
        setMonthInfo({
          task: response.data.data.task,
          tasks: monthGraphInfo.tasks,
          month: monthNames[response.data.data.month - 1],
          months: months,
          year: response.data.data.year,
        });
      }
      // TO DO:
      // ALERT MODAL
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSelectedTask(actualTask);
  }, [actualTask]);

  useEffect(() => {
    setSelectedMonth(month);
  }, [month]);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-100 justify-end items-center gap-x-4">
        <SelectorMonthlyChart
          actualTask={selectedTask}
          tasks={tasks}
          setActiveTask={setSelectedTask}
          key={1}
        />
        <SelectorMonthlyChart
          actualTask={selectedMonth}
          tasks={months}
          setActiveTask={setSelectedMonth}
          key={2}
        />
        <div className=" cursor-pointer w-14 py-1 rounded-md bg-indigo-400 flex flex-row justify-center lg:py-2 text-xs">
          <p className="text-white font-normal">2022</p>
        </div>
        <button
          className="cursor-pointer w-14 py-1 rounded-md bg-green-300 flex flex-row justify-center lg:py-2 text-xs text-green-700 hover:bg-green-400 transition-all"
          onClick={handleChangeGraph}
        >
          Update
        </button>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
}

export default MonthlyChartDashboard;
