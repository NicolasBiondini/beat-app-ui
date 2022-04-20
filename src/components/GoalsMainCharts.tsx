import { useEffect, useState } from "react";
import ProgressMainChart from "./ProgressMainChart";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type Props = { person_uid: string | undefined; changedData: number };

export type datasets = {
  label: string;
  data: number[];
  backgroundColor: string[];
};

export type data = {
  percentage: number;
  graph: {
    labels: string[];
    datasets: datasets[];
  };
};

function GoalsMainCharts({ person_uid, changedData }: Props) {
  const axiosPrivate = useAxiosPrivate();

  let tempData: data[] | [] = [];

  const [data, setData] = useState(tempData);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.post(
          "/goalscharts",
          JSON.stringify({
            person_uid: person_uid,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.message === "correct.") {
          setData(response.data.data);
          setRefresh(refresh + 1);
        } else {
          setData([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [changedData]);

  return (
    <div className="w-full h-full flex flex-col xl:gap-24 ">
      {data.map((task: data, index) => {
        return (
          <ProgressMainChart
            key={index}
            data={task.graph}
            percentage={task.percentage}
            changedData={refresh}
          />
        );
      })}
      {data.length <= 1 && (
        <>
          {data.length === 0 && (
            <h1 className="m-auto text-white text-lg font-bold">
              Add a new goal task here
            </h1>
          )}
          <h1 className="m-auto text-white text-lg font-bold">
            Add a new goal task here
          </h1>
        </>
      )}
    </div>
  );
}

export default GoalsMainCharts;
