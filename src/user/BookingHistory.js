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
          `${baseURL}/booking/user/payment-history`,
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

  const handleRequestRefund = async (bookingRefID) => {
    try {
      const response = await axios.post(
        `${baseURL}/booking/cancel?bookingRefID=${bookingRefID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        toast.success("Booking canceled successfully", {
          className: "custom-toast",
        });
        setBookings(
          bookings.filter((booking) => booking.bookingRefID !== bookingRefID)
        );
      }
    } catch (error) {
      toast.error("Error canceling booking", {
        className: "custom-toast",
      });
      console.error("Error canceling booking", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Your Booking History
      </h1>
      {bookings?.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No tickets booked yet.
        </p>
      ) : (
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-5 text-left">Booking Reference ID</th>
                <th className="py-3 px-5 text-left">From</th>
                <th className="py-3 px-5 text-left">To</th>
                <th className="py-3 px-5 text-left">Date</th>
                <th className="py-3 px-5 text-left">Time</th>
                <th className="py-3 px-5 text-left">Price</th>
                <th className="py-3 px-5 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <React.Fragment key={booking.bookingRefID}>
                  <tr
                    onClick={() => toggleRow(booking.bookingRefID)}
                    className="cursor-pointer hover:bg-blue-100 border-t border-gray-200"
                  >
                    <td className="py-4 px-5">{booking.bookingRefID}</td>
                    <td className="py-4 px-5">{booking.from}</td>
                    <td className="py-4 px-5">{booking.to}</td>
                    <td className="py-4 px-5">{booking.date}</td>
                    <td className="py-4 px-5">{booking.time}</td>
                    <td className="py-4 px-5 text-green-600 font-semibold">
                      Rs.{booking.price}
                    </td>
                    <td className="py-4 px-5">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row expansion on button click
                          handleRequestRefund(booking.bookingRefID);
                        }}
                      >
                        Cancel Booking
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(booking.bookingRefID) && (
                    <tr className="bg-gray-100">
                      <td colSpan="5" className="py-4 px-5 border-t">
                        <div className="text-gray-700">
                          <p className="font-semibold">Passengers:</p>
                          <ul className="mt-2">
                            {booking.passengers.map((passenger, index) => (
                              <li key={index} className="py-1">
                                <span className="text-sm">
                                  Seat: {passenger.seat}, Class: {passenger.class} (
                                  {passenger.isAdult ? "Adult" : "Child"})
                                </span>
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
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
