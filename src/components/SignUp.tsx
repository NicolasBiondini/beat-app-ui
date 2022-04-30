import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { fullValidator } from "../helpers/validators";
import useAuth from "../hooks/useAuth";

import image from "../images/image1.svg";

import axios from "../api/axios";
const SIGNUP_URL: string = "/signup";

type Props = {};
type signUpUserData = {
  user_name: string;
  email: string;
  password: string;
  repeat_password: string;
};
type handleSubmitErrors = {
  user_name: boolean;
  email: boolean;
  password: boolean;
};

function SignUp({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = "/home";

  let initialData: signUpUserData = {
    user_name: "",
    email: "",
    password: "",
    repeat_password: "",
  };

  let initialErrors: handleSubmitErrors = {
    user_name: false,
    email: false,
    password: false,
  };

  const [userData, setUserData] = useState(initialData);
  const [submitError, setSubmitError] = useState(initialErrors);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let tempError = submitError;
    tempError.user_name = false;
    tempError.email = false;
    tempError.password = false;
    setSubmitError(tempError);

    const { user_name, email, password, repeat_password } = userData;

    const { status, message, error } = fullValidator(
      user_name,
      email,
      password,
      repeat_password
    );

    if (status) {
      setSubmitError(tempError);
      // TO DO make the POST pettition to the API.

      try {
        const response = await axios.post(
          SIGNUP_URL,
          JSON.stringify({ user_name, email, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // Recive the message and token

          // Redirect to home page but has to signin before
          navigate(from, { replace: true });
        }
      } catch (err: any) {
        if (!err?.response) {
          toast.error("No Server Response. Try latter.");

          setSubmitError({ user_name: false, email: false, password: false });
        } else if (err.response?.status === 400) {
          toast.error(err.response?.data);
        } else {
          toast.error("Sign Up failed");
        }
      }
    } else {
      toast.error(message);
      if (error === "user_name") {
        tempError.user_name = true;
      }
      if (error === "email") {
        tempError.email = true;
      }
      if (error === "password") {
        tempError.password = true;
      }
      setSubmitError(initialErrors);
      // TO DO change colors of tailwind css of form
      // if submitError it's true change CSS.
    }
  };

  const handleChange = (e: any) => {
    let tempData = userData;
    if (e.target.id === "user_name") {
      tempData.user_name = e.target.value;
    } else if (e.target.id === "email") {
      tempData.email = e.target.value;
      setUserData(tempData);
    } else if (e.target.id === "password1") {
      tempData.password = e.target.value;
      setUserData(tempData);
    } else if (e.target.id === "password2") {
      tempData.repeat_password = e.target.value;
      setUserData(tempData);
    }
  };

  useEffect(() => {
    console.log("error");
  }, [submitError]);

  return (
    <div className="w-screen m-0 flex flex-row flex-auto items-center  min-h-screen bg-gradient-to-r from-indigo-800 to-indigo-600">
      <Toaster position="top-right" reverseOrder={false} />
      <section className="container m-auto h-5/6 flex flex-row align-middle justify-between  ">
        <div className="p-10 mr-5 ml-5 w-full rounded-2xl lg:w-1/2 h-100 m-0 bg-white flex justify-center align-middle gap-10 lg:rounded-br-none lg:rounded-tr-none lg:m-0">
          <div className="h-100 flex flex-col justify-center gap-1 lg:w-96 ">
            <h1 className=" font-bold text-4xl">Sign Up</h1>
            <p className="text-lg text-slate-700 mb-4">
              Create a new account to start!
            </p>
            <form
              className="h-2/3 flex flex-col gap-8 "
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="relative">
                <label htmlFor="user_name">
                  Username
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  id="user_name"
                  type="text"
                  name="user_name"
                  onChange={(e) => handleChange(e)}
                  className={`${
                    submitError.email && "ring-red-500 ring-2"
                  } rounded-3xl border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent lg:py-3 lg:px-5`}
                  required
                  autoComplete="off"
                  placeholder="JohnDoe"
                />
                {submitError.email && (
                  <p className="absolute text-sm text-red-500 -bottom-6">
                    Username is invalid
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="email">
                  Email
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  className={`${
                    submitError.email && "ring-red-500 ring-2"
                  } rounded-3xl border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent lg:py-3 lg:px-5`}
                  required
                  autoComplete="off"
                  placeholder="example@email.com"
                />
                {submitError.email && (
                  <p className="absolute text-sm text-red-500 -bottom-6">
                    Email is invalid
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="password1">
                  Password
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  id="password1"
                  type="password"
                  name="password1"
                  minLength={8}
                  onChange={(e) => handleChange(e)}
                  className={`${
                    submitError.password && "ring-red-500 ring-2"
                  } rounded-3xl border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent lg:py-3 lg:px-5`}
                  required
                  autoComplete="off"
                  placeholder="Min. 8 character"
                />
                {submitError.password && (
                  <p className="absolute text-sm text-red-500 -bottom-6">
                    Password is invalid
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="password2">
                  Confirm Password
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  id="password2"
                  type="password"
                  name="password2"
                  minLength={8}
                  onChange={(e) => handleChange(e)}
                  className={`${
                    submitError.password && "ring-red-500 ring-2"
                  } rounded-3xl border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent lg:py-3 lg:px-5`}
                  required
                  autoComplete="off"
                  placeholder="Min. 8 character"
                />
                {submitError.password && (
                  <p className="absolute text-sm text-red-500 -bottom-6">
                    Password is invalid
                  </p>
                )}
              </div>
              <input
                type="submit"
                className="bg-indigo-700 text-white py-2 px-4 rounded-3xl cursor-pointer hover:bg-indigo-600 transition-all lg:py-3 lg:px-5"
                value="Sign Up"
              />
            </form>
            <div className="flex flex-row mt-10 gap-1">
              <p>You are registered?</p>
              <Link
                to="/signin"
                className="text-indigo-700 cursor-pointer hover:text-indigo-600 transition-all"
              >
                Sign In.
              </Link>
            </div>
          </div>
        </div>
        <div className=" hidden w-1/2 rounded-br-2xl rounded-tr-2xl bg-indigo-800 lg:flex justify-center align-middle">
          <div className="w-3/4 h-3/4 self-center flex justify-center">
            <img src={image} alt="Sign In image" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
