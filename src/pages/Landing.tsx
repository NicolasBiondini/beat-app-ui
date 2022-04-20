import React from "react";
import LandingAnimation from "../components/Lottie/LandingAnimation";
import { SparklesIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

type Props = {};

function Landing({}: Props) {
  return (
    <section className="self-start w-full">
      <div className="bg-indigo-50 w-full">
        <div className="lg:max-w-5xl xl:max-w-6xl bg-indigo-50 self-start mx-auto px-10 flex flex-col items-center xl:px-0">
          <nav className="w-full h-36 flex flex-row items-center">
            <ul className="w-full h-full flex flex-row justify-between items-center">
              <li className="text-indigo-700 font-semibold text-lg lg:text-2xl cursor-pointer hover:text-indigo-400 transition-all flex flex-row justify-center">
                <a>Beat</a>
                <span className="ml-2 md:ml-3 font-medium text-sm md:text-base  text-green-600 bg-green-400 bg-opacity-70 py-1 px-3 rounded-lg">
                  beta
                </span>
              </li>
              <ul className=" hidden lg:flex w-1/4 flex-row justify-around">
                <Link to="/home">
                  <li className="text-indigo-400 border-indigo-400 font-medium text-base border-2 rounded-md px-6 py-2 hover:text-indigo-600 hover:border-indigo-600 transition-all cursor-pointer">
                    <a>Sign In</a>
                  </li>
                </Link>
                <Link to="/signup">
                  <li className="text-indigo-50 border-indigo-900 bg-indigo-800 font-medium text-base border-2 rounded-md px-6 py-2 hover:text-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer">
                    <a>Sign Up</a>
                  </li>
                </Link>
              </ul>
            </ul>
          </nav>
          <div className="w-full h-full flex flex-row justify-start items-center gap-12 ">
            <div className="flex flex-col w-full md:w-1/2 py-24 lg:py-32 gap-16">
              <h1 className="align-middle font-semibold text-6xl xl:text-7xl  xl:tracking-wide  text-indigo-800 pr-4">
                Keep a record of your{" "}
                <span className="underline decoration-wavy xl:underline-offset-[.8rem] decoration-indigo-400">
                  actions.
                </span>{" "}
              </h1>
              <h2 className="text-indigo-900 border-l-4 pl-4 pr-10 border-indigo-700">
                Don't use your head to keep a count of your activites, with us
                you can set goals and finish them with{" "}
                <span className="font-bold  ">real metrics</span>.
              </h2>
              <Link to="/home">
                <button className="text-indigo-50 border-indigo-900 bg-indigo-800 font-medium text-base w-48 border-2 rounded-md px-6 py-2 hover:text-indigo-100  hover:bg-indigo-700 transition-all cursor-pointer">
                  Start Now
                </button>
              </Link>
            </div>
            <div className=" hidden md:inline-block md:w-1/2">
              <LandingAnimation />
            </div>
          </div>
          <div className="bg-indigo-800 w-11/12 lg:h-80 rounded-3xl my-10 py-12 px-14 flex flex-col lg:flex-row justify-around items-center ">
            <div className=" flex flex-col items-center gap-4 h-full w-44 max-w-xs">
              <SparklesIcon className=" text-white w-4 h-4 xl:h-10 xl:w-10 " />
              <h2 className="text-2xl text-white font-medium">Card 1</h2>
              <p>Do your day to day actions</p>
            </div>
            <div className=" flex flex-col items-center gap-4 h-full w-44 max-w-xs">
              <SparklesIcon className=" text-white w-4 h-4 xl:h-10 xl:w-10 " />
              <h2 className="text-2xl text-white font-medium">Card 2</h2>
              <p>Register all and save it</p>
            </div>
            <div className=" flex flex-col items-center gap-4 h-full w-44 max-w-xs">
              <SparklesIcon className=" text-white w-4 h-4 xl:h-10 xl:w-10 " />
              <h2 className="text-2xl text-white font-medium">Card 3</h2>
              <p>Have real metrics of your actions and goals</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-indigo-50 w-full">
        <div className="lg:max-w-5xl xl:max-w-6xl  self-start mx-auto px-10 flex flex-col items-center xl:px-0">
          <div className="w-full flex flex-col md:flex-row items-center gap-12 my-10">
            <div className="w-full md:w-1/2">
              <LandingAnimation />
            </div>
            <div className="w-full md:w-1/2 md:px-16 flex flex-col gap-6">
              <h2 className="text-indigo-800 text-4xl font-semibold">
                Don't waste your time
              </h2>
              <p className=" text-base md:pr-16">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit veniam aspernatur facere, consectetur velit fugiat
                quam error possimus eaque? Possimus numquam odio ipsam saepe
                fugiat quidem modi dolorem, laboriosam ducimus?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
