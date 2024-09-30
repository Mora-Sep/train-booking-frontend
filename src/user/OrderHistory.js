import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const [tickets, setTickets] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const baseURL = process.env.REACT_APP_BACKEND_API_URL;

  const token = Cookies.get("access-token");

  // Fetch tickets data from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/booking/user/search/tickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length === 0) {
          toast.error("No tickets found", { className: "custom-toast" });
        }
        setTickets(response.data);
      } catch (error) {
        toast.error("No tickets found", { className: "custom-toast" });
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [baseURL, token]);

  // Toggle row expansion
  const toggleRow = (ticketNumber) => {
    const isRowExpanded = expandedRows.includes(ticketNumber);
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((num) => num !== ticketNumber));
    } else {
      setExpandedRows([...expandedRows, ticketNumber]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">
        Order History
      </h1>
      {tickets.length === 0 ? (
        <p className="text-center">No tickets found</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Ticket Number</th>
              <th className="py-2 px-4 border-b">Booking Ref ID</th>
              <th className="py-2 px-4 border-b">Origin</th>
              <th className="py-2 px-4 border-b">Destination</th>
              <th className="py-2 px-4 border-b">Departure Time</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <React.Fragment key={ticket.ticketNumber}>
                <tr
                  onClick={() => toggleRow(ticket.ticketNumber)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="text-center py-2 px-4 border-b">
                    {ticket.ticketNumber}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {ticket.bookingRefID}
                  </td>

                  <td className="py-2 text-center px-4 border-b">
                    {ticket.origin}
                  </td>
                  <td className="py-2 text-center px-4 border-b">
                    {ticket.destination}
                  </td>
                  <td className="py-2 text-center px-4 border-b">
                    {ticket.departureTime}
                  </td>
                  <td className="py-2 text-center px-4 border-b">
                    {ticket.status}
                  </td>
                </tr>
                {expandedRows.includes(ticket.ticketNumber) && (
                  <tr>
                    <td colSpan="6" className="py-2 px-4 border-b bg-gray-50">
                      <div>
                        <p>
                          <strong>Booking Reference ID:</strong>{" "}
                          {ticket.bookingRefID}
                        </p>
                        <p>
                          <strong>Class:</strong> {ticket.class}
                        </p>
                        <p>
                          <strong>Booked User:</strong> {ticket.bookedUser}
                        </p>
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

export default OrderHistory;
