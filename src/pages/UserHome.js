import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserHome = () => {
    const [stations, setStations] = useState([]);
    const [fromStation, setFromStation] = useState('');
    const [toStation, setToStation] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showResults, setShowResults] = useState(false);
    const [filteredTrains, setFilteredTrains] = useState([]);

    useEffect(() => {
        // Mock API call to fetch station data
        /*
        axios.get('/api/get/stations')
            .then(response => {
                setStations(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the stations!', error);
            });
        */

        // Hardcoded station data for testing purposes
        const sampleStations = [
            { Code: "ABA", Name: "Ambalangoda" },
            { Code: "ABN", Name: "Ambanpola" },
            { Code: "AGL", Name: "Angulana" },
            { Code: "ALT", Name: "Aluthgama" },
            { Code: "ALW", Name: "Alawwa" },
        ];

        setStations(sampleStations);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        // Sample train data for demonstration purposes
        const sampleTrainData = [
            {
                id: 1,
                from: 'ABA',
                to: 'ABN',
                firstClassSeats: 10,
                secondClassSeats: 20,
                thirdClassSeats: 50,
            },
            {
                id: 2,
                from: 'AGL',
                to: 'ALT',
                firstClassSeats: 5,
                secondClassSeats: 15,
                thirdClassSeats: 30,
            },
        ];

        const filtered = sampleTrainData.filter(train =>
            train.from === fromStation && train.to === toStation
        );

        setFilteredTrains(filtered);
        setShowResults(true);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Section: Search Form */}
            <div className={`w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white shadow-lg ${showResults ? 'md:w-full' : ''}`}>
                <h1 className="text-5xl font-bold text-blue-800 mb-20">
                    Make your booking experience easy!
                </h1>

                <form className="w-full" onSubmit={handleSearch}>
                    <div className='flex flex-col space-y-4'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">From:</label>
                            <select
                                value={fromStation}
                                onChange={(e) => setFromStation(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="">Select Station</option>
                                {stations.map(station => (
                                    <option key={station.Code} value={station.Code}>
                                        {station.Name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">To:</label>
                            <select
                                value={toStation}
                                onChange={(e) => setToStation(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="">Select Station</option>
                                {stations.map(station => (
                                    <option key={station.Code} value={station.Code}>
                                        {station.Name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600">
                            Search for Trains
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Section: Image or Search Results */}
            {!showResults ? (
                <div className="w-full md:w-1/2">
                    <img
                        src="/Main/Sign.png"
                        alt="Train"
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-full md:w-full p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Search Results</h2>
                    <div className="space-y-4">
                        {filteredTrains.length > 0 ? (
                            filteredTrains.map(train => (
                                <div key={train.id} className="bg-white p-4 rounded-md shadow-md">
                                    <h3 className="text-xl font-bold text-blue-800 mb-2">{stations.find(station => station.Code === train.from)?.Name} → {stations.find(station => station.Code === train.to)?.Name}</h3>
                                    <p className="text-gray-700">First Class Seats: {train.firstClassSeats}</p>
                                    <p className="text-gray-700">Second Class Seats: {train.secondClassSeats}</p>
                                    <p className="text-gray-700">Third Class Seats: {train.thirdClassSeats}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-700">No trains available for the selected route.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserHome;