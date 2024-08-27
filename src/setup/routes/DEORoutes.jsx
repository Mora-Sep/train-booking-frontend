import React from "react";
import { Routes, Route } from "react-router-dom";
import DeoDashboard from "../../deo/DeoDashboard";
import UserDetails from "../../deo/UserDetails";
import AddSection from "../../deo/AddSection";
import ScheduleTrip from "../../deo/ScheduleTrip";
import UpdateDelay from "../../deo/UpdateDelay";

const DEORoutes = () => (
  <Routes>
    <Route path="/" element={<DeoDashboard />}>
      <Route index element={<UserDetails />} />
      <Route path="user-details" element={<UserDetails />} />
      <Route path="add-section" element={<AddSection />} />
      <Route path="schedule-trip" element={<ScheduleTrip />} />
      <Route path="update-delay" element={<UpdateDelay />} />
    </Route>
  </Routes>
);

export default DEORoutes;
