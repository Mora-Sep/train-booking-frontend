import React, { createContext, useContext, useState } from 'react';

// Create the context
const GlobalRefBookContext = createContext();

// Provider component
export const GlobalRefBookProvider = ({ children }) => {
    const [bookingRefData, setBookingRefData] = useState(null);

    // Function to update the booking reference data
    const updateBookingRefData = (data) => {
        setBookingRefData(data);
    };

    return (
        <GlobalRefBookContext.Provider value={{ bookingRefData, updateBookingRefData }}>
            {children}
        </GlobalRefBookContext.Provider>
    );
};

// Custom hook to use the GlobalRefBook context
export const useGlobalRefBook = () => useContext(GlobalRefBookContext);
