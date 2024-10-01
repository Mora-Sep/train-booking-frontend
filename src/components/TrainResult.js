// TrainResult.js
import React from "react";
import { FaTrain } from "react-icons/fa"; // train icon

const TrainResult = ({ train, onTrainSelect }) => {
    return (
        <div className="bg-white p-6 rounded-md shadow-md">

            <div className="flex items-center justify-between ">
                <span className="text-2xl font-bold text-blue-800">{train.originCode}</span>

                <div className="flex items-center justify-center space-x-2">
                    <FaTrain className="text-blue-800" />
                    <span className="text-3xl font-semibold text-gray-700">{train.trainName}</span>
                </div>

                <span className="text-2xl font-bold text-blue-800">{train.destinationCode}</span>
            </div>


            <div className="flex justify-between mb-6">
                <span className="text-blue-900 text-2xl">{train.routeOrigin}</span>
                <span className="text-blue-900 text-2xl">{train.routeDestination}</span>
            </div>


            <div className="flex justify-between mb-4">
                <div className="flex flex-col items-start">
                    <span className="text-lg text-gray-700">From: {train.originName}</span>
                    <span className="text-red-800 font-mono font-bold text-xl">Dep: {train.departureDateAndTime}</span>
                </div>

                <span className="text-gray-600 font-semibold text-xl mt-4">Duration: {train.durationMinutes} min</span>

                <div className="flex flex-col items-end">
                    <span className="text-lg text-gray-700">To: {train.destinationName}</span>
                    <span className="text-red-800 font-mono font-bold text-xl">Arr: {train.arrivalDateAndTime}</span>
                </div>
            </div>
            <p className="text-black text-center font-bold">Remaining Seats</p>

            <div className="space-y-2 text-center">
                <p className="text-gray-800">1st Class Seats: {train.seatReservations[0].totalCount - train.seatReservations[0].reservedCount}</p>
                <p className="text-gray-800">2nd Class Seats: {train.seatReservations[1].totalCount - train.seatReservations[1].reservedCount}</p>
                <p className="text-gray-800">3rd Class Seats: {train.seatReservations[2].totalCount - train.seatReservations[2].reservedCount}</p>
            </div>


            <div className="flex justify-center mt-4">
                <button
                    onClick={() => onTrainSelect(train)}
                    className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
                >
                    View Seats
                </button>
            </div>
        </div>
    );
};

export default TrainResult;
