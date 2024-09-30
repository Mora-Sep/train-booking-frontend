import React, { useState, useEffect } from 'react';

const Checkout = ({ selectedSeats, totalPrice, allData, BASE_URL, trainID, originName, destinationName }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [refID, setRefID] = useState(null);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

    // Fetch user details when component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await fetch(`${BASE_URL}/users/details`, {
                method: 'POST',
                body: JSON.stringify({
                    Username: "testuser"
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setUserDetails(data);
        };

        fetchUserDetails();
    }, [BASE_URL]);

    // Create booking
    const handleBooking = async () => {
        const passengers = selectedSeats.map(seat => ({
            seatNumber: seat.number,
            class: seat.class === 1 ? 'F' : seat.class === 2 ? 'S' : 'T', // 'F' for First, 'S' for Second, 'T' for Third
            firstName: userDetails.FirstName,
            lastName: userDetails.LastName,
            isAdult: true // Assuming all passengers are adults for simplicity
        }));

        const bookingData = {
            tripID: trainID,
            from: originName,
            to: destinationName,
            passengers: passengers
        };

        const response = await fetch(`${BASE_URL}/booking/user/create/booking`, {
            method: 'POST',
            body: JSON.stringify(bookingData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        setRefID(data.refID); // Set the reference ID for payment
        setIsBookingConfirmed(true);
    };

    // Proceed to payment
    const handlePayment = async () => {
        if (refID) {
            const response = await fetch(`${BASE_URL}/booking/get-checkout-session?bookingRefID=${refID}`);
            const data = await response.json();

            if (data.status === 'success') {
                window.location.href = data.session.url; // Redirect to Stripe checkout page
            }
        }
    };

    if (!userDetails) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
                <h2 className="text-3xl font-bold text-blue-800 mb-4">Checkout</h2>
                <p className="text-xl text-gray-700">Train: {allData.TrainName}</p>
                <p className="text-xl text-gray-700">From: {originName} To: {destinationName}</p>

                <h3 className="text-xl font-bold text-blue-800 mt-4">Passenger Information</h3>
                <p>{userDetails.FirstName} {userDetails.LastName}</p>
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
