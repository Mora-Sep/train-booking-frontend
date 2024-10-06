import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const baseURL = process.env.REACT_APP_BACKEND_API_URL;

  const token = Cookies.get("access-token");

  // Fetch pending bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/booking/user/pending/payments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.data) {
          toast.error("No booked tickets found", {
            className: "custom-toast",
          });
        }
        setBookings(response.data);
      } catch (error) {
        toast.error("Error fetching booking history", {
          className: "custom-toast",
        });
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [baseURL, token]);

  // Toggle row expansion
  const toggleRow = (bookingRefID) => {
    const isRowExpanded = expandedRows.includes(bookingRefID);
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((id) => id !== bookingRefID));
    } else {
      setExpandedRows([...expandedRows, bookingRefID]);
    }
  };

  // Handle refund action for a specific booking
  const handleRequestRefund = async (bookingRefID) => {};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">
        Your Booking History
      </h1>
      {bookings?.length === 0 ? (
        <p className="text-center">No tickets booked yet.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Booking Reference ID</th>
              <th className="py-2 px-4 border-b">From</th>
              <th className="py-2 px-4 border-b">To</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <React.Fragment key={booking.bookingRefID}>
                <tr
                  onClick={() => toggleRow(booking.bookingRefID)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="text-center py-2 px-4 border-b">
                    {booking.bookingRefID}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {booking.from}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {booking.to}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {booking.price}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row expansion on button click
                        handleRequestRefund(booking.bookingRefID);
                      }}
                    >
                      Request Refund
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(booking.bookingRefID) && (
                  <tr>
                    <td colSpan="4" className="py-2 px-4 border-b bg-gray-50">
                      <div>
                        <p>
                          <strong>Passengers:</strong>
                        </p>
                        <ul>
                          {booking.passengers.map((passenger, index) => (
                            <li key={index}>
                              {passenger.firstName} {passenger.lastName} - Seat:{" "}
                              {passenger.seat} (
                              {passenger.isAdult ? "Adult" : "Child"})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistory;
