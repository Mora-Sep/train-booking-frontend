import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function AddDEO() {
  const [deoData, setDEOData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDEOData({ ...deoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("access-token");
    const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

    try {
      await axios.post(
        `${baseUrl}/deo/register`,
        {
          firstName: deoData.firstName,
          lastName: deoData.lastName,
          username: deoData.username,
          password: deoData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attaching the token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("DEO registered successfully!", {
        className: "custom-toast",
      });
    } catch (err) {
      // Handle the error (Error case)
      console.error(err);
      setError("Failed to register DEO. Please try again.");
      toast.error("Failed to register DEO. Please try again.", {
        className: "custom-toast",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register DEO</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={deoData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={deoData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={deoData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={deoData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDEO;
