import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  actualTask: string;
  tasks: string[];
  setActiveTask: Dispatch<SetStateAction<string>>;
};

function SelectorMonthlyChart({ actualTask, tasks, setActiveTask }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(actualTask);

  const handleClick = (e: any) => {
    e.preventDefault();
    let taskName = e.target.textContent;
    setSelectedTask(taskName);

    let taskObject = tasks.filter((task) => task === taskName);

    setActiveTask(taskObject[0]);
  };

  useEffect(() => {
    setSelectedTask(actualTask);
  }, [actualTask]);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative cursor-pointer w-20 lg:w-24 py-1 rounded-md bg-indigo-400 lg:py-2 text-xs"
    >
      <div className="">
        <p className="text-white font-normal flex flex-row justify-between px-4  items-center">
          {selectedTask}
        </p>
        {open && tasks.length !== 0 && (
          <div className="absolute max-h-24 mt-3 overflow-y-scroll  cursor-pointer left-0 bottom-100 rounded-lg ">
            {tasks.map((task, index) => {
              if (task !== actualTask) {
                return (
                  <p
                    className="bg-indigo-100 w-20 px-4 lg:w-24 py-1 hover:bg-indigo-600 hover:text-white transition-all"
                    key={index}
                    onClick={(e) => handleClick(e)}
                  >
                    {task}
                  </p>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectorMonthlyChart;
