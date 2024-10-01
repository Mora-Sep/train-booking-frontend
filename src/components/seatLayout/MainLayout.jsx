import React, { useState, useEffect } from 'react';
import FirstClassSeatLayout from './FirstClassSeatLayout';
import axios from 'axios';
import SecondClassSeatLayout from './SecondClassSeatLayout';
import ThirdClassSeatLayout from './ThirdClassSeatLayout';
import PopoutCheckout from './PopoutCheckout';
import { UserGlobalState } from '../Layout/UserGlobalState'; // Import the global state
import Cookies from 'js-cookie';

const MainLayout = ({ TrainName, departureTime, arrivalTime, originName, destinationName, allData }) => {
    const [currentClass, setCurrentClass] = useState(1);
    const [currentCart, setCurrentCart] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatData, setSeatData] = useState({});
    const [showCheckout, setShowCheckout] = useState(false); // State for controlling PopoutCheckout visibility
    const { currentUserData } = UserGlobalState(); // Access global state

    // Prices for each class
    const classPrices = {
        1: parseInt(allData.prices[0].price, 10),
        2: parseInt(allData.prices[1].price, 10),
        3: parseInt(allData.prices[2].price, 10)
    };

    const trainID = allData.ID;
    const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

    // Fetch booked seats when component mounts or relevant data changes
    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const response = await fetch(`${BASE_URL}/booking/get/seats?from=${originName}&to=${destinationName}&frequency=2024-09-24&id=${trainID}`, {
                    credentials: 'include' // Include credentials to send cookies
                });
                if (!response.ok) throw new Error('Failed to fetch booked seats');
                const data = await response.json();
                processBookedSeats(data);
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        };

        fetchBookedSeats();
    }, [originName, destinationName, trainID, BASE_URL]);

    const processBookedSeats = (data) => {
        const updatedSeatData = {
            1: generateSeatData(allData.seatReservations[0]),
            2: generateSeatData(allData.seatReservations[1]),
            3: generateSeatData(allData.seatReservations[2]),
        };

        data.forEach((classData, classIndex) => {
            classData.forEach((cartData, cartIndex) => {
                cartData.forEach(seatNumber => {
                    const cart = updatedSeatData[classIndex + 1][cartIndex];
                    const seat = cart.seats.find(seat => seat.number === seatNumber);
                    if (seat) {
                        seat.status = 1; // Mark as booked
                    }
                });
            });
        });

        setSeatData(updatedSeatData);
    };

    const generateSeatData = (seatReservation) => {
        const { totalCarts, totalCount } = seatReservation;
        let seatData = [];
        let seatNumber = 1;

        for (let cartIndex = 0; cartIndex < totalCarts; cartIndex++) {
            const seatsPerCart = Math.ceil(totalCount / totalCarts);
            const cartSeats = [];

            for (let seatIndex = 0; seatIndex < seatsPerCart; seatIndex++) {
                cartSeats.push({
                    number: seatNumber++,
                    status: 0 // Initialize all seats as available
                });
            }

            seatData.push({
                cart: cartIndex + 1,
                seats: cartSeats
            });
        }

        return seatData;
    };

    const handleSeatSelection = (seat, cart) => {
        setSelectedSeats(prevSeats => {
            const isAlreadySelected = prevSeats.some(
                s => s.cart === cart && s.number === seat.number && s.class === currentClass
            );
            if (isAlreadySelected) {
                return prevSeats.filter(s => !(s.cart === cart && s.number === seat.number && s.class === currentClass));
            } else {
                return [...prevSeats, { cart, number: seat.number, class: currentClass }];
            }
        });
    };

    const handleNextCart = () => setCurrentCart(prevCart => prevCart + 1);
    const handlePrevCart = () => setCurrentCart(prevCart => prevCart - 1);

    const getSeatLayout = () => {
        const data = seatData[currentClass];
        if (!data) {
            return <p>Loading seat layout...</p>;
        }

        const seatLayouts = {
            1: FirstClassSeatLayout,
            2: SecondClassSeatLayout,
            3: ThirdClassSeatLayout
        };

        const SelectedLayout = seatLayouts[currentClass];
        return (
            <SelectedLayout
                seats={data}
                onSeatSelect={handleSeatSelection}
                selectedSeats={selectedSeats.filter(s => s.class === currentClass)}
                currentCart={currentCart}
                onNextCart={handleNextCart}
                onPrevCart={handlePrevCart}
                cartCount={allData.seatReservations[currentClass - 1].totalCarts}
            />
        );
    };

    const totalPrice = selectedSeats.reduce((total, seat) => total + classPrices[seat.class], 0);

    const handleOpenCheckout = async () => {
        console.log('Proceeding to checkout...');

        const token = Cookies.get("access-token"); // Get the token from cookies
        console.log('Token:', token); // Log the token

        const passengers = selectedSeats.map(seat => ({
            seatNumber: seat.number.toString(),
            class: seat.class === 1 ? 'F' : seat.class === 2 ? 'S' : 'T',
            firstName: currentUserData.firstName,
            lastName: currentUserData.lastName,
            isAdult: true, // For simplicity, assuming all are adults
        }));

        const bookingData = {
            tripID: allData.ID,
            from: allData.originCode,
            to: allData.destinationCode,
            passengers
        };

        console.log('Booking Data:', bookingData); // Log booking data

        try {
            const response = await axios.post(`${BASE_URL}/booking/user/create/booking`, bookingData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
                withCredentials: true // Include credentials to send cookies
            });

            console.log('Booking success:', response.data);
            const refID = response.data.refID; // Assuming the response contains refID
            setShowCheckout(true);
            setCheckoutRefID(refID); // Save refID to state to pass to PopoutCheckout
        } catch (error) {
            console.error('Error creating booking:', error.response?.data || error.message);
        }
    };

    // Define a state to hold the refID
    const [checkoutRefID, setCheckoutRefID] = useState(null);




    return (
        <div className="flex">
            <div className="flex flex-col w-4/5 p-6 bg-white rounded-lg shadow-lg">
                <div className='pb-3'>
                    <div className='flex flex-row justify-center items-center'>
                        <h2 className="text-4xl font-bold text-blue-900 mb-3">{TrainName}</h2>
                        <img src="/icons/image.png" alt="train" className="w-32 h-auto ml-4 -mt-6" />
                    </div>
                    <div className="flex flex-row justify-between mb-4">
                        <p className="text-2xl font-semibold text-blue-700">{originName}</p>
                        <p className="text-2xl font-semibold text-blue-700">{destinationName}</p>
                    </div>
                    <div className="flex flex-row justify-between pb-4">
                        <p className="text-lg text-gray-700">Departure Time: {departureTime}</p>
                        <p className="text-lg text-gray-700">Arrival Time: {arrivalTime}</p>
                    </div>
                </div>

                <div className="flex flex-row items-center text-black font-semibold mb-4">
                    {['1st Class', '2nd Class', '3rd Class'].map((label, idx) => (
                        <button
                            key={idx}
                            className={`w-full mb-2 px-4 py-2 rounded ${currentClass === idx + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
                            onClick={() => {
                                setCurrentClass(idx + 1);
                                setCurrentCart(1);
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                {getSeatLayout()}
            </div>

            {showCheckout && (
                <PopoutCheckout
                    selectedSeats={selectedSeats}
                    totalPrice={totalPrice}
                    refID={checkoutRefID} // Pass refID here
                    onClose={() => setShowCheckout(false)}
                />
            )}

            <div className="w-1/5 p-6">
                <h3 className="text-2xl font-semibold mb-4">Selected Seats</h3>
                <ul>
                    {selectedSeats.map((seat, index) => (
                        <li key={index} className="flex justify-between mb-2">
                            <span>Class {seat.class}: Cart: {seat.cart}: Seat {seat.number}</span>
                            <span>Rs.{classPrices[seat.class]}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>Rs.{totalPrice}</span>
                </div>
                <button
                    className={`w-full mt-4 px-4 py-2 rounded ${selectedSeats.length > 0 ? 'bg-blue-700 text-white' : 'bg-gray-400'}`}
                    onClick={handleOpenCheckout}
                    disabled={selectedSeats.length === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default MainLayout;
