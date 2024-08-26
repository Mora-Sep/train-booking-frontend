import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function ActDctTrip() {
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchTrips() {
      await axios
        .get(`${baseUrl}/admin/scheduled-trips`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTrips(res.data);
        });
    }
    fetchTrips();
  }, [token, baseUrl]);

  const toggleActiveStatus = async (id, isActive) => {
    try {
      const url = isActive
        ? `${baseUrl}/admin/deactivate-trip?tripId=${id}`
        : `${baseUrl}/admin/activate-trip?tripId=${id}`;

      await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state after the API call succeeds
      setTrips((prevData) =>
        prevData.map((train) =>
          train.ID === id ? { ...train, isactive: isActive ? 0 : 1 } : train
        )
      );
    } catch (error) {
      console.error("Failed to update train status:", error);
    }
  };

  return (
    <div className="min-w-full mx-auto p-4 text-slate-800">
      <h2 className="text-2xl font-bold mb-6">Train Schedule Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Train Number</th>
              <th className="py-3 px-6 text-left">Train Name</th>
              <th className="py-3 px-6 text-left">Origin</th>
              <th className="py-3 px-6 text-left">Destination</th>
              <th className="py-3 px-6 text-left">Departure</th>
              <th className="py-3 px-6 text-left">Arrival</th>
              <th className="py-3 px-6 text-left">Duration (min)</th>
              <th className="py-3 px-6 text-left">Frequency</th>
              <th className="py-3 px-6 text-left">Active</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.ID} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{trip.trainNumber}</td>
                <td className="py-3 px-6">{trip.trainName}</td>
                <td className="py-3 px-6">
                  {trip.originName} ({trip.originCode})
                </td>
                <td className="py-3 px-6">
                  {trip.destinationName} ({trip.destinationCode})
                </td>
                <td className="py-3 px-6">{trip.departureDateAndTime}</td>
                <td className="py-3 px-6">{trip.arrivalDateAndTime}</td>
                <td className="py-3 px-6">{trip.durationMinutes}</td>
                <td className="py-3 px-6">{trip.frequency}</td>
                <td className="py-3 px-6">{trip.isactive ? "Yes" : "No"}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => toggleActiveStatus(trip.ID, trip.isactive)}
                    className={`px-4 py-2 rounded-md ${
                      trip.isactive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {trip.isactive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActDctTrip;
