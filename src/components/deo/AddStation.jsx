import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function AddStation() {
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const [station, setStation] = useState({ code: "", name: "", district: "" });

  const handleChange = (e) => {
    setStation({ ...station, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/deo/create/railway-station`, station, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Station added successfully");
      setStation({ code: "", name: "", district: "" });
    } catch (error) {
      console.error("Failed to add station:", error);
      alert("Failed to add station");
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-black font-bold mb-4">Add Station</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Station Code
          </label>
          <input
            type="text"
            name="code"
            value={station.code}
            onChange={handleChange}
            className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Station Name
          </label>
          <input
            type="text"
            name="name"
            value={station.name}
            onChange={handleChange}
            className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            District
          </label>
          <input
            type="text"
            name="district"
            value={station.district}
            onChange={handleChange}
            className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
        >
          Add Station
        </button>
      </form>
    </div>
  );
}

export default AddStation;
