import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function UpdateDelay() {
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const [delayDetails, setDelayDetails] = useState({
    scheduledID: "",
    delay: "",
  });

  const handleChange = (e) => {
    setDelayDetails({ ...delayDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { scheduledID, delay } = delayDetails;
    try {
      await axios.patch(
        `${baseUrl}/deo/update-delay?scheduledID=${scheduledID}&delay=${delay}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Delay updated successfully");
      setDelayDetails({ scheduledID: "", delay: "" });
    } catch (error) {
      console.error("Failed to update delay:", error);
      alert("Failed to update delay");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-100 shadow-md rounded-lg">
      <h2 className="text-2xl text-black font-bold mb-4">Update Train Delay</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Scheduled ID
          </label>
          <input
            type="number"
            name="scheduledID"
            value={delayDetails.scheduledID}
            onChange={handleChange}
            className="w-full text-slate-800 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Delay (Minutes)
          </label>
          <input
            type="number"
            name="delay"
            value={delayDetails.delay}
            onChange={handleChange}
            className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
        >
          Update Delay
        </button>
      </form>
    </div>
  );
}

export default UpdateDelay;
