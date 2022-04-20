import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { transformDate, finalDate } from "../helpers/transformDate";

type Props = {};
type TaskProps = {
  task_name: string;
  status: boolean;
  started_at: number;
  finished_at: number | null;
  time: number | null;
};

function Task({ task_name, status, started_at, finished_at, time }: TaskProps) {
  const startDate = transformDate(started_at);
  let finishDate: finalDate = {
    finalDay: "-",
    finalHour: "-",
  };
  if (finished_at !== null) {
    finishDate = transformDate(finished_at);
  }

  let parsedTime: string = "";
  if (time !== null) {
    parsedTime = time.toString().split(".").join(".");
  }

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900">{task_name}</div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
              status ? "indigo" : "green"
            }-100 text-${status ? "indigo" : "green"}-800 `}
          >
            {status ? "Finished" : "Active"}
          </span>
        </td>
        <td className=" hidden md:block px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{startDate.finalHour}</div>
          <div className="text-sm text-gray-500">{startDate.finalDay}</div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {time ? `${parsedTime}` : "-"}
          </span>
        </td>
        <td className=" hidden md:block px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{finishDate.finalHour}</div>
          <div className="text-sm text-gray-500">{finishDate.finalDay}</div>
        </td>
      </tr>
    </tbody>
  );
}

function TableOfTasks({}: Props) {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  let futureTasks: [TaskProps] | [] = [];

  const [tasks, setTasks] = useState(futureTasks);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState([1]);

  useEffect(() => {
    let cancel = false;

    const getData = async () => {
      try {
        const response = await axiosPrivate.post(
          "/tasks",
          JSON.stringify({ person_uid: auth.person_uid, page: actualPage }),
          {
            withCredentials: true,
          }
        );
        let pages = Math.ceil(Number(response.data.message[0].full_count) / 8);

        let tempPages = [];

        for (let i = 1; i <= pages; i++) {
          tempPages.push(i);
        }

        return { tasks: response.data.message, pages: tempPages };
      } catch (err) {
        console.log(err);
        return { tasks: [], pages: [] };
      }
    };
    getData().then(({ tasks, pages }) => {
      if (cancel) return;
      setTasks(tasks);
      setTotalPages(pages);
    });

    return () => {
      cancel = true;
    };
  }, [actualPage]);

  return (
    <div className="p-12 lg:p-20 bg-indigo-100 h-screen min-h-full flex flex-col justify-center gap-10">
      <h1 className="text-3xl font-bold">Recent tasks</h1>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Started At
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Minutes
                    </th>
                    <th
                      scope="col"
                      className="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Finished At
                    </th>
                  </tr>
                </thead>

                {tasks.map((task: TaskProps, index) => {
                  return (
                    <Task
                      key={index}
                      task_name={task.task_name}
                      status={task.status}
                      started_at={task.started_at}
                      finished_at={task.finished_at}
                      time={task.time}
                    />
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
      <nav
        aria-label="Page navigation"
        className="m-auto justify-self-end self-end"
      >
        <ul className="inline-flex">
          <li>
            <button
              onClick={() => {
                actualPage > 1 && setActualPage(actualPage - 1);
              }}
              className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-indigo-200 rounded-l-lg focus:shadow-outline hover:bg-indigo-300"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
              </svg>
            </button>
          </li>
          {totalPages.map((page, index) => {
            if (page === 1) {
              return (
                <li key={index}>
                  <button
                    onClick={() => setActualPage(page)}
                    className={`h-10 px-5 text-indigo-600 bg-indigo-50 ${
                      actualPage === page && "bg-indigo-200"
                    }  transition-colors duration-150 focus:shadow-outline hover:bg-indigo-200`}
                  >
                    {page}
                  </button>
                </li>
              );
            } else if (page === totalPages[totalPages.length - 1]) {
              return (
                <li key={index}>
                  <button
                    onClick={() => setActualPage(page)}
                    className={`h-10 px-5 text-indigo-600 bg-indigo-50 ${
                      actualPage === page && "bg-indigo-200"
                    }  transition-colors duration-150 focus:shadow-outline hover:bg-indigo-200`}
                  >
                    {page}
                  </button>
                </li>
              );
            } else if (page < actualPage + 1 && page > actualPage - 1) {
              return (
                <li key={index}>
                  <button
                    onClick={() => setActualPage(page)}
                    className={`h-10 px-5 text-indigo-600 bg-indigo-50 ${
                      actualPage === page && "bg-indigo-200"
                    }  transition-colors duration-150 focus:shadow-outline hover:bg-indigo-200`}
                  >
                    {page}
                  </button>
                </li>
              );
            } else if (page <= actualPage && page === actualPage - 1) {
              return (
                <li key={index}>
                  <button
                    className={`h-10 px-5 text-indigo-600 bg-indigo-50 
                     transition-colors duration-150 `}
                  >
                    ...
                  </button>
                </li>
              );
            } else if (page >= actualPage && page === actualPage + 1) {
              return (
                <li key={index}>
                  <button
                    className={`h-10 px-5 text-indigo-600 bg-indigo-50   transition-colors duration-150 `}
                  >
                    ...
                  </button>
                </li>
              );
            }
          })}
          <li>
            <button
              onClick={() => {
                actualPage < totalPages[totalPages.length - 1] &&
                  setActualPage(actualPage + 1);
              }}
              className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-indigo-200 rounded-r-lg focus:shadow-outline hover:bg-indigo-300"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TableOfTasks;

/**
 *      <li>
              <button className="h-10 px-5 text-indigo-600 bg-indigo-50 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-200">
                1
              </button>
            </li>
 */
