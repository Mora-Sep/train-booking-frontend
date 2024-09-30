import React from "react";
import { Routes, Route } from "react-router-dom";

import UserDashboard from "../../user/UserDashboard";
import UserDetails from "../../user/UserDetails";
import OrderHistory from "../../user/OrderHistory";
import Complain from "../../user/Complain";
import PendingPayments from "./../../user/PendingPayments";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<UserDashboard />}>
      <Route path="user-details" element={<UserDetails />} />
      <Route path="complain" element={<Complain />} />
      <Route path="order-history" element={<OrderHistory />} />
      <Route path="pending-payments" element={<PendingPayments />} />
    </Route>
  </Routes>
);

export default UserRoutes;
