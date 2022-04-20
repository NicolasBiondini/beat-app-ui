import React, { useEffect, useState } from "react";
import DashboardContainer from "../components/DashboardContainer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import BarDashboardChart from "../components/BarDashboardChart";
import useAuth from "../hooks/useAuth";
import DashboardCard from "../components/DashboardCard";
import MonthlyChartDashboard from "../components/MonthlyChartDashboard";
import ProgressMainChart from "../components/ProgressMainChart";
import { data } from "../components/GoalsMainCharts";
import { task } from "../pages/MainDashboard";

import {
  HomeIcon,
  CogIcon,
  ChartBarIcon,
  ChartPieIcon,
} from "@heroicons/react/outline";
import DashboardModal from "../components/DashboardModal";

type Props = {};

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

export type monthChartData = {
  task: string;
  tasks: string[];
  month: string;
  months: string[];
  year: number;
};

function Dashboard({}: Props) {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  let tempData: frontEndGraphOneData = {
    labels: [],
    datasets: [
      {
        label: "Minutes",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
        borderWidth: 1,
      },
    ],
  };

  let tempDataMonth = {
    labels: [],
    datasets: [
      {
        label: "Task 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  let tempmonthChartData: monthChartData = {
    task: "",
    tasks: [],
    month: "",
    months: [""],
    year: 0,
  };

  let tempDonutChartData: data = {
    graph: {
      labels: ["Done", "Goal"],
      datasets: [
        {
          label: "task_name",
          data: [1, 10],
          backgroundColor: ["#4895EF", "#F72585"],
        },
      ],
    },
    percentage: 20,
  };

  let tempModalConfig = {
    type: "",
    endpoint: "",
  };

  let tempTasks: task[] = [
    {
      name: "",
      task_id: "",
      key: 0,
    },
  ];

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(tempTasks);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(tempModalConfig);
  const [changeData, setChangeData] = useState(0);
  const [firstGraph, setFirstGraph] = useState(tempData);
  const [cardsData, setCardsData] = useState({
    month: { task: "", minutes: "" },
    year: { task: "", minutes: "" },
  });
  const [donutChart, setDonutChart] = useState(tempDonutChartData);
  const [monthGraph, setMonthGraph] = useState(tempDataMonth);
  const [monthGraphInfo, setMonthGraphInfo] = useState(tempmonthChartData);

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

  const handleModal = (e: any) => {
    e.preventDefault();

    console.log(e);

    switch (e.target.id) {
      case "donut":
        setModalConfig({ type: "donut", endpoint: "/setgoaltaskdashboard" });
        setModalIsOpen(true);
        break;
      case "year":
        setModalConfig({ type: "year", endpoint: "/setyeartask" });
        setModalIsOpen(true);
        break;
      case "month":
        setModalConfig({ type: "month", endpoint: "/setmonthtask" });
        setModalIsOpen(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let cancel = false;
    const getData = async () => {
      try {
        const response = await axiosPrivate.post(
          "/dashboard",
          JSON.stringify({
            person_uid: auth.person_uid,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          let tasks = response.data.data.tasks.data.map(
            (task: any) => task.task_name
          );

          let arrayOfTasks = response.data.data.tasks.data.map(
            (task: any, index: number) => {
              return { name: task.task_name, task_id: "", key: index };
            }
          );

          let months = response.data.data.monthChart.months.map(
            (month: number) => monthNames[month - 1]
          );

          return {
            dataTasks: arrayOfTasks,
            datFirstGraph: response.data.data.firstDashboard[0],
            datMonthGraph: response.data.data.monthChart.data,
            dataMonthGraphInfo: {
              task: response.data.data.monthChart.task,
              tasks: tasks,
              month: monthNames[response.data.data.monthChart.month - 1],
              months: months,
              year: response.data.data.monthChart.year,
            },
            dataCards: response.data.data.cards,
            dataDonut: response.data.data.donut,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          dataTasks: [],
          datFirstGraph: {},
          datMonthGraph: {},
          dataMonthGraphInfo: {},
          dataCards: [],
          dataDonut: {},
        };
      }
      return {
        dataTasks: [],
        datFirstGraph: {},
        datMonthGraph: {},
        dataMonthGraphInfo: {},
        dataCards: [],
        dataDonut: {},
      };
    };
    getData().then((data) => {
      if (cancel) return;
      let {
        dataTasks,
        datFirstGraph,
        datMonthGraph,
        dataMonthGraphInfo,
        dataCards,
        dataDonut,
      } = data;

      setTasks(dataTasks);
      setFirstGraph(datFirstGraph);
      setMonthGraph(datMonthGraph);
      if (dataMonthGraphInfo.month !== undefined) {
        setMonthGraphInfo(dataMonthGraphInfo);
      }
      setCardsData(dataCards);
      setDonutChart(dataDonut);
      setLoading(false);
    });
    return () => {
      cancel = true;
    };
  }, [changeData]);

  return (
    <DashboardContainer>
      {loading ? (
        <div className="lg:max-h-screen min-h-screen lg:overflow-y-scroll p-12 lg:p-20 bg-indigo-100 flex flex-col gap-10">
          <p>loading</p>
        </div>
      ) : (
        <div className="lg:max-h-screen min-h-screen lg:overflow-y-scroll p-12 lg:p-20 bg-indigo-100 flex flex-col gap-10">
          <DashboardModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            type={modalConfig.type}
            endpoint={modalConfig.endpoint}
            tasks={tasks}
            person_uid={auth.person_uid}
            changedData={changeData}
            setChangedData={setChangeData}
          />
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className=" w-full h-full flex flex-col gap-8">
            <div className=" w-full h-full flex flex-col lg:flex-row gap-8">
              <BarDashboardChart data={firstGraph} />
              <div className="h-[34rem] w-full lg:w-1/3 flex flex-col gap-8">
                <DashboardCard
                  data={cardsData.month}
                  time={"month"}
                  icon={
                    <ChartBarIcon className="h-8 w-8 xl:h-12 xl:w-12 text-indigo-200" />
                  }
                  color={"violet"}
                  config={
                    <CogIcon
                      id="month"
                      onClick={(e) => handleModal(e)}
                      className="h-6 w-6 xl:h-8 xl:w-8 text-indigo-50 cursor-pointer self-end justify-self-start"
                    />
                  }
                />
                <DashboardCard
                  data={cardsData.year}
                  time={"year"}
                  icon={
                    <ChartPieIcon className="h-8 w-8 xl:h-12 xl:w-12 text-indigo-200" />
                  }
                  color={"indigo"}
                  config={
                    <CogIcon
                      id="year"
                      onClick={(e) => handleModal(e)}
                      className="h-6 w-6 xl:h-8 xl:w-8 text-indigo-50 cursor-pointer self-end justify-self-start"
                    />
                  }
                />
              </div>
            </div>

            <div className="w-full h-full flex flex-col lg:flex-row gap-8">
              <div className="w-full min-h-96 h-100 pb-48 lg:h-100 lg:pb-0 flex flex-col items-center pt-10 gap-0 xl:gap-20 lg:w-1/3 bg-indigo-500 rounded-3xl px-4 ">
                <CogIcon
                  id="donut"
                  onClick={(e) => handleModal(e)}
                  className="h-6 w-6 xl:h-8 xl:w-8 text-indigo-50 cursor-pointer self-end justify-self-start"
                />
                <div className="max-w-xs lg:max-w-3xl w-full">
                  <ProgressMainChart
                    data={donutChart.graph}
                    percentage={donutChart.percentage}
                    changedData={changeData}
                  />
                </div>
              </div>
              <div className="bg-white w-full h-full lg:w-2/3 lg:justify-self-start p-8 flex flex-col gap-y-3  lg:p-10 lg:pb-16 rounded-3xl">
                <h1 className="text-lg font-semibold">
                  Minutes of {monthGraphInfo.task} on {monthGraphInfo.month}
                </h1>
                <MonthlyChartDashboard
                  person_uid={auth.person_uid}
                  data={monthGraph}
                  actualTask={monthGraphInfo.task}
                  tasks={monthGraphInfo.tasks}
                  month={monthGraphInfo.month}
                  months={monthGraphInfo.months}
                  setMonthInfo={setMonthGraphInfo}
                  monthGraphInfo={monthGraphInfo}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
