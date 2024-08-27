import React from "react";
import { Routes, Route } from "react-router-dom";
import DeoDashboard from "../../deo/DeoDashboard";
import UserDetails from "../../deo/UserDetails";

const DEORoutes = () => (
  <Routes>
    <Route path="/" element={<DeoDashboard />}>
      <Route index element={<UserDetails />} />
      <Route path="user-details" element={<UserDetails />} />
    </Route>
  </Routes>
);

export default DEORoutes;
