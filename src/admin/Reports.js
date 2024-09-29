import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Reports() {
  const [timeBasedData, setTimeBasedData] = useState(null);
  const [currentStats, setCurrentStats] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  useEffect(() => {
    const fetchCurrentStats = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/reports/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentStats(response.data);
      } catch (error) {
        console.error("Error fetching current stats:", error);
      }
    };

    fetchCurrentStats();
  }, [baseUrl, token]);

  const fetchTimeBasedData = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/admin/reports/total?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeBasedData(response.data);
    } catch (error) {
      console.error("Error fetching time-based data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 text-black">
      <h1 className="text-3xl font-bold mb-6">Admin Reports</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Stats</h2>
        {currentStats ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-lg">
              <span className="font-semibold">Active Trips:</span>{" "}
              {currentStats.activeTrips}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Current Users:</span>{" "}
              {currentStats.currentUsers}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Current Guests:</span>{" "}
              {currentStats.currentGuests}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Total Adults:</span>{" "}
              {currentStats.totalAdults}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Total Children:</span>{" "}
              {currentStats.totalChildren}
            </div>
          </div>
        ) : (
          <div>Loading current stats...</div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Time-Based Report</h2>

        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          onClick={fetchTimeBasedData}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          {loading ? "Loading..." : "Fetch Report"}
        </button>

        {timeBasedData ? (
          <div className="mt-4">
            <div className="text-lg mb-2">
              <span className="font-semibold">Total Revenue:</span> $
              {timeBasedData.totalRevenue}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Total Bookings:</span>{" "}
              {timeBasedData.totalBookings}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            {loading ? "" : "Please select dates to fetch the report."}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
