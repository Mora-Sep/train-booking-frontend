import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function AddTrain() {
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const [train, setTrain] = useState({ number: "", model: "", name: "" });

  const handleChange = (e) => {
    setTrain({ ...train, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/deo/create/train`, train, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Train added successfully");
      setTrain({ number: "", model: "", name: "" });
    } catch (error) {
      console.error("Failed to add train:", error);
      alert("Failed to add train");
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-black mb-4">Add Train</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Train Number
          </label>
          <input
            type="number"
            name="number"
            value={train.number}
            onChange={handleChange}
            className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Model</label>
          <input
            type="number"
            name="model"
            value={train.model}
            onChange={handleChange}
            className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={train.name}
            onChange={handleChange}
            className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
        >
          Add Train
        </button>
      </form>
    </div>
  );
}

export default AddTrain;
