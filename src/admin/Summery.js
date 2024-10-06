import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function Summery() {
    const [currentStats, setCurrentStats] = useState(null);
    const [trainData, setTrainData] = useState([]);
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

        const fetchTrainData = async () => {
            // Example static train data, replace with an API call if needed
            const data = [
                { name: "Podi Menike", revenue: 2500, trips: 15 },
                { name: "Udarata Menike", revenue: 3000, trips: 12 },
                { name: "Badulla night express", revenue: 1500, trips: 8 },
                { name: "Uttara Devi", revenue: 4000, trips: 20 },
                { name: "Yal Devi", revenue: 2000, trips: 10 },
                { name: "Rajarata Rejini", revenue: 3500, trips: 15 },
                { name: "Udaya Devi", revenue: 2700, trips: 18 },
                { name: "Meena Gaya", revenue: 2200, trips: 14 },
                { name: "Galu Kumari", revenue: 2800, trips: 16 },
                { name: "Ruhunu Kumari", revenue: 2600, trips: 17 },
                { name: "Sagarika", revenue: 2400, trips: 13 },
                { name: "Samudra Devi", revenue: 3200, trips: 19 },
            ];
            setTrainData(data);
        };

        fetchCurrentStats();
        fetchTrainData();
    }, [baseUrl, token]);

    return (
        <div className="p-8 space-y-8 text-black">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Stats */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Current Stats</h2>
                    {currentStats ? (
                        <div className="space-y-2">
                            <div>Active Trips: {currentStats.activeTrips}</div>
                            <div>Current Users: {currentStats.currentUsers}</div>
                            <div>Current Guests: {currentStats.currentGuests}</div>
                            <div>Total Adults: {currentStats.totalAdults}</div>
                            <div>Total Children: {currentStats.totalChildren}</div>
                        </div>
                    ) : (
                        <div>Loading current stats...</div>
                    )}
                </div>

                {/* Revenue Visualization */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Revenue Visualization</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={trainData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Trips Visualization */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Trips Visualization</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={trainData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="trips" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Additional Metrics 1 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
                    <div className="text-2xl font-bold">
                        ${trainData.reduce((acc, curr) => acc + curr.revenue, 0)}
                    </div>
                </div>

                {/* Additional Metrics 2 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Trips</h2>
                    <div className="text-2xl font-bold">
                        {trainData.reduce((acc, curr) => acc + curr.trips, 0)}
                    </div>
                </div>

                {/* Additional Metrics 3 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Current Train Count</h2>
                    <div className="text-2xl font-bold">{trainData.length}</div>
                </div>
            </div>
        </div>
    );
}

export default Summery;
