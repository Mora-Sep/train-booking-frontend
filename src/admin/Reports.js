import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Reports() {
  const [timeBasedData, setTimeBasedData] = useState(null);
  const [currentStats, setCurrentStats] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const trainData = [
    { name: "Podi Menike", Number: 1005, Model: 9, revenue: 2500, trips: 15 },
    { name: "Udarata Menike", Number: 1015, Model: 9, revenue: 3000, trips: 12 },
    { name: "Badulla night express", Number: 1045, Model: 2, revenue: 1500, trips: 8 },
    { name: "Uttara Devi", Number: 4017, Model: 8, revenue: 4000, trips: 20 },
    { name: "Yal Devi", Number: 4077, Model: 1, revenue: 2000, trips: 10 },
    { name: "Rajarata Rejini", Number: 4085, Model: 6, revenue: 3500, trips: 15 },
    { name: "Udaya Devi", Number: 6011, Model: 8, revenue: 2700, trips: 18 },
    { name: "Meena Gaya", Number: 6079, Model: 7, revenue: 2200, trips: 14 },
    { name: "Galu Kumari", Number: 8056, Model: 8, revenue: 2800, trips: 16 },
    { name: "Ruhunu Kumari", Number: 8058, Model: 8, revenue: 2600, trips: 17 },
    { name: "Sagarika", Number: 8096, Model: 7, revenue: 2400, trips: 13 },
    { name: "Samudra Devi", Number: 8760, Model: 8, revenue: 3200, trips: 19 },
  ];

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

  const generatePDF = async () => {
    const pdf = new jsPDF();
    pdf.text("Admin Reports", 20, 20);

    // Add current stats to PDF
    pdf.text("Current Stats", 20, 30);
    if (currentStats) {
      pdf.text(`Active Trips: ${currentStats.activeTrips}`, 20, 40);
      pdf.text(`Current Users: ${currentStats.currentUsers}`, 20, 50);
      pdf.text(`Current Guests: ${currentStats.currentGuests}`, 20, 60);
      pdf.text(`Total Adults: ${currentStats.totalAdults}`, 20, 70);
      pdf.text(`Total Children: ${currentStats.totalChildren}`, 20, 80);
    }

    // Add revenue data to PDF
    pdf.text("Revenue Data", 20, 90);
    trainData.forEach((train, index) => {
      pdf.text(`Train: ${train.name}, Revenue: $${train.revenue}`, 20, 100 + index * 10);
    });

    // Add trips data to PDF
    pdf.text("Trips Data", 20, 100 + trainData.length * 10 + 10);
    trainData.forEach((train, index) => {
      pdf.text(`Train: ${train.name}, Trips: ${train.trips}`, 20, 110 + trainData.length * 10 + index * 10);
    });

    pdf.save("admin_report.pdf");
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

      {/* Revenue Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Revenue Visualization</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={trainData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trips Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Trips Visualization</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={trainData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="trips" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PDF Generation Button */}
      <button
        onClick={generatePDF}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Generate PDF Report
      </button>
    </div>
  );
}

export default Reports;
