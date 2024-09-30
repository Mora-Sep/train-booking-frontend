import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { UserGlobalState } from "../Layout/UserGlobalState"; // Import the global state
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai"; // Importing close icon

<script src="https://js.stripe.com/terminal/v1/"></script>;

const stripePromise = loadStripe(
  "pk_test_51Q3h2fGgM5IeGXpnCy4JDcSIl2Bsx5KvF80XipMjKXJ3Sg6cRgvfBZQFlVV0iPQDx9X46RpRLIADSk3cMAdp1I5G008R6cV6Pb"
);

const PopoutCheckout = ({ selectedSeats, totalPrice, refID, onClose }) => {
  const { currentUserData } = UserGlobalState(); // Access the global user state
  const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

  // Function to handle payment with card
  const handlePayment = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/booking/get-checkout-session`,
        {
          params: {
            bookingRefID: refID, // Use the refID passed as a prop
          },
        }
      );

      // Redirect to Stripe Checkout
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

      //   if (response.data.status === "success") {
      //     const checkoutUrl = response.data.session.url; // Extract the checkout session URL
      //     window.open(checkoutUrl, "_blank"); // Open the URL in a new tab
      //   } else {
      //     console.error("Failed to get checkout session:", response.data);
      //   }
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
    <div className="fixed right-0 top-0 w-2/5 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto border-l-4 border-blue-500">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Checkout</h2>
      <button onClick={onClose} className="text-red-500 mb-4">
        Close
      </button>
      <h3 className="text-lg font-semibold text-blue-700 mb-2">
        Selected Seats
      </h3>
      <table className="w-full text-blue-600 mb-4">
        <thead>
          <tr>
            <th className="pr-4 text-left">Class</th>
            <th className="pr-4 text-left">Cart</th>
            <th className="pr-4 text-left">Seat</th>
          </tr>
        </thead>
        <tbody>
          {selectedSeats.map((seat, index) => (
            <tr key={index}>
              <td>{seat.class}</td>
              <td>{seat.cart}</td>
              <td>{seat.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-lg font-semibold text-blue-700">
        Total Price: LKR {totalPrice}
      </h3>

      {/* Conditionally render buttons based on login status */}
      {currentUserData.username ? (
        // Show "Pay with Card" if the user is logged in
        <Elements stripe={stripePromise}>
          <button
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition-colors"
            onClick={handlePayment} // Call the handlePayment function on click
          >
            Pay with Card
          </button>
        </Elements>
      ) : (
        // Show "Login" button if the user is not logged in
        <button
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-500 transition-colors"
          onClick={() => (window.location.href = "/login")}
        >
          Login to Proceed
        </button>
      )}
    </div>
  );
};

export default PopoutCheckout;
