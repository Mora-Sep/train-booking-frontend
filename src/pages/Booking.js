import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainSeatLayout from "../components/seatLayout/MainLayout";
import TrainResult from "../components/TrainResult"; // Import TrainResult component

const Booking = () => {
  const [stations, setStations] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showResults, setShowResults] = useState(false);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);

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
          date: selectedDate.toISOString().split("T")[0],
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching the trips!", error);
      });

    if (tripData && tripData.length > 0) {
      setFilteredTrains(tripData);
      setShowResults(true);
    } else {
      setFilteredTrains([]);
      setShowResults(true); // Set true to display the message even if no results
    }
  };

  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
  };

  const handleBackToSearch = () => {
    setSelectedTrain(null);
    setShowResults(true);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Section: Search Form */}
      <div className="w-1/5 flex flex-col justify-center items-center p-8 bg-white shadow-lg">
        <h1 className="text-5xl font-bold text-blue-800 mb-20">
          Search for Trains
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
              className="w-full bg-indigo-500 text-lg text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Right Section: Seat Layout, Search Results, or Initial Image */}
      <div className="w-4/5 p-8 overflow-y-auto">
        {selectedTrain ? (
          <div>
            <button
              onClick={handleBackToSearch}
              className="mb-4 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Back to Search
            </button>
            <MainSeatLayout
              TrainName={selectedTrain.trainName}
              departureTime={selectedTrain.departureDateAndTime}
              arrivalTime={selectedTrain.arrivalDateAndTime}
              originName={selectedTrain.originName}
              destinationName={selectedTrain.destinationName}
              date={selectedDate.toISOString().split("T")[0]}
              allData={selectedTrain}
              onBack={handleBackToSearch}
            />
          </div>
        ) : showResults ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Search Results
            </h2>
            <div className="space-y-4">
              {filteredTrains.length > 0 ? (
                filteredTrains.map((train) => (
                  <TrainResult
                    key={train.ID}
                    train={train}
                    onTrainSelect={handleTrainSelect}
                  />
                ))
              ) : (
                <p className="text-gray-700">
                  No trains available for the selected route.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <img
              src="/Landing Page/booking.jpg"
              alt="Booking Placeholder"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
