import { useEffect } from "react";

type Props = {
  data: { task: string; minutes: string };
  time: string;
  icon: JSX.Element;
  color: string;
  config: JSX.Element;
};

function DashboardCard({ data, time, icon, color, config }: Props) {
  useEffect(() => {}, [data]);

  return (
    <div
      className={`w-full h-1/2 bg-${color}-800 rounded-3xl px-10 py-8 flex flex-col justify-start`}
    >
      <div className="h-100 flex flex-col justify-center gap-4">
        <div className="w-full flex flex-row ">
          <div className="w-full flex flex-row gap-x-4 lg:gap-x-2 xl:gap-x-6">
            <div
              className={`p-6 font-bold text-xl bg-${color}-600 max-w-min rounded-full border-4 border-${color}-500`}
            >
              {icon}
            </div>
            <p className="text-xl lg:text-lg xl:text-2xl font-bold text-indigo-100 self-center">
              {data.task}
            </p>
          </div>

          <span className="self-start items-end">{config}</span>
        </div>

        <div className="flex flex-col justify-end items-end w-100">
          <p className="text-lg font-medium text-indigo-100 ">
            <span className="text-green-400 font-bold text-xl">
              {data.minutes}
            </span>{" "}
            minutes
          </p>
          <p className="text-lg font-medium text-indigo-100">this {time}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
