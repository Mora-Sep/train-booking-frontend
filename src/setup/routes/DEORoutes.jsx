import React from "react";
import { Routes, Route } from "react-router-dom";
import DEODashboard from "./../../pages/DEODashboard";

const DEORoutes = () => (
  <Routes>
    <Route path="/" element={<DEODashboard />} />
    {/* You can add more routes here if needed */}
  </Routes>
);

export default DEORoutes;
