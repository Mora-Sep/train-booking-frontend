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

  const [isScheduled, setIsScheduled] = useState(false);
  const [stationDetails, setStationDetails] = useState({
    tripID: "",
    code: "",
    sequence: "",
  });

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

  const handleChangeTrip = (e) => {
    setTripDetails({ ...tripDetails, [e.target.name]: e.target.value });
  };

  const handleChangeStation = (e) => {
    setStationDetails({ ...stationDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitTrip = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/deo/schedule-trip`,
        tripDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Trip scheduled successfully");
      setTripDetails({
        routeID: "",
        trainCode: "",
        departureTime: "",
        frequency: "",
      });
      setStationDetails({ ...stationDetails, tripID: response.data.tripID });
      setIsScheduled(true);
    } catch (error) {
      console.error("Failed to schedule trip:", error);
      alert("Failed to schedule trip");
    }
  };

  const handleSubmitStation = async (e) => {
    e.preventDefault();
    try {
      console.log("Station details:", stationDetails);
      await axios.post(`${baseUrl}/deo/add-station`, stationDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Station added successfully");
      setStationDetails({
        code: "",
        sequence: "",
      });
    } catch (error) {
      console.log("Failed to add the station:", error);
      alert(`Failed to add the station : ${error}`);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mb-10 p-6 bg-slate-100 shadow-md rounded-lg">
        <TrainTable trains={trains} />
        <RouteTable routes={routes} />
      </div>
      <div className="flex flex-row mb-2">
        <div className="w-auto mx-auto p-6 bg-slate-100 shadow-md rounded-lg">
          <h2 className="text-2xl mx-20 text-black font-bold mb-4">
            Schedule a Trip
          </h2>
          <form onSubmit={handleSubmitTrip}>
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
                onChange={handleChangeTrip}
                className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
                disabled={isScheduled}
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
                onChange={handleChangeTrip}
                className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
                disabled={isScheduled}
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
                onChange={handleChangeTrip}
                className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
                disabled={isScheduled}
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
                onChange={handleChangeTrip}
                className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
                disabled={isScheduled}
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
              className={
                !isScheduled
                  ? "w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                  : "w-full p-2 bg-gray-500 text-white font-medium rounded-md"
              }
              disabled={isScheduled}
            >
              Schedule Trip
            </button>
            {isScheduled && (
              <p className="text-red-500 text-center mt-2">
                Already scheduled a trip, add stations...
              </p>
            )}
          </form>
        </div>
        <div className="max-w-lg mx-auto p-6 bg-slate-100 shadow-md rounded-lg">
          <h2 className="text-2xl text-black font-bold mb-8 mt-4">
            Add stations for the scheduled trip
          </h2>
          <form onSubmit={handleSubmitStation}>
            <div className="mb-6">
              <label
                htmlFor="tripID"
                className="block text-gray-700 font-medium mb-4"
              >
                Scheduled Trip ID : {stationDetails.tripID}
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-gray-700 font-medium mb-4"
              >
                Station Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={stationDetails.code}
                onChange={handleChangeStation}
                className="w-full p-2 text-slate-800 border border-gray-300 rounded-md"
                disabled={!isScheduled}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="departureTime"
                className="block text-gray-700 font-medium mb-4"
              >
                Sequence Number
              </label>
              <input
                type="number"
                id="sequence"
                name="sequence"
                value={stationDetails.sequence}
                onChange={handleChangeStation}
                className="w-full p-2 text-slate-800 border border-gray-300 rounded-md mb-4"
                disabled={!isScheduled}
                required
              />
            </div>
            <button
              type="submit"
              className={
                isScheduled
                  ? "w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                  : "w-full p-2 bg-gray-500 text-white font-medium rounded-md"
              }
              disabled={!isScheduled}
            >
              Add Station
            </button>
            {!isScheduled && (
              <p className="text-red-500 text-center mt-2">
                Schedule a trip to add stations
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default ScheduleTrip;
