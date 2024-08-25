import React from "react";
import { Routes, Route } from "react-router-dom";
import DEOPortal from "../../pages/DEOPortal";

const DEORoutes = () => (
  <Routes>
    <Route path="/" element={<DEOPortal />} />
    <Route path="login" element={<DEOPortal />} />
    {/* You can add more routes here if needed */}
  </Routes>
);

export default DEORoutes;
