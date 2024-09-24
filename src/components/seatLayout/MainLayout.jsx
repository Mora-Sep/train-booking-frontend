import React, { useState, useEffect } from 'react';
import FirstClassSeatLayout from './FirstClassSeatLayout';
import SecondClassSeatLayout from './SecondClassSeatLayout';
import ThirdClassSeatLayout from './ThirdClassSeatLayout';

// Dummy API URL
const API_BASE_URL = 'https://api.example.com/train-seats';
const TrainName = 'Udarata Manike';

const MainLayout = () => {
    const [currentClass, setCurrentClass] = useState(1);
    const [currentCart, setCurrentCart] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatData, setSeatData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Prices for each class
    const classPrices = { 1: 150, 2: 100, 3: 50 };

    // Fetch seat data from the server
    useEffect(() => {
        const fetchSeatData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/train/${TrainName}`);
                const data = await response.json();
                setSeatData(data);
            } catch (err) {
                setError('Failed to load seat data.');
            } finally {
                setLoading(false);
            }
        };
        fetchSeatData();
    }, []);

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
        if (!seatData[currentClass]) return null;
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
                    />
                );
            default:
                return null;
        }
    };

    // Handle booking
    const handleBooking = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/book-seats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedSeats }),
            });
            const result = await response.json();
            if (result.success) {
                alert('Booking successful!');
                // Refetch seat data to update booked seats
                setSelectedSeats([]);
                const updatedData = await fetch(`${API_BASE_URL}/train/${TrainName}`).then(res => res.json());
                setSeatData(updatedData);
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (err) {
            setError('Booking error. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Calculate total price
    const totalPrice = selectedSeats.reduce((total, seat) => {
        return total + classPrices[seat.class];
    }, 0);

    if (loading) return <div>Loading seats...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex">
            <div className="flex flex-col w-4/5 p-6 bg-white rounded-lg shadow-lg">
                <div className='text-blue-800 text-3xl font-serif font-bold text-center pb-5'>{TrainName}</div>
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
                    <div className="mt-4">
                        <p className="text-xl text-red-600 font-bold">Total: LKR {totalPrice}</p>
                        <button
                            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={handleBooking}
                        >
                            Buy Selected Seats
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
