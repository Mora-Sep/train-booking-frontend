// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    // Check for token in cookies on component mount
    useEffect(() => {
        const savedToken = Cookies.get('access-token');
        if (savedToken) {
            setAuthToken(savedToken);
        }
    }, []);

    // Function to handle login and store token
    const login = (token) => {
        Cookies.set('access-token', token, { expires: 7 });
        setAuthToken(token);
    };

    // Function to handle logout
    const logout = () => {
        Cookies.remove('access-token');
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
