import React, { useState, useEffect } from 'react';
import FirstClassSeatLayout from './FirstClassSeatLayout';
import SecondClassSeatLayout from './SecondClassSeatLayout';
import ThirdClassSeatLayout from './ThirdClassSeatLayout';
import { useNavigate } from 'react-router-dom'; // Ensure to import this for navigation

const MainLayout = ({ TrainName, departureTime, arrivalTime, originName, destinationName, allData }) => {
    const [currentClass, setCurrentClass] = useState(1);
    const [currentCart, setCurrentCart] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatData, setSeatData] = useState({});

    const navigate = useNavigate(); // Added navigation handler

    // Prices for each class
    const firstClassPrice = parseInt(allData.prices[0].price, 10);
    const secondClassPrice = parseInt(allData.prices[1].price, 10);
    const thirdClassPrice = parseInt(allData.prices[2].price, 10);

    const classPrices = { 1: firstClassPrice, 2: secondClassPrice, 3: thirdClassPrice };
    const trainID = allData.ID;
    const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

    // Fetch booked seats when component mounts
    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const response = await fetch(`${BASE_URL}/booking/get/seats?from=${originName}&to=${destinationName}&frequency=2024-09-24&id=${trainID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch booked seats');
                }
                const data = await response.json();
                processBookedSeats(data);
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        };

        fetchBookedSeats();
    }, [originName, destinationName, trainID, BASE_URL]);

    // Process the nested booked seats data and update seatData
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

        setSeatData(updatedSeatData); // Update state to trigger re-render
    };

    // Generate seat data dynamically based on the total count and number of carts
    const generateSeatData = (seatReservation) => {
        const { totalCarts, totalCount } = seatReservation;
        let seatData = [];
        let seatNumber = 1;

        for (let cartIndex = 0; cartIndex < totalCarts; cartIndex++) {
            const seatsPerCart = Math.ceil(totalCount / totalCarts); // Calculate seats per cart
            const cartSeats = [];

            for (let seatIndex = 0; seatIndex < seatsPerCart; seatIndex++) {
                cartSeats.push({
                    number: seatNumber++, // Increment seat number for each seat
                    status: 0 // 0 means available, 1 means booked
                });
            }

            seatData.push({
                cart: cartIndex + 1,
                seats: cartSeats
            });
        }

        return seatData;
    };

    // Handle seat selection
    const handleSeatSelection = (seat, cart) => {
        setSelectedSeats(prevSeats => {
            const isAlreadySelected = prevSeats.some(
                s => s.cart === cart && s.number === seat.number && s.class === currentClass
            );
            if (isAlreadySelected) {
                return prevSeats.filter(
                    s => !(s.cart === cart && s.number === seat.number && s.class === currentClass)
                );
            } else {
                return [...prevSeats, { cart, number: seat.number, class: currentClass }];
            }
        });
    };

    // Handle cart navigation
    const handleNextCart = () => setCurrentCart(prevCart => prevCart + 1);
    const handlePrevCart = () => setCurrentCart(prevCart => prevCart - 1);

    const getSeatLayout = () => {
        const data = seatData[currentClass];
        if (!data) {
            return <p>Loading seat layout...</p>;
        }

        switch (currentClass) {
            case 1:
                return (
                    <FirstClassSeatLayout
                        seats={data}
                        onSeatSelect={handleSeatSelection}
                        selectedSeats={selectedSeats.filter(s => s.class === 1)}
                        currentCart={currentCart}
                        onNextCart={handleNextCart}
                        onPrevCart={handlePrevCart}
                        cartCount={allData.seatReservations[0].totalCarts}
                    />
                );
            case 2:
                return (
                    <SecondClassSeatLayout
                        seats={data}
                        onSeatSelect={handleSeatSelection}
                        selectedSeats={selectedSeats.filter(s => s.class === 2)}
                        currentCart={currentCart}
                        onNextCart={handleNextCart}
                        onPrevCart={handlePrevCart}
                        cartCount={allData.seatReservations[1].totalCarts}
                    />
                );
            case 3:
                return (
                    <ThirdClassSeatLayout
                        seats={data}
                        onSeatSelect={handleSeatSelection}
                        selectedSeats={selectedSeats.filter(s => s.class === 3)}
                        currentCart={currentCart}
                        onNextCart={handleNextCart}
                        onPrevCart={handlePrevCart}
                        cartCount={allData.seatReservations[2].totalCarts}
                    />
                );
            default:
                return null;
        }
    };

    // Calculate total price
    const totalPrice = selectedSeats.reduce((total, seat) => total + classPrices[seat.class], 0);

    const handleProceedToCheckout = () => {
        navigate('user/checkout', {
            state: {
                selectedSeats,
                totalPrice,
                allData,
                trainID,
                originName,
                destinationName,
                BASE_URL: process.env.REACT_APP_BACKEND_API_URL
            }
        });
    };

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
            <div className="w-1/5 p-6 bg-gray-100 rounded-lg shadow-lg">
                <div className="mt-4">
                    <h2 className="text-xl text-black mb-2">Selected Seats:</h2>
                    <table className='text-blue-500'>
                        <thead>
                            <tr>
                                <th className="pr-4">Class</th>
                                <th className="pr-4">Cart</th>
                                <th className="pr-4">Seat</th>
                                <th className="pr-4">Price (LKR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSeats.map((seat, index) => (
                                <tr key={index} className='border-b-2 border-black'>
                                    <td className="pr-4">{seat.class}C</td>
                                    <td className="pr-4">{seat.cart}</td>
                                    <td className="pr-4">{seat.number}</td>
                                    <td className="pr-4">{classPrices[seat.class]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="text-xl text-black mb-2">Total Price: {totalPrice}</h2>

                <button
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleProceedToCheckout}
                    disabled={selectedSeats.length === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default MainLayout;
