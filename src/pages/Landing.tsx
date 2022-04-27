import React from "react";
import LandingAnimation from "../components/Lottie/LandingAnimation";
import { PlayIcon, StopIcon, ChartPieIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Card from "../components/Landing/Card";
import DashboardAnimation from "../components/Lottie/DashboardAnimation";
import AnalyticsAnimation from "../components/Lottie/AnalyticsAnimation";
import Arrow from "../images/arrow.svg";

type Props = {};

function Landing({}: Props) {
  return (
    <section className="self-start w-full">
      <div className="bg-indigo-50 w-full border-none">
        <div className="lg:max-w-5xl xl:max-w-6xl bg-indigo-50 self-start mx-auto px-10 flex flex-col items-center xl:px-0">
          <nav className="w-full h-36 flex flex-row items-center">
            <ul className="w-full h-full flex flex-row justify-between items-center">
              <li className="text-indigo-700 font-semibold text-lg lg:text-2xl cursor-pointer hover:text-indigo-400 transition-all flex flex-row justify-center">
                <a>Beat</a>
                <span className="ml-2 md:ml-3 font-medium text-sm md:text-base  text-green-600 bg-green-400 bg-opacity-70 py-1 px-3 rounded-lg">
                  beta
                </span>
              </li>
              <ul className=" flex w-1/4 flex-row justify-end lg:justify-around">
                <Link to="/home">
                  <li className="text-indigo-400 border-indigo-400 font-medium  text-sm md:text-base border-2 rounded-md px-3 md:px-6 py-1 md:py-2 hover:text-indigo-600 hover:border-indigo-600 transition-all cursor-pointer">
                    Sign In
                  </li>
                </Link>

                <Link to="/signup">
                  <li className=" hidden lg:block text-indigo-50 border-indigo-900 bg-indigo-800 font-medium text-base border-2 rounded-md px-6 py-2 hover:text-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer">
                    Sign Up
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
                Don't use your head to keep track of your activities, with us
                you can set goals and complete them with{" "}
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
          <div className="bg-indigo-800 w-11/12 h-full lg:h-80 rounded-3xl my-10 py-12 px-14 flex flex-col lg:flex-row justify-around items-center ">
            <Card
              tittle="Start"
              icon={
                <PlayIcon className=" text-white w-6 h-6 xl:h-10 xl:w-10 " />
              }
              text="Start your daily tasks with our timer."
            />
            <div className="py-5 lg:py-0 lg:ml-6 w-14 lg:h-14  rotate-180 lg:rotate-90">
              <img src={Arrow} alt="Logo" />
            </div>
            <Card
              tittle="Finish"
              icon={
                <StopIcon className=" text-white w-6 h-6 xl:h-10 xl:w-10 " />
              }
              text=" When you're done, just stop the timer."
            />
            <div className="py-5 lg:py-0 lg:ml-6 w-14 lg:h-14  rotate-180 lg:rotate-90">
              <img src={Arrow} alt="Logo" />
            </div>
            <Card
              tittle="The Magic"
              icon={
                <ChartPieIcon className=" text-white w-6 h-6 xl:h-10 xl:w-10 " />
              }
              text="With only that we can do magic."
            />
          </div>
        </div>
      </div>
      <div className="bg-indigo-50 w-full border-none">
        <div className="lg:max-w-5xl xl:max-w-6xl  self-start mx-auto px-10 flex flex-col items-center xl:px-0">
          <div className="w-full xl:min-h-[34rem] flex flex-col md:flex-row items-center gap-2 my-10">
            <div className="w-full  md:w-1/2">
              <DashboardAnimation />
            </div>
            <div className="w-full md:w-1/2 md:px-16 flex flex-col gap-6">
              <h2 className="text-indigo-800 text-4xl xl:text-5xl lg:w-96 font-bold">
                Don't waste your time
              </h2>
              <p className=" text-base md:pr-16 lg:w-96 text-zinc-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit veniam aspernatur facere, consectetur velit fugiat
                quam error possimus eaque?
              </p>
            </div>
          </div>
        </div>
        <div className="lg:max-w-5xl xl:max-w-6xl self-start mx-auto px-10 flex flex-col items-center xl:px-0">
          <div className="w-full min-h-[34rem] flex flex-col md:flex-row items-center  gap-2 my-10">
            <div className=" w-full md:w-1/2 md:px-16 flex flex-col gap-6 ">
              <h2 className=" text-indigo-800 text-4xl xl:text-5xl lg:w-96 font-bold">
                Get analytics of your actions
              </h2>
              <p className=" text-base md:pr-16 lg:w-96 text-zinc-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit veniam aspernatur facere, consectetur velit fugiat
                quam error possimus eaque?
              </p>
            </div>
            <div className="w-full order-first md:order-last  md:w-1/2">
              <AnalyticsAnimation />
            </div>
          </div>
        </div>
        <div className="w-full h-64 md:h-96 flex flex-col items-center gap-12 justify-center pb-10">
          <h4 className="text-indigo-800 text-4xl xl:text-5xl  font-bold">
            What are you waiting for?
          </h4>
          <Link to="/home">
            <button className="text-indigo-50 border-indigo-900 bg-indigo-800 font-medium text-base w-48 border-2 rounded-md px-6 py-2 hover:text-indigo-100  hover:bg-indigo-700 transition-all cursor-pointer">
              Start Now
            </button>
          </Link>
        </div>
      </div>
      <footer className="bg-indigo-700 h-12 w-full flex flex-col justify-center items-center">
        <p className="text-indigo-100 ">Copyright © 2022 - Nicolás Biondini</p>
      </footer>
    </section>
  );
}

export default Landing;
