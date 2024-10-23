import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TrainTable from "./../components/deo/TrainTable";
import RouteTable from "../components/deo/RouteTable";
import { toast } from "react-hot-toast";

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
    date: "",
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
      toast.success("Trip scheduled successfully", {
        className: "custom-toast",
      });
      setTripDetails({
        routeID: "",
        trainCode: "",
        departureTime: "",
        date: "",
      });
      setStationDetails({ ...stationDetails, tripID: response.data.tripID });
      setIsScheduled(true);
    } catch (error) {
      console.error("Failed to schedule trip:", error);
      toast.error("Failed to schedule trip. Please try again.", {
        className: "custom-toast",
      });
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
      toast.success("Station added successfully", {
        className: "custom-toast",
      });
      setStationDetails({
        ...stationDetails,
        code: "",
        sequence: "",
      });
    } catch (error) {
      console.log("Failed to add the station:", error);
      toast.error(`Failed to add the station : ${error}`, {
        className: "custom-toast",
      });
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mb-10 p-6 bg-slate-100 shadow-md rounded-lg">
        {/* Forms for scheduling trip and adding stations in a row */}
        <div className="flex flex-row justify-between mb-8">
          <div className="w-1/2  mx-2 mb-6">
            <div className="p-6 bg-slate-100 shadow-md rounded-lg">
              <h2 className="text-2xl text-black font-bold mb-4">
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
                    htmlFor="date"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={tripDetails.date}
                    onChange={handleChangeTrip}
                    className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
                    disabled={isScheduled}
                    required
                  />
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
          </div>

          <div className="w-1/2  mx-2 mb-6">
            <div className="p-6 bg-slate-100 shadow-md rounded-lg">
              <h2 className="text-2xl text-black font-bold mb-4">
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
                    htmlFor="sequence"
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
        </div>

        {/* Tables to display trains and routes */}
        <div className="flex flex-col mb-8">
          <h2 className="text-2xl text-black font-bold mb-4">Train Table</h2>
          <TrainTable trains={trains} />
          <h2 className="text-2xl text-black font-bold mb-4 mt-6">
            Route Table
          </h2>
          <RouteTable routes={routes} />
        </div>
      </div>
    </>
  );
}

export default ScheduleTrip;
