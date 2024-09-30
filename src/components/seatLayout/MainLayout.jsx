import React, { useState, useEffect } from 'react';
import FirstClassSeatLayout from './FirstClassSeatLayout';
import SecondClassSeatLayout from './SecondClassSeatLayout';
import ThirdClassSeatLayout from './ThirdClassSeatLayout';

const MainLayout = ({ TrainName, departureTime, arrivalTime, originName, destinationName, allData }) => {
    const [currentClass, setCurrentClass] = useState(1);
    const [currentCart, setCurrentCart] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Prices for each class
    const classPrices = { 1: 150, 2: 100, 3: 50 };

    const trainID = allData.ID;

    // Extract seat count and cart count from `allData`
    const totalFirstClassSeatsCount = allData.seatReservations[0].totalCount;
    const totalSecondClassSeatsCount = allData.seatReservations[1].totalCount;
    const totalThirdClassSeatsCount = allData.seatReservations[2].totalCount;

    const totalFirstClassCartCount = allData.seatReservations[0].totalCarts;
    const totalSecondClassCartCount = allData.seatReservations[1].totalCarts;
    const totalThirdClassCartCount = allData.seatReservations[2].totalCarts;

    // Calculate number of seats per cart
    const fClassCartSeats = Math.ceil(totalFirstClassSeatsCount / totalFirstClassCartCount);
    const sClassCartSeats = Math.ceil(totalSecondClassSeatsCount / totalSecondClassCartCount);
    const tClassCartSeats = Math.ceil(totalThirdClassSeatsCount / totalThirdClassCartCount);

    // Generate seat data dynamically
    const generateSeatData = (totalCarts, seatsPerCart) => {
        return Array.from({ length: totalCarts }, (_, cartIndex) => ({
            cart: cartIndex + 1,
            seats: Array.from({ length: seatsPerCart }, (_, seatIndex) => ({
                number: seatIndex + 1,
                status: 0 // 0 means available, 1 means booked
            }))
        }));
    };

    // Initialize seat data as state
    const [seatData, setSeatData] = useState({
        1: generateSeatData(totalFirstClassCartCount, fClassCartSeats),
        2: generateSeatData(totalSecondClassCartCount, sClassCartSeats),
        3: generateSeatData(totalThirdClassCartCount, tClassCartSeats),
    });

    // Example of booked seats
    const bookedSeats = [
        { class: 1, cart: 1, number: 5 },
        { class: 2, cart: 2, number: 10 },
        { class: 3, cart: 3, number: 15 },
    ];

    // Load booked seats into state and trigger a re-render
    useEffect(() => {
        const updatedSeatData = { ...seatData };
        bookedSeats.forEach(({ class: cls, cart, number }) => {
            const cartIndex = updatedSeatData[cls].findIndex(c => c.cart === cart);
            if (cartIndex !== -1) {
                const seatIndex = updatedSeatData[cls][cartIndex].seats.findIndex(s => s.number === number);
                if (seatIndex !== -1) {
                    updatedSeatData[cls][cartIndex].seats[seatIndex].status = 1; // Mark as booked
                }
            }
        });
        setSeatData(updatedSeatData); // Update state to trigger re-render
    }, [bookedSeats, seatData]);

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
                        cartCount={totalFirstClassCartCount}
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
                        cartCount={totalSecondClassCartCount}
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
                        cartCount={totalThirdClassCartCount}
                    />
                );
            default:
                return null;
        }
    };

    // Calculate total price
    const totalPrice = selectedSeats.reduce((total, seat) => {
        return total + classPrices[seat.class];
    }, 0);

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
                    <button
                        className={`w-full mb-2 px-4 border-x-2 border-black py-2 rounded ${currentClass === 1 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setCurrentClass(1);
                            setCurrentCart(1);
                        }}
                    >
                        1st Class
                    </button>
                    <button
                        className={`w-full mb-2 px-4 border-r-2 border-black py-2 rounded ${currentClass === 2 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setCurrentClass(2);
                            setCurrentCart(1);
                        }}
                    >
                        2nd Class
                    </button>
                    <button
                        className={`w-full mb-2 px-4 border-r-2 border-black py-2 rounded ${currentClass === 3 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setCurrentClass(3);
                            setCurrentCart(1);
                        }}
                    >
                        3rd Class
                    </button>
                </div>
                {getSeatLayout()}
            </div>
            <div className="w-1/5 p-6 bg-gray-100 rounded-lg shadow-lg">
                <div className="mt-4">
                    <h2 className="text-xl text-black mb-2">Selected Seats:</h2>
                    <table className='text-blue-500 items-center'>
                        <thead>
                            <tr>
                                <th className="pr-4">Class</th>
                                <th className="pr-4">Cart</th>
                                <th className="pr-4">Seat</th>
                                <th className="pr-4">Price(LKR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSeats.map((seat, index) => (
                                <tr key={index} className='border-b-2 border-black'>
                                    <td className="pr-4">{seat.class === 1 ? '1C' : seat.class === 2 ? '2C' : '3C'}</td>
                                    <td className="pr-4">{seat.cart}</td>
                                    <td className="pr-4">{seat.number}</td>
                                    <td className="pr-4">{classPrices[seat.class]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 className="text-lg font-semibold mt-2">Total Price: {totalPrice} LKR</h3>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
