import React from 'react';
import { UserGlobalState } from '../Layout/UserGlobalState'; // Import the global state
import axios from 'axios';
import Cookies from 'js-cookie';
import { AiOutlineClose } from 'react-icons/ai'; // Importing close icon

const PopoutCheckout = ({ selectedSeats, totalPrice, refID, onClose }) => {
    const { currentUserData } = UserGlobalState(); // Access the global user state
    const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

    // Function to handle payment with card
    const handlePayment = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/booking/get-checkout-session`, {
                params: {
                    bookingRefID: refID // Use the refID passed as a prop
                }
            });

            if (response.data.status === "success") {
                const checkoutUrl = response.data.session.url; // Extract the checkout session URL
                window.open(checkoutUrl, '_blank'); // Open the URL in a new tab
            } else {
                console.error('Failed to get checkout session:', response.data);
            }
        } catch (error) {
            console.error('Error fetching checkout session:', error.response?.data || error.message);
        }
    };

    return (
        <div className="fixed right-0 top-0 w-2/5 h-full bg-white shadow-lg z-50 border-l-4 border-blue-500 overflow-y-auto">
            <div className="p-6  text-black">
                {/* Close button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-center font-bold">Checkout</h2>
                    <button onClick={onClose} className="text-black hover:text-red-500">
                        <AiOutlineClose size={32} />
                    </button>
                </div>



                {/* Seats table */}
                <div className="bg-white p-4 text-blue-900 rounded-md shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-4">Selected Seats</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b-2 border-blue-500">
                                <th className="py-2">Class</th>
                                <th className="py-2">Cart</th>
                                <th className="py-2">Seat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSeats.map((seat, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2">{seat.class}</td>
                                    <td className="py-2">{seat.cart}</td>
                                    <td className="py-2">{seat.number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total price */}
                <div className="bg-white p-4 text-blue-900 rounded-md shadow-md mb-6">
                    <h3 className="text-lg font-semibold">Total Price: LKR {totalPrice}</h3>
                </div>

                {/* Payment button */}
                {currentUserData.username ? (
                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-500 transition-colors"
                        onClick={handlePayment}
                    >
                        Pay with Card
                    </button>
                ) : (
                    <button
                        className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 transition-colors"
                        onClick={() => window.location.href = '/login'}
                    >
                        Login to Proceed
                    </button>
                )}
            </div>
        </div>
    );
};

export default PopoutCheckout;
