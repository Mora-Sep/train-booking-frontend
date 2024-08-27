import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function AddModel() {
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const [model, setModel] = useState({
    modelName: "",
    seatsCount: { T: "", S: "", F: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in model.seatsCount) {
      setModel({
        ...model,
        seatsCount: { ...model.seatsCount, [name]: value },
      });
    } else {
      setModel({ ...model, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/deo/create/model`, model, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Model added successfully");
      setModel({ modelName: "", seatsCount: { T: "", S: "", F: "" } });
    } catch (error) {
      console.error("Failed to add model:", error);
      alert("Failed to add model");
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-black font-bold mb-4">Add Model</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Model Name
          </label>
          <input
            type="text"
            name="modelName"
            value={model.modelName}
            onChange={handleChange}
            className="w-full text-slate-800 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Seats Count (Third Class)
          </label>
          <input
            type="number"
            name="T"
            value={model.seatsCount.T}
            onChange={handleChange}
            className="w-full text-slate-800 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Seats Count (Second Class)
          </label>
          <input
            type="number"
            name="S"
            value={model.seatsCount.S}
            onChange={handleChange}
            className="w-full text-slate-800 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Seats Count (First Class)
          </label>
          <input
            type="number"
            name="F"
            value={model.seatsCount.F}
            onChange={handleChange}
            className="w-full text-slate-800 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
        >
          Add Model
        </button>
      </form>
    </div>
  );
}

export default AddModel;
