import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../../admin/AdminDashboard";
import UserDetails from "../../admin/UserDetails";
import TrainDetails from "../../admin/TrainDetails";
import AdminPortal from "../../pages/AdminPortal";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminPortal />}>
      <Route index element={<AdminDashboard />} />
      <Route path="login" element={<AdminPortal />} />
      <Route path="user-details" element={<UserDetails />} />
      <Route path="train-details" element={<TrainDetails />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
