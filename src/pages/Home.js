import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { UserGlobalState } from "../components/Layout/UserGlobalState";

const Home = () => {
  const { currentUserData } = UserGlobalState();

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/Image.jpeg)" }}
    >
      <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="items-center -mt-52  text-blue-200 text-9xl font-bold">
            ON TRAIN
          </h1>
        </div>

        <div className="flex items-center justify-center text-green-400  -mt-20 mb-64 text-5xl font-semibold">
          <Typewriter
            words={["Book", "Pay", "Go"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>

        {/* <img
          src="/Main/logo-white.png"
          alt="Logo"
          className=" -mt-32 w-36 h-auto mb-4"
        /> */}

        <div className="flex flex-col items-center  absolute bottom-0">
          <div className="flex flex-row bg-indigo-900  font-semibold shadow-lg shadow-black p-10 rounded-2xl space-x-4 mb-24">
            {!currentUserData?.username && (
              <>
                <Link to="/login">
                  <button className="px-4 py-3 shadow-lg shadow-black rounded-xl  bg-blue-600 text-xl text-white  hover:bg-blue-700">
                    Sign In
                  </button>
                </Link>
                <Link to="/sign">
                  <button className="px-4 py-3 shadow-lg shadow-black rounded-xl  bg-green-600 text-xl text-white  hover:bg-green-700">
                    Register
                  </button>
                </Link>
              </>
            )}
            <Link to="/user-home">
              <button className="px-4 py-3 shadow-lg shadow-black rounded-xl  bg-gray-600 text-xl text-white  hover:bg-gray-700">
                Search for a Train
              </button>
            </Link>
          </div>

          {!currentUserData?.username && (
            <div className="text-white text-lg  pb-4">
              Sign in as{" "}
              <Link to="/deo-portal" className="underline text-lg">
                DEO
              </Link>{" "}
              or{" "}
              <Link to="/admin-portal" className="underline text-lg">
                Admin
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
