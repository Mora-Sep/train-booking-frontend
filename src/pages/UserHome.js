import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserHome = () => {
  const [stations, setStations] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showResults, setShowResults] = useState(false);
  const [filteredTrains, setFilteredTrains] = useState([]);

  const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get/stations`);
        setStations(response.data);
      } catch (error) {
        console.error("There was an error fetching the stations!", error);
      }
    };

    fetchStations();
  }, [BASE_URL]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const tripData = await axios
      .get(`${BASE_URL}/booking/search`, {
        params: {
          from: fromStation,
          to: toStation,
          frequency: selectedDate.toISOString().split("T")[0],
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("There was an error fetching the trips!", error);
      });

    if (tripData.length > 0) {
      setFilteredTrains(tripData);
      setShowResults(true);
    }

    // const filtered = tripData.filter(
    //   (train) => train.from === fromStation && train.to === toStation
    // );

    // setFilteredTrains(filtered);
    // setShowResults(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section: Search Form */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white shadow-lg ${
          showResults ? "md:w-full" : ""
        }`}
      >
        <h1 className="text-5xl font-bold text-blue-800 mb-20">
          Make your booking experience easy!
        </h1>

        <form className="w-full" onSubmit={handleSearch}>
          <div className="flex flex-col space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                From:
              </label>
              <select
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Station</option>
                {stations.map((station) => (
                  <option key={station.Code} value={station.Name}>
                    {station.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                To:
              </label>
              <select
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Station</option>
                {stations
                  .filter((station) => station.Name !== fromStation)
                  .map((station) => (
                    <option key={station.Code} value={station.Name}>
                      {station.Name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
            >
              Search for Trains
            </button>
          </div>
        </form>
      </div>

      {/* Right Section: Image or Search Results */}
      {!showResults ? (
        <div className="w-full md:w-1/2">
          <img
            src="/Main/Sign.png"
            alt="Train"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full md:w-full p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Search Results
          </h2>
          <div className="space-y-4">
            {filteredTrains.length > 0 ? (
              filteredTrains.map((train) => (
                <div
                  key={train.ID}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {train.originName} → {train.destinationName}
                  </h3>
                  <p className="text-gray-700">Train Name: {train.trainName}</p>
                  <p className="text-gray-700">
                    Departure Time: {train.departureDateAndTime}
                  </p>
                  <p className="text-gray-700">
                    Arrival Time: {train.arrivalDateAndTime}
                  </p>
                  <p className="text-gray-700">
                    First Class Seats:{" "}
                    {train.seatReservations[0].totalCount -
                      train.seatReservations[0].reservedCount}
                  </p>
                  <p className="text-gray-700">
                    Second Class Seats:{" "}
                    {train.seatReservations[1].totalCount -
                      train.seatReservations[1].reservedCount}
                  </p>
                  <p className="text-gray-700">
                    Third Class Seats:{" "}
                    {train.seatReservations[2].totalCount -
                      train.seatReservations[2].reservedCount}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">
                No trains available for the selected route.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
