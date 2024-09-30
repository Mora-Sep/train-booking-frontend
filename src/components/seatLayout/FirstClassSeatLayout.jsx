import React from 'react';
import { FaSquare, FaRegSquare } from 'react-icons/fa';

const FirstClassSeatLayout = ({ seats, onSeatSelect, selectedSeats, currentCart, onNextCart, onPrevCart, cartCount }) => {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex justify-between w-full mb-4">
                <button
                    className="px-4 py-2 bg-blue-700 text-white rounded"
                    onClick={onPrevCart}
                    disabled={currentCart === 1}
                >
                    Previous Cart
                </button>
                <div className="text-center w-full">
                    First Class - Cart {currentCart} out of {cartCount}
                </div>
                <button
                    className="px-4 py-2 bg-blue-700 text-white rounded"
                    onClick={onNextCart}
                    disabled={currentCart === seats.length}
                >
                    Next Cart
                </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
                {seats[currentCart - 1].seats.map((seat, index) => (
                    <React.Fragment key={index}>
                        {index % 4 === 2 && <div className="col-span-1"></div>}
                        <div
                            className={`flex items-center justify-center p-2 border rounded cursor-pointer
                            ${seat.status === 1 ? "bg-gray-400 text-gray-500 cursor-not-allowed" : "text-black"}
                            ${selectedSeats.some(s => s.cart === currentCart && s.number === seat.number) && "bg-blue-500 text-white"}`}
                            onClick={() => seat.status !== 1 && onSeatSelect(seat, currentCart)}
                        >
                            {seat.status === 1 ? <FaSquare /> : <FaRegSquare />}
                            <span className="ml-2">{seat.number}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default FirstClassSeatLayout;
