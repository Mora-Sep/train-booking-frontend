import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../../admin/AdminDashboard";
import UserDetails from "../../admin/UserDetails";
import ActDctTrip from "../../admin/ActDctTrip";
import DeleteSection from "../../admin/DeleteSection";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />}>
      <Route index element={<UserDetails />} />
      <Route path="user-details" element={<UserDetails />} />
      <Route path="activate-trip" element={<ActDctTrip />} />
      <Route path="delete-section" element={<DeleteSection />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
