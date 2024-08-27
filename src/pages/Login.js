import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthFormGlobalState } from "../components/Layout/AuthFormGlobalState";
import { UserGlobalState } from "../components/Layout/UserGlobalState";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "react-datepicker/dist/react-datepicker.css";

const Login = () => {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const { setAuthForm } = AuthFormGlobalState();
  const { bookingStep, setBookingStep } = BookingStepGlobalState();
  const { currentUserData, setCurrentUserData } = UserGlobalState();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [randomError, setRandomError] = useState(null);

  const validateUsername = () => {
    const usernameRegex =
      /^(?=.{3,30}$)([a-zA-Z0-9_]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (usernameRegex.test(username) === false) {
      setUsernameError(`
          Enter a valid username
      `);
    } else {
      setUsernameError(null);
      setRandomError(null);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9@]{4,30}$/;
    if (passwordRegex.test(password) === false) {
      setPasswordError(`
          Enter a valid password
      `);
    } else {
      setPasswordError(null);
      setRandomError(null);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmitClick(e) {
    e.preventDefault();

    if (usernameError || passwordError) {
      setRandomError("Fill all the fields correctly");
      return;
    } else if (username === "" || password === "") {
      setRandomError("Fill username and password");
      return;
    }

    const postData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${BaseURL}/users/login`, postData);

      if (response.status === 200) {
        Cookies.set("access-token", response.data.token, { expires: 1 / 24 });

        // Assuming `jwtToken` is your JWT token string
        const jwtToken = response.data.token; // Example token

        // Split the token into parts
        const parts = jwtToken.split(".");

        // Decode the payload
        const decodedPayload = atob(parts[1]);

        // Parse the decoded payload
        const payload = JSON.parse(decodedPayload);

        setCurrentUserData(payload);
        setAuthForm("user");
        setBookingStep("seatReserve");
        navigate("/user-home");
      } else {
        alert("Something went wrong");
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error.response.status) {
        alert("Invalid username or password");
        if (error.response.status === 401 || 400) {
          setRandomError("Invalid username or password");
        }
      }
    }
  }

  return (
    <div className="flex p-0 flex-col lg:flex-row h-screen mt-18">
      {/* Left Column */}
      <div
        className="relative w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/Main/Login.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-8xl lg:text-8xl font-bold text-white text-center">
            Welcome Back
          </h1>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6 lg:p-12">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">
            Login to Your Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmitClick}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email/Username
              </label>
              <input
                value={username}
                onBlur={validateUsername}
                onChange={handleUsernameChange}
                type="text"
                id="email"
                placeholder="Enter your username/email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {usernameError && <div className="">{usernameError}</div>}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                value={password}
                onBlur={validatePassword}
                onChange={handlePasswordChange}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {passwordError && <div className="">{passwordError}</div>}
            </div>
            {randomError && <div className="">{randomError}</div>}
            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold text-lg"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <Link className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
