import React, { useState } from "react";
import { UserGlobalState } from "../components/Layout/UserGlobalState";
import { AuthFormGlobalState } from "../components/Layout/AuthFormGlobalState";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Sign = () => {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const { setCurrentUserData } = UserGlobalState();
  const { bookingStep, setBookingStep } = BookingStepGlobalState();
  const [randomError, setRandomError] = useState(null);

  const { setAuthForm } = AuthFormGlobalState();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(null);
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("default");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      username: username,
      password: password,
      firstName,
      lastName,
      nic,
      address: address,
      birthday: birthdate,
      gender: gender,
      email: email,
      contactNumber: contact,
    };

    try {
      const response = await axios.post(`${BaseURL}/users/register`, postData);
      console.log(response);
      toast.success("User registered successfully", {
        className: "custom-toast",
      });
      if (response.status === 201) {
        const postDataToken = {
          username: username,
          password: password,
        };
        try {
          const responseToken = await axios.post(
            `${BaseURL}/users/login`,
            postDataToken
          );

          if (responseToken.status === 200) {
            Cookies.set("access-token", responseToken.data.token, {
              expires: 1,
            });
            localStorage.setItem("access-token", responseToken.data.token);
            // Assuming `jwtToken` is your JWT token string
            const jwtToken = responseToken.data.token; // Example token

            // Split the token into parts
            const parts = jwtToken.split(".");

            // Decode the payload
            const decodedPayload = atob(parts[1]);

            // Parse the decoded payload
            const payload = JSON.parse(decodedPayload);
            setCurrentUserData(payload);
            setAuthForm("user");
            setBookingStep("seatReserve");
            navigate("/");
          } else {
            throw new Error("Something went wrong");
          }
        } catch (error) {
          if (error.status) {
            if (error.status === 401) {
              toast.error("Invalid username or password", {
                className: "custom-toast",
              });
              setRandomError("Invalid username or password");
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed, try again later!", {
        className: "custom-toast",
      });
    }
  };

  const isFormValid = () => {
    return (
      username !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      nic !== "" &&
      address !== "" &&
      birthdate !== "" &&
      gender !== "" &&
      email !== "" &&
      contact !== "" &&
      confirmPassword !== "" &&
      usernameError === null &&
      passwordError === null &&
      firstNameError === null &&
      lastNameError === null
    );
  };

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_@]{3,30}$/;
    if (usernameRegex.test(username) === false) {
      setUsernameError(`
          Username must be at least 3 characters long
          and can only contain letters, numbers, _ and @
      `);
    } else {
      setUsernameError(null);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9@]{4,30}$/;
    if (passwordRegex.test(password) === false) {
      setPasswordError(`
          Password must be at least 4 characters long
          and can only contain letters, numbers and @
      `);
    } else if (password !== confirmPassword) {
      setPasswordError(`
          Passwords do not match
      `);
    } else {
      setPasswordError(null);
    }
  };

  const validateFirstName = () => {
    const firstNameRegex = /^[A-Za-z]{1,30}$/;
    if (firstNameRegex.test(firstName) === false) {
      setFirstNameError(`
          First Name cannot be empty and can only contain letters
      `);
    } else {
      setFirstNameError(null);
    }
  };

  const validateLastName = () => {
    const lastNameRegex = /^[A-Za-z]{1,30}$/;
    if (lastNameRegex.test(lastName) === false) {
      setLastNameError(`
          Last Name cannot be empty and can only contain letters
      `);
    } else {
      setLastNameError(null);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className="flex p-0 flex-col lg:flex-row">
      {/* Left Column */}
      <div
        className="relative w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/Main/Sign.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-8xl lg:text-8xl font-bold text-white text-center">
            Welcome
          </h1>
        </div>
      </div>

      {/* Right Column */}

      <div className="relative lg:w-1/2   w-full bg-blue-500 p-8 shadow-md">
        <div className="bg-white rounded-md p-2 m-2">
          <h2 className="text-3xl text-black font-bold mb-8 text-center">
            Create Your Account
          </h2>
          <form
            className="space-y-4 text-black m-2 p-2"
            onSubmit={handleSubmit}
          >
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-black"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                onBlur={validateFirstName}
                placeholder="Enter your first name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
              {firstNameError && (
                <div className="errorText">{firstNameError}</div>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-black"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                onBlur={validateLastName}
                placeholder="Enter your last name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
              {lastNameError && (
                <div className="errorText">{lastNameError}</div>
              )}
            </div>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                onBlur={validateUsername}
                placeholder="Enter your username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
              {usernameError && (
                <div className="errorText">{usernameError}</div>
              )}
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={validatePassword}
                placeholder="Enter your username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
              {passwordError && (
                <div className="errorText">{passwordError}</div>
              )}
            </div>
            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-black"
              >
                Confirm assword
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validatePassword}
                placeholder="Enter your username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-black"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter your phone number (e.g., 777123456)"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* NIC Number */}
            <div>
              <label
                htmlFor="nicNumber"
                className="block text-sm font-medium text-black"
              >
                NIC Number
              </label>
              <input
                type="text"
                id="nicNumber"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                placeholder="Enter your NIC number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-black"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {/* Birthday*/}
            <div>
              <label
                htmlFor="birthday"
                className="block text-sm font-medium text-black"
              >
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-black"
              >
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                rows="3"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {randomError && <div className="errorText">{randomError}</div>}
            <button
              type="submit"
              className="btn btn-primary text-white font-semibold text-lg w-full mx-auto block"
              disabled={!isFormValid()}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign;
