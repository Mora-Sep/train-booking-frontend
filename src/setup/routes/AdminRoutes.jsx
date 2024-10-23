import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../../admin/AdminDashboard";
import UserDetails from "../../admin/UserDetails";
import RegisterStaff from "../../admin/RegisterStaff";
import ActDctTrip from "../../admin/ActDctTrip";
import DeleteSection from "../../admin/DeleteSection";
import Reports from "../../admin/Reports";
import Summery from "../../admin/Summery";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />}>
      <Route index element={<UserDetails />} />
      <Route path="summery" element={<Summery />} />
      <Route path="user-details" element={<UserDetails />} />
      <Route path="register-staff" element={<RegisterStaff />} />
      <Route path="activate-trip" element={<ActDctTrip />} />
      <Route path="reports" element={<Reports />} />
      <Route path="delete-section" element={<DeleteSection />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
