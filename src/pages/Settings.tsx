import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

import DashboardContainer from "../components/DashboardContainer";

type Props = {};
type RowProps = {
  person_uid: string | undefined;
  task_name: string;
  goal: number;
};

function Rows({ person_uid, task_name, goal }: RowProps) {
  const [newGoal, setNewGoal] = useState("100");

  const axiosPrivate = useAxiosPrivate();

  const handleChangeGoal = async () => {
    if (Number(newGoal) > 100000 || Number(newGoal) < 1) {
      toast.error("You need to set a goal > than 0 and < than 100000.");
    } else {
      console.log(newGoal);

      try {
        const response = await axiosPrivate.put(
          "/setgoal",
          JSON.stringify({
            person_uid: person_uid,
            task_name: task_name,
            newGoal: newGoal,
          }),
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          toast.success("Goal updated!");
        }
      } catch (error) {
        toast.error("Something go wrong, try again latter.");
      }
    }
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-1 md:px-3 lg:px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-sm w-10/12 md:w-full overflow-clip font-medium text-gray-900">
              {task_name}
            </div>
          </div>
        </td>
        <td className="px-1 md:px-3 lg:px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${"indigo"}-100 text--800 `}
          >
            {goal}
          </span>
        </td>
        <td className="px-1 md:px-3 lg:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            <input
              className="w-20"
              onChange={(e) => {
                setNewGoal(e.target.value);
              }}
              value={newGoal}
              min={1}
              max={100000}
              type="number"
              placeholder="100"
            />
          </div>
        </td>

        <td className=" px-1 md:px-3 lg:px-6 py-4 whitespace-nowrap">
          <button
            onClick={handleChangeGoal}
            className="px-4 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800"
          >
            Save
          </button>
        </td>
      </tr>
    </tbody>
  );
}

type task = {
  task_name: string;
  goal: number;
};

function Settings({}: Props) {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  let initialTasks: task[] = [{ task_name: "", goal: 100 }];

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    let cancel = false;

    const getData = async () => {
      try {
        const response = await axiosPrivate.post(
          "/settings",
          JSON.stringify({ person_uid: auth.person_uid }),
          {
            withCredentials: true,
          }
        );

        return response.data.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    };
    getData().then((data) => {
      if (cancel) return;
      setTasks(data);
    });

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <DashboardContainer>
      <div className="lg:max-h-screen min-h-screen lg:overflow-y-scroll p-12 lg:p-20 bg-indigo-100 flex flex-col gap-10">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="flex flex-col gap-10">
          <div className=" flex flex-col gap-5">
            <h2 className="text-xl font-bold">Set Goals</h2>
            <div className="w-full">
              <div className="w-full flex flex-row gap-4 justify-between">
                <div className="shadow w-full overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-1 md:px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Task Name
                        </th>
                        <th
                          scope="col"
                          className=" px-1 md:px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Goal
                        </th>
                        <th
                          scope="col"
                          className="px-1 md:px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          New Goal
                        </th>

                        <th
                          scope="col"
                          className="px-1 md:px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Save Change
                        </th>
                      </tr>
                    </thead>
                    {tasks.map((task, index) => {
                      return (
                        <Rows
                          key={index}
                          person_uid={auth.person_uid}
                          task_name={task.task_name}
                          goal={task.goal}
                        />
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default Settings;
