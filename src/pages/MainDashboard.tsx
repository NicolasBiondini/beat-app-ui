import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { CogIcon, PencilAltIcon } from "@heroicons/react/outline";

import DashboardContainer from "../components/DashboardContainer";
import Counter from "../components/Counter";
import WeeklyChart from "../components/WeeklyChart";
import ConfigModal from "../components/ConfigModal";
import GoalsMainCharts from "../components/GoalsMainCharts";
import GoalModal from "../components/GoalModal";

type Props = {};

export type task = { name: string; task_id: string; key: number };

function MainDashboard({}: Props) {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  let initialTasks: [task] = [{ name: "No tasks.", task_id: "null", key: 1 }];

  let initialTask: task = { name: "", task_id: "", key: 1 };

  const [newTask, setNewTask] = useState("");
  const [userName, setUserName] = useState("");
  const [flag, setFlag] = useState(0);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [goalModalIsOpen, setGoalModalIsOpen] = useState(false);
  const [changedData, setChangedData] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleSubmitTask = async (e: any) => {
    e.preventDefault();
    if (newTask.length <= 1 || newTask.length >= 20) {
      toast.error("Introduce a valid name to your task.");
    } else {
      // check the field
      let path;
      // tasks[0].task_id === "null" && tasks[0].name === "No tasks."
      if (tasks.length <= 3) {
        path = "/firsttask";
      } else {
        path = "/createtask";
      }

      let task = newTask.charAt(0).toUpperCase() + newTask.slice(1);

      try {
        const response = await axiosPrivate.post(
          path,
          JSON.stringify({
            task_name: task,
            person_uid: auth.person_uid,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          // Recive the message and token
          if (path === "/firsttask") {
            setChangedData(changedData + 1);
          }
          toast.success(`Task "${task}" created Succesfully.`);
          setNewTask("");
          setFlag(flag + 1);
        }
      } catch (err: any) {
        console.log(err);
        toast.error(`Task "${task}" it's already created, try another name.`);
      }
    }
  };

  // Open Config Modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Open goal Modal
  const openGoalModal = () => {
    setGoalModalIsOpen(true);
  };

  // Fetch the data
  useEffect(() => {
    let cancel = false;

    const getData = async () => {
      try {
        const response = await axiosPrivate.post(
          "/home",
          JSON.stringify({ person_uid: auth.person_uid }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        let tasks = await response.data.data.map((task: any, index: number) => {
          return {
            name: task.task_name,
            task_id: task.task_id,
            key: index,
          };
        });

        let userName: string = response.data.data[0].user_name;

        return { userName, tasks };
      } catch (err) {
        console.log(err);
        return { userName: "", tasks: [] };
      }
    };

    getData().then(({ userName, tasks }) => {
      if (cancel) return;

      if (tasks[0].name !== undefined) {
        setTasks(tasks);
      }
      setSelectedTask(tasks[0]);
      setUserName(userName);
      setLoading(false);
    });

    return () => {
      cancel = true;
    };
  }, [flag]);

  return (
    <DashboardContainer>
      {loading ? (
        <div className="bg-indigo-100 lg:max-h-screen min-h-screen lg:overflow-y-scroll px-10 lg:pl-20 lg:pr-20 m-auto py-8 ">
          <h1>Loading</h1>
        </div>
      ) : (
        <div className="bg-indigo-100 lg:max-h-screen min-h-screen lg:overflow-y-scroll px-10 lg:pl-20 lg:pr-20 m-auto py-8 ">
          <ConfigModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            tasks={tasks}
            person_uid={auth.person_uid}
            changedData={changedData}
            setChangedData={setChangedData}
          />
          <GoalModal
            modalIsOpen={goalModalIsOpen}
            setModalIsOpen={setGoalModalIsOpen}
            tasks={tasks}
            person_uid={auth.person_uid}
            changedData={changedData}
            setChangedData={setChangedData}
          />
          <div className=" w-full flex flex-col gap-1 mb-8">
            <h1 className="text-4xl font-medium tracking-normal">
              Hello {userName} 👋
            </h1>
            <h2 className="text-base text-gray-400 tracking-wider">
              Welcome back !
            </h2>
          </div>
          <div className=" grid grid-cols-1  grid-flow-row  lg:grid-cols-6 lg:h-5/6 w-full lg:grid-rows-3 gap-8 ">
            <Counter
              selectedTask={selectedTask}
              tasks={tasks}
              setSelectedTask={setSelectedTask}
              person_uid={auth.person_uid}
              setLoading={setLoading}
            />
            <div className="rounded-3xl col-span-6 flex flex-col justify-start  gap-5 py-5 lg:col-span-3 xl:col-span-2 h-56 bg-violet-800 items-center">
              <p className=" self-start text-base lg:text-xl px-5 font-medium text-white flex flex-row justify-center align-middle gap-2">
                <span>
                  <PencilAltIcon className="w-6 h-6 xl:h-8 xl:w-8" />
                </span>
                New task
              </p>
              <form
                onSubmit={(e) => handleSubmitTask(e)}
                className="flex flex-col justify-start items-center"
              >
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  className="rounded-xl px-4 xl:px-3 2xl:px-4 border-transparent flex-1 appearance-none border border-gray-300 py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent lg:py-3 lg:px-5"
                  placeholder="Task name"
                  value={newTask}
                />
                <input
                  type="submit"
                  className=" text-white px-24 xl:px-16 2xl:px-24 py-2 mt-11 bg-violet-500 rounded-lg cursor-pointer hover:bg-violet-600 transition-all"
                  value="CREATE TASK"
                />
              </form>
            </div>
            <div className="rounded-3xl hidden h-full xl:h-100 lg:row-span-3 col-span-2  bg-blue-700 xl:flex xl:flex-col xl:gap-4  xl:py-3">
              <div className="flex flex-row justify-between px-4 text-white">
                <h1 className="text-lg font-semibold ">Goals on Minutes</h1>
                <button className="" onClick={openGoalModal}>
                  <CogIcon className="w-6 h-6 xl:h-8 xl:w-8" />
                </button>
              </div>
              <GoalsMainCharts
                person_uid={auth.person_uid}
                changedData={changedData}
              />
            </div>
            <div className="col-span-6 xl:col-span-4 h-96 md:h-full lg:row-span-2 w-full  bg-white rounded-3xl flex flex-col items-center justify-center p-2  lg:py-6 lg:px-10  ">
              <div className="flex flex-row w-full justify-between align-baseline">
                <h1 className="text-lg font-semibold ">Last Week Minutes</h1>
                <button className="" onClick={openModal}>
                  <CogIcon className="w-6 h-6 xl:h-8 xl:w-8" />
                </button>
              </div>
              <WeeklyChart
                person_uid={auth.person_uid}
                changedData={changedData}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
}

export default MainDashboard;
