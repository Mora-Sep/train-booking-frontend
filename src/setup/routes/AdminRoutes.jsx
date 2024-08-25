import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../../admin/AdminDashboard";
import UserDetails from "../../admin/UserDetails";
import TrainDetails from "../../admin/TrainDetails";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />}>
      <Route path="user-details" element={<UserDetails />} />
      <Route path="train-details" element={<TrainDetails />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
