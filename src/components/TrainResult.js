// TrainResult.js
import React from "react";
import { FaTrain } from "react-icons/fa"; // train icon

const TrainResult = ({ train, onTrainSelect }) => {
    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div
            className="bg-white p-6 rounded-lg shadow-sm hover:bg-gradient-to-r hover:from-blue-100 hover:to-white cursor-pointer"
            onClick={() => onTrainSelect(train)}
        >
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-800">{train.originCode}</span>
                <div className="flex items-center space-x-2">
                    <FaTrain className="text-blue-800 text-xl" />
                    <span className="text-3xl font-semibold text-gray-700">{train.trainName}</span>
                </div>
                <span className="text-2xl font-bold text-blue-800">{train.destinationCode}</span>
            </div>

            <div className="flex justify-between mb-6">
                <span className="text-blue-900 text-2xl">{train.routeOrigin}</span>
                <span className="text-blue-900 text-2xl">{train.routeDestination}</span>
            </div>

            <div className="flex justify-between mb-4">
                <div className="flex flex-col">
                    <span className="text-lg text-gray-700">From: {train.originName}</span>
                    <span className="text-red-800 font-mono font-bold text-xl">Dep: {train.departureDateAndTime}</span>
                </div>
                <span className="text-gray-600 font-semibold text-xl mt-4">Duration: {formatDuration(train.durationMinutes)}</span>
                <div className="flex flex-col items-end">
                    <span className="text-lg text-gray-700">To: {train.destinationName}</span>
                    <span className="text-red-800 font-mono font-bold text-xl">Arr: {train.arrivalDateAndTime}</span>
                </div>
            </div>

            <div className="flex  justify-center">
                <table className="w-fit   shadow-sm shadow-transparent text-center">
                    <thead className="bg-blue-400">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-black uppercase tracking-wider">Class</th>
                            <th className="px-6 py-3 text-xs font-semibold text-black uppercase tracking-wider">Remaining Seats</th>
                            <th className="px-6 py-3 text-xs font-semibold text-black uppercase tracking-wider">Price (Rs)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100  ">
                        {train.seatReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 text-sm  text-gray-900">{train.prices[index].class}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{reservation.totalCount - reservation.reservedCount}</td>
                                <td className="px-6 py-4 text-sm text-red-600">{train.prices[index].price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onTrainSelect(train);
                    }}
                    className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
                >
                    View Seats
                </button>
            </div>
        </div>
    );
};

export default TrainResult;
