import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { task } from "../pages/MainDashboard";

type Props = {
  tasks: [task];
  setActiveTask: Dispatch<SetStateAction<task>>;
};

function SelectTask({ tasks, setActiveTask }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const handleClick = (e: any) => {
    e.preventDefault();
    let taskName = e.target.textContent;
    setSelectedTask(taskName);

    let taskObject = tasks.filter((task) => task.name === taskName);

    setActiveTask(taskObject[0]);
  };

  useEffect(() => {
    if (tasks.length >= 1) {
      setSelectedTask(tasks[0].name);
    }
  }, [tasks]);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative mt-2 cursor-pointer w-72 lg:w-80 xl:w-64 2xl:w-80 py-2 rounded-lg bg-indigo-400 lg:py-3 "
    >
      <div className="">
        <p className="text-white font-normal flex flex-row justify-between px-4  items-center">
          {selectedTask}
          <span>
            <ChevronDownIcon className="justify-self-end w-4 h-4 xl:h-6 xl:w-6" />
          </span>
        </p>
        {open && tasks[0].name !== "No tasks." && (
          <div className="absolute max-h-24 mt-3 overflow-y-scroll  cursor-pointer left-0 bottom-100 rounded-lg ">
            {tasks.map(({ name, key }) => {
              return (
                <p
                  className="bg-indigo-100 w-72 px-4 lg:w-80 py-2 hover:bg-indigo-600 hover:text-white transition-all"
                  key={key}
                  onClick={(e) => handleClick(e)}
                >
                  {name}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectTask;
