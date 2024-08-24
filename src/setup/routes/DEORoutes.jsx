import React from "react";
import { Routes, Route } from "react-router-dom";
import DEOPortal from "../../pages/DEOPortal";

const DEORoutes = () => (
  <Routes>
    <Route path="/login" element={<DEOPortal />} />
  </Routes>
);

export default DEORoutes;
