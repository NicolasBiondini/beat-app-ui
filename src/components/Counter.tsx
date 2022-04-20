import React, { Dispatch, useEffect, useState, SetStateAction } from "react";
import toast from "react-hot-toast";
import { ClipboardListIcon } from "@heroicons/react/outline";
import { task } from "../pages/MainDashboard";

import SelectTask from "./SelectTask";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type Props = {
  selectedTask: task;
  tasks: [task];
  setSelectedTask: Dispatch<SetStateAction<task>>;
  person_uid: string | undefined;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type timeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type localStorageData = {
  task: task;
  started_at: number;
  times_id: string;
};

function Counter({
  selectedTask,
  tasks,
  setSelectedTask,
  person_uid,
}: Props): JSX.Element {
  let timeLeft: timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const axiosPrivate = useAxiosPrivate();

  const [toogleStart, setToogleStart] = useState(false);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(timeLeft);
  const [actualTimeTaskId, setActualTimeTaskId] = useState("");

  const calculateTime = (): void => {
    if (toogleStart) {
      let difference = +new Date().getTime() - time;

      let newTime: timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        newTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setTimer(newTime);
      }
    }
  };

  const handleStart = async (e: any) => {
    e.preventDefault();
    let dateNow = +new Date().getTime();

    setTime(dateNow);
    setToogleStart(true);

    try {
      const res = await axiosPrivate.post(
        "/createnewtimetask",
        JSON.stringify({
          task_id: selectedTask.task_id,
          person_uid,
          started_at: dateNow,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setActualTimeTaskId(res.data?.finalData?.times_id);

      toast.success(`${selectedTask.name} started!`);
    } catch (err) {
      console.log(err);
      toast.error(`${selectedTask.name} can't start. Try again.`);
    }
  };

  const handleStop = async () => {
    if (timer.minutes < 0) {
      toast.error("Wait a least 1 minute to stop your task.");
    } else {
      setToogleStart(false);
      let finishTime = +new Date().getTime();
      let minutes = 0;
      Object.entries(timer).forEach(([key, value]) => {
        if (value !== 0) {
          let toMinutes;
          switch (key) {
            case "days":
              toMinutes = value * 24 * 60;
              minutes = minutes + toMinutes;
              break;
            case "hours":
              toMinutes = value * 60;
              minutes = minutes + toMinutes;
              break;
            case "minutes":
              minutes = minutes + value;
              break;
            case "seconds":
              toMinutes = value / 60;
              minutes = minutes + toMinutes;
              break;

            default:
              break;
          }
        }
      });

      let finalMinutes = Number(minutes.toFixed(2));

      setTime(0);
      setTimer(timeLeft);

      try {
        await axiosPrivate.put(
          "/finishtask",
          JSON.stringify({
            times_id: actualTimeTaskId,
            finished_at: finishTime,
            minutes: finalMinutes,
            task_id: selectedTask.task_id,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log(err);
        toast.error("Task not finished. Something go wrong.");
      }
    }
  };

  // Watch if there is an active time task
  useEffect(() => {
    const getActiveTimeTask = async (): Promise<localStorageData> => {
      try {
        const response = await axiosPrivate.post(
          "/getActiveTimeTask",
          JSON.stringify({ person_uid: person_uid }),
          {
            withCredentials: true,
          }
        );
        return response.data?.message;
      } catch (error) {
        console.log(error);
        return {
          task: { name: "", task_id: "", key: 1 },
          times_id: "",
          started_at: 0,
        };
      }
    };

    // Watch on the server

    getActiveTimeTask().then((finalData) => {
      if (finalData.started_at !== 0) {
        setToogleStart(true);
        setTime(Number(finalData.started_at));
        setActualTimeTaskId(finalData.times_id);
        setSelectedTask(finalData.task);
      }
    });
  }, []);

  useEffect(() => {
    const countTime = setTimeout(() => {
      calculateTime();
    }, 1000);

    return () => {
      clearTimeout(countTime);
    };
  }, [time, timer]);

  return (
    <div
      className="rounded-3xl col-span-6 flex flex-col justify-start items-center gap-5 py-5
  lg:col-span-3 xl:col-span-2 h-56 bg-indigo-800"
    >
      {toogleStart ? (
        <>
          <p className=" self-start text-base lg:text-xl px-5 font-medium text-white flex flex-row justify-center align-middle gap-2">
            <span>
              <ClipboardListIcon className="w-6 h-6 xl:h-8 xl:w-8" />
            </span>
            {selectedTask.name}
          </p>
          {Object.values(timer).some((time) => time !== 0) ? (
            <div className="text-4xl text-white font-bold flex flex-row">
              <p>
                {timer.days < 10 && "0"}
                {timer.days} :{" "}
              </p>
              <p>
                {" "}
                {timer.hours < 10 && "0"}
                {timer.hours} :{" "}
              </p>
              <p>
                {" "}
                {timer.minutes < 10 && "0"}
                {timer.minutes} :{" "}
              </p>
              <p>
                {" "}
                {timer.seconds < 10 && "0"}
                {timer.seconds}
              </p>
            </div>
          ) : (
            <div className="w-100 text-white font-bold text-lg">Loading...</div>
          )}

          <button
            onClick={handleStop}
            className=" text-white mt-8 px-24 xl:px-16 2xl:px-24 py-2 bg-red-700 rounded-lg cursor-pointer hover:bg-red-600 transition-all"
          >
            STOP
          </button>
        </>
      ) : (
        <>
          <p className=" self-start text-base lg:text-xl px-5 font-medium text-white flex flex-row justify-center align-middle gap-2">
            <span>
              <ClipboardListIcon className="w-6 h-6 xl:h-8 xl:w-8" />
            </span>
            Continue task
          </p>
          <SelectTask tasks={tasks} setActiveTask={setSelectedTask} />
          {tasks[0].task_id === "null" ? (
            <button
              className="text-white px-24 xl:px-16 2xl:px-24  py-2 mt-4 bg-indigo-500 rounded-lg cursor-pointer "
              disabled
            >
              START
            </button>
          ) : (
            <form onSubmit={(e) => handleStart(e)}>
              <input
                type="submit"
                className="text-white px-24 xl:px-16 2xl:px-24 py-2 mt-4 bg-indigo-500 rounded-lg cursor-pointer hover:bg-indigo-600 transition-all"
                value={"START"}
              />
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Counter;
