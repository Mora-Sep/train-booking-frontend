import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const PendingPayments = () => {
  const [payments, setPayments] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const baseURL = process.env.REACT_APP_BACKEND_API_URL;

  const token = Cookies.get("access-token");

  // Fetch pending payments from API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/booking/user/pending/payments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length === 0) {
          toast.error("No pending payments found", {
            className: "custom-toast",
          });
        }
        setPayments(response.data);
      } catch (error) {
        toast.error("Error fetching pending payments", {
          className: "custom-toast",
        });
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
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

  // Handle payment action for a specific payment
  const handlePay = async (bookingRefID) => {
    try {
      // Call your API or payment logic here
      await axios.post(
        `${baseURL}/booking/user/pay`,
        { bookingRefID }, // Send the booking reference ID to the payment endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Payment successful for booking: ${bookingRefID}`);

      // Optionally refresh the payment list to remove the paid item
      setPayments(
        payments.filter((payment) => payment.bookingRefID !== bookingRefID)
      );
    } catch (error) {
      toast.error("Error processing payment", { className: "custom-toast" });
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">
        Pending Payments
      </h1>
      {payments.length === 0 ? (
        <p className="text-center">No pending payments found</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Booking Reference ID</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Trip ID</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <React.Fragment key={payment.bookingRefID}>
                <tr
                  onClick={() => toggleRow(payment.bookingRefID)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="text-center py-2 px-4 border-b">
                    {payment.bookingRefID}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {payment.price}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {payment.tripID}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row expansion on button click
                        handlePay(payment.bookingRefID);
                      }}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(payment.bookingRefID) && (
                  <tr>
                    <td colSpan="4" className="py-2 px-4 border-b bg-gray-50">
                      <div>
                        <p>
                          <strong>Passengers:</strong>
                        </p>
                        <ul>
                          {payment.passengers.map((passenger, index) => (
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

export default PendingPayments;
