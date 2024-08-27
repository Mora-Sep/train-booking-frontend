import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TrainTable from "./../components/deo/TrainTable";
import RouteTable from "../components/deo/RouteTable";

function ScheduleTrip() {
  function convertTo24HourFormat(time) {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const [tripDetails, setTripDetails] = useState({
    routeID: "",
    trainCode: "",
    departureTime: "",
    frequency: "",
  });

  const [routes, setRoutes] = useState([]);
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch routes
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get/routes`);
        setRoutes(response.data);
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      }
    };

    // Fetch trains
    const fetchTrains = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get/trains`);
        setTrains(response.data);
      } catch (error) {
        console.error("Failed to fetch trains:", error);
      }
    };

    fetchRoutes();
    fetchTrains();
  }, [baseUrl]);

  const handleChange = (e) => {
    setTripDetails({ ...tripDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/deo/schedule-trip`, tripDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Trip scheduled successfully");
      setTripDetails({
        routeID: "",
        trainCode: "",
        departureTime: "",
        frequency: "",
      });
    } catch (error) {
      console.error("Failed to schedule trip:", error);
      alert("Failed to schedule trip");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mb-10 p-6 bg-slate-100 shadow-md rounded-lg">
        <TrainTable trains={trains} />
        <RouteTable routes={routes} />
      </div>
      <div className="max-w-lg mx-auto p-6 bg-slate-100 shadow-md rounded-lg">
        <h2 className="text-2xl text-black font-bold mb-4">Schedule a Trip</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="routeID"
              className="block text-gray-700 font-medium mb-2"
            >
              Route ID
            </label>
            <input
              type="number"
              id="routeID"
              name="routeID"
              value={tripDetails.routeID}
              onChange={handleChange}
              className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="trainCode"
              className="block text-gray-700 font-medium mb-2"
            >
              Train Code
            </label>
            <input
              type="number"
              id="trainCode"
              name="trainCode"
              value={tripDetails.trainCode}
              onChange={handleChange}
              className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="departureTime"
              className="block text-gray-700 font-medium mb-2"
            >
              Departure Time
            </label>
            <input
              type="time"
              id="departureTime"
              name="departureTime"
              value={convertTo24HourFormat(tripDetails.departureTime)}
              onChange={handleChange}
              className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="frequency"
              className="block text-gray-700 font-medium mb-2"
            >
              Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={tripDetails.frequency}
              onChange={handleChange}
              className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
              required
            >
              <option value="">Select Frequency</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
          >
            Schedule Trip
          </button>
        </form>
      </div>
    </>
  );
}

export default ScheduleTrip;
