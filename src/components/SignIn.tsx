import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { simpleValidator } from "../helpers/validators";
import useAuth from "../hooks/useAuth";

import image from "../images/image1.svg";

import axios from "../api/axios";
const SIGNIN_URL: string = "/signin";

type Props = {};
type signInUserData = {
  email: string;
  password: string;
};
type handleSubmitErrors = {
  email: boolean;
  password: boolean;
};

function SignIn({}: Props) {
  const { auth, toogleSetAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = "/home";

  let initialData: signInUserData = { email: "", password: "" };
  let initialErrors: handleSubmitErrors = { email: false, password: false };

  const [userData, setUserData] = useState(initialData);
  const [submitError, setSubmitError] = useState(initialErrors);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate fields and handle errors
    let tempError = submitError;
    tempError.email = false;
    tempError.password = false;
    setSubmitError(tempError);

    const { email, password } = userData;
    const { status, message, error } = simpleValidator(email, password);

    if (status) {
      // If the data is validate
      // Send the POST request to the backend
      try {
        const response = await axios.post(
          SIGNIN_URL,
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // Recive the message and token
          const { token, person_uid } = response.data;

          // Redirect to dashboard page
          toogleSetAuth({ itsAuth: true, accessToken: token, person_uid });
          navigate(from, { replace: true });
        }
      } catch (err: any) {
        if (!err?.response) {
          toast.error("No Server Response. Try latter.");

          setSubmitError({ email: false, password: false });
        } else if (err.response?.status === 400) {
          toast.error(err.response?.data);

          if (
            err.response?.data ===
            "Invalid password. Enter the correct password!"
          ) {
            tempError.password = true;
            setSubmitError(tempError);
          } else if (
            err.response?.data === "User is not registered, Sing Up first."
          ) {
            tempError.email = true;
            setSubmitError(tempError);
          }
        } else {
          toast.error("Sign In failed");
        }
      }
    } else {
      toast.error(message);
      if (error === "email") {
        tempError.email = true;
      }
      if (error === "password") {
        tempError.password = true;
      }
      setSubmitError(tempError);
      // TO DO change colors of tailwind css of form
      // if submitError it's true change CSS.
    }
  };
  useEffect(() => {
    console.log("Error");
  }, [submitError]);

  const handleChange = (e: any) => {
    let tempData = userData;
    if (e.target.id === "email") {
      tempData.email = e.target.value;
      setUserData(tempData);
    } else if (e.target.id === "password") {
      tempData.password = e.target.value;
      setUserData(tempData);
    }
  };

  return auth.itsAuth ? (
    <Navigate to={"/home"} state={{ from: location }} replace />
  ) : (
    <div className="w-screen m-0 flex flex-row flex-auto items-center  h-screen bg-gradient-to-r from-indigo-800 to-indigo-600">
      <Toaster position="top-right" reverseOrder={false} />
      <section className="container m-auto h-5/6 flex flex-row align-middle justify-between  ">
        <div className="p-10 mr-5 ml-5 w-full rounded-2xl lg:w-1/2 h-100 m-0 bg-white flex justify-center align-middle gap-10 lg:rounded-br-none lg:rounded-tr-none lg:m-0">
          <div className="h-100 flex flex-col justify-center gap-10 lg:w-96 ">
            <h1 className=" font-bold text-4xl -mb-8">Sign In</h1>
            <p className="text-lg text-slate-700">
              Sign In into your account to start!
            </p>
            <form
              className="h-1/3 flex flex-col gap-8 "
              onSubmit={(e) => handleSubmit(e)}
            >
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
                <label htmlFor="password">
                  Password
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
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
                value="Sign In"
              />
            </form>
            <div className="flex flex-row mt-10 gap-1">
              <p>Not resgitered yet?</p>
              <Link
                to="/signup"
                className="text-indigo-700 cursor-pointer hover:text-indigo-600 transition-all"
              >
                Create an account.
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

export default SignIn;
