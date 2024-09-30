import React from "react";
import { Routes, Route } from "react-router-dom";

import UserDashboard from "../../user/UserDashboard";
import UserDetails from '../../user/UserDetails';
import OrderHistory from "../../user/OrderHistory";
import Complain from "../../user/Complain";
import Checkout from "../../pages/Checkout";

const UserRoutes = () => (
    <Routes>
        <Route path="/" element={<UserDashboard />}>
            <Route path="user-details" element={<UserDetails />} />
            <Route path="complain" element={<Complain />} />
            <Route path="order-history" element={<OrderHistory />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} /> {/* Corrected */}
    </Routes>
);

export default UserRoutes;
