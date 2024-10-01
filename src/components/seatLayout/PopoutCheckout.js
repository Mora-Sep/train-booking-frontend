import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { UserGlobalState } from "../Layout/UserGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

<script src="https://js.stripe.com/terminal/v1/"></script>;

const stripePromise = loadStripe(
  "pk_test_51Q3h2fGgM5IeGXpnCy4JDcSIl2Bsx5KvF80XipMjKXJ3Sg6cRgvfBZQFlVV0iPQDx9X46RpRLIADSk3cMAdp1I5G008R6cV6Pb"
);

const PopoutCheckout = ({ selectedSeats, totalPrice, refID, onClose }) => {
  const { currentUserData } = UserGlobalState();
  const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

  // Function to handle payment with card
  const handlePayment = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/booking/get-checkout-session`,
        {
          params: {
            bookingRefID: refID,
          },
        }
      );

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.session.id,
      });

      if (error) {
        toast.error(
          "Failed to redirect to Stripe Checkout. Please try again.",
          { className: "custom-toast" }
        );
        console.error("Stripe Checkout error: ", error);
      }
    } catch (error) {
      toast.error("Failed to fetch checkout session. Please try again.", {
        className: "custom-toast",
      });
      console.error(
        "Error fetching checkout session:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed right-0 top-0 w-full md:w-2/5 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto border-l-4 border-blue-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-900">Checkout</h2>
        <button onClick={onClose} className="text-blue-600">
          <AiOutlineClose size={24} />
        </button>
      </div>

      {/* Selected Seats */}
      <div className="bg-blue-100 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-blue-700 mb-2 text-center">Selected Seats</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-blue-600 text-center">
            <thead>
              <tr>
                <th className="pr-4 text-center">Class</th>
                <th className="pr-4 text-center">Cart</th>
                <th className="pr-4 text-center">Seat</th>
              </tr>
            </thead>
            <tbody>
              {selectedSeats.map((seat, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 text-center">{seat.class}</td>
                  <td className="px-2 py-1 text-center">{seat.cart}</td>
                  <td className="px-2 py-1 text-center">{seat.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Price */}
      <h3 className="text-lg font-semibold text-blue-700 mb-6 text-center">
        Total Price: <span className="font-bold">LKR {totalPrice}</span>
      </h3>

      {/* Payment Button */}
      {currentUserData.username ? (
        <Elements stripe={stripePromise}>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-500 transition-colors"
            onClick={handlePayment}
          >
            Pay with Card
          </button>
        </Elements>
      ) : (
        <button
          className="w-full bg-gray-600 text-white py-2 rounded-lg shadow-md hover:bg-gray-500 transition-colors"
          onClick={() => (window.location.href = "/login")}
        >
          Login to Proceed
        </button>
      )}
    </div>
  );
};

export default PopoutCheckout;
