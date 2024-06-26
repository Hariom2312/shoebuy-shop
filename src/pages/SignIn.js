import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import SocialMedia from "../components/SocialMedia";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const { logIn } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);

      toast.success('Login Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: "Bounce",
      });

      navigate("/home");
    } catch (error) {
      console.log(error);
      if (
        error.message === "Firebase: Error (auth/user-not-found)." ||
        error.message === "Firebase: Error (auth/invalid-credential)."
      ) {
        setError("User Doesn't Exist...Create Your Account");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("Password Wrong...Please Check Your Password");
      } 
      // alert("Just wait..");
    }
  };
  return (
    <>
      <div className="w-full h-screen mx-auto bg-slate-600 flex justify-center items-center min-h-[100vh] in">
        <div className="fixed w-full px-4 py-24 z-50 ">
          <div className="max-w-[450px] h-[520px] mx-auto bg-black/80 text-white rounded-md">
            <div className="max-w-[320px] mx-auto py-16 px-3 md:px-0">
              <div className="logo-login text-center ">
                <img
                  src="https://res.cloudinary.com/daxmjqsy2/image/upload/v1679395171/logo_q8a29a.png"
                  alt="logo"
                  className="w-[90px] h-[50px] mx-auto rounded-xl"
                />
              </div>
              <h1 className="text-3xl font-bold text-center">Sign In</h1>
              {error ? (
                <small className="text-red-500 font-semibold">
                  {error}{" "}
                  <Link className="text-white" to="/signup">
                    {" "}
                    Sign Up
                  </Link>{" "}
                </small>
              ) : null}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="password-input relative">
                  <input
                    className="p-3 my-2 w-full bg-gray-700 rounded"
                    type={isEyeOpen ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="cursor-pointer absolute bottom-5 right-3"
                    onClick={() => setIsEyeOpen(!isEyeOpen)}
                  >
                    {isEyeOpen ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gray-600 py-3 my-6 rounded font-semibold hover:bg-slate-600 transition-all duration-300"
                >
                  Sign In
                </button>
                <div className=" flex justify-between items-center font-medium mb-3 text-gray-500">
                  <p className="mr-2">
                    {" "}
                    <input type="checkbox" /> Remember me ?
                  </p>
                  <p>Need Help ?</p>
                </div>
                <p>
                  <span className="text-gray-400">Create Your Account ?</span>
                  <Link to="/signup"> Sign Up</Link>{" "}
                </p>
              </form>
              <div className="flex flex-row flex-wrap text-center -mt-4 pb-3">
                <p className="hidden sm:block mt-5 mr-5 opacity-55 text-center">
                  Connect Me
                </p>
                <p className="hidden custom:block mx-auto sm:mx-0 ">
                  <SocialMedia />
                </p>
              </div>
              <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
style={{transition: "Bounce"}}
/>
<ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
