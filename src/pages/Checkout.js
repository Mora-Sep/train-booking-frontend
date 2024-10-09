import React, { useState, useEffect } from "react";
import { AuthFormGlobalState } from "../components/Layout/AuthFormGlobalState";

const Checkout = ({
  selectedSeats,
  totalPrice,
  allData,
  BASE_URL,
  trainID,
  originName,
  destinationName,
}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [refID, setRefID] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state

  const { setAuthForm } = AuthFormGlobalState();
  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/details`, {
          method: "POST",
          body: JSON.stringify({
            Username: "testuser",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUserDetails(data);
        setError(null); // Clear any previous error
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUserDetails();
  }, [BASE_URL]);

  // Create booking
  const handleBooking = async () => {
    try {
      const passengers = selectedSeats.map((seat) => ({
        seatNumber: seat.number,
        class: seat.class === 1 ? "F" : seat.class === 2 ? "S" : "T", // 'F' for First, 'S' for Second, 'T' for Third
        firstName: userDetails.FirstName,
        lastName: userDetails.LastName,
        isAdult: true, // Assuming all passengers are adults for simplicity
      }));

      const bookingData = {
        tripID: trainID,
        from: originName,
        to: destinationName,
        passengers: passengers,
      };

      const response = await fetch(`${BASE_URL}/booking/user/create/booking`, {
        method: "POST",
        body: JSON.stringify(bookingData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      setRefID(data.refID); // Set the reference ID for payment
      setIsBookingConfirmed(true);
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  // Proceed to payment
  const handlePayment = async () => {
    try {
      if (refID) {
        const response = await fetch(
          `${BASE_URL}/booking/get-checkout-session?bookingRefID=${refID}`
        );

        if (!response.ok) {
          throw new Error("Failed to initiate payment");
        }

        const data = await response.json();

        if (data.status === "success") {
          setAuthForm("user");
          window.location.href = data.session.url; // Redirect to Stripe checkout page
        } else {
          throw new Error("Payment session could not be created");
        }
      }
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return <p>Loading user details...</p>;
  }

  // Show error if there's an issue
  if (error) {
    return (
      <div className="text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Checkout</h2>
        <p className="text-xl text-gray-700">Train: {allData.TrainName}</p>
        <p className="text-xl text-gray-700">
          From: {originName} To: {destinationName}
        </p>

        <h3 className="text-xl font-bold text-blue-800 mt-4">
          Passenger Information
        </h3>
        <p>
          {userDetails.FirstName} {userDetails.LastName}
        </p>
        <p>{userDetails.Email}</p>
        <p>Total Price: LKR {totalPrice}</p>

        {isBookingConfirmed ? (
          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg"
          >
            Pay Now
          </button>
        ) : (
          <button
            onClick={handleBooking}
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg"
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
