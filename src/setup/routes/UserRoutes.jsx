import React from "react";
import { Routes, Route } from "react-router-dom";

import UserDashboard from "../../user/UserDashboard";
import UserDetails from "../../user/UserDetails";
import Complain from "../../user/Complain";
import BookingHistory from "../../user/BookingHistory";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<UserDashboard />}>
      <Route path="user-details" element={<UserDetails />} />
      <Route path="complain" element={<Complain />} />
      <Route path="booking-history" element={<BookingHistory />} />
    </Route>
  </Routes>
);

export default UserRoutes;
