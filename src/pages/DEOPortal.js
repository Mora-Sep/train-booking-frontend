import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserGlobalState } from "../components/Layout/UserGlobalState";
import { AuthFormGlobalState } from "../components/Layout/AuthFormGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function DEOPortal() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const navigate = useNavigate();
  const { setAuthForm } = AuthFormGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [randomError, setRandomError] = useState(null);

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_@]{3,30}$/;
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
      const response = await axios.post(`${BaseURL}/deo/auth`, postData);

      if (response.status === 200) {
        toast.success("Login successful", { className: "custom-toast" });
        Cookies.set("access-token", response.data.token, { expires: 1 / 24 });
        setAuthForm("deo");
        // Assuming `jwtToken` is your JWT token string
        const jwtToken = response.data.token; // Example token

        // Split the token into parts
        const parts = jwtToken.split(".");

        // Decode the payload
        const decodedPayload = atob(parts[1]);

        // Parse the decoded payload
        const payload = JSON.parse(decodedPayload);
        setCurrentUserData(payload);
        //setAdmin profile Details
        navigate("/deo");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error.status === 401) {
        toast.error("Invalid username or password", {
          className: "custom-toast",
        });
      }
    }
  }

  return (
    <div className="flex bg-gradient-to-tl from-white via-blue-200 to-white justify-center items-center h-screen">
      <form
        onSubmit={handleSubmitClick}
        className="w-full rounded-lg text-black max-w-sm bg-white p-8 shadow-lg "
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Data Entry Operator Login
        </h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-black font-bold mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={validateUsername}
          />
          {usernameError && (
            <p className="text-red-500 text-sm mt-1">{usernameError}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-black font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default DEOPortal;
