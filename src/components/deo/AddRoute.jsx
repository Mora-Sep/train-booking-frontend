import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function AddRoute() {
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const [route, setRoute] = useState({
    origin: "",
    destination: "",
    duration: "",
    basePrice: { T: "", S: "", F: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in route.basePrice) {
      setRoute({ ...route, basePrice: { ...route.basePrice, [name]: value } });
    } else {
      setRoute({ ...route, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/deo/create/route`, route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Route added successfully");
      setRoute({
        origin: "",
        destination: "",
        duration: "",
        basePrice: { T: "", S: "", F: "" },
      });
    } catch (error) {
      console.error("Failed to add route:", error);
      alert("Failed to add route");
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-black font-bold mb-4">Add Route</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Origin</label>
          <input
            type="text"
            name="origin"
            value={route.origin}
            onChange={handleChange}
            className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={route.destination}
            onChange={handleChange}
            className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Duration (Minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={route.duration}
            onChange={handleChange}
            className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Base Price (Third Class)
          </label>
          <input
            type="number"
            name="T"
            value={route.basePrice.T}
            onChange={handleChange}
            className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Base Price (Second Class)
          </label>
          <input
            type="number"
            name="S"
            value={route.basePrice.S}
            onChange={handleChange}
            className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Base Price (Frst Class)
          </label>
          <input
            type="number"
            name="F"
            value={route.basePrice.F}
            onChange={handleChange}
            className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
        >
          Add Route
        </button>
      </form>
    </div>
  );
}

export default AddRoute;
