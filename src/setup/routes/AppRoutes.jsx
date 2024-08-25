import React from "react";
import { Routes, Route } from "react-router-dom";
// import Layout from '../../components/Layout/Layout';

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Sign from "../../pages/Sign";
import UserHome from "../../pages/UserHome";

import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import DEORoutes from "./DEORoutes";

import TrainSeatLayout from "../../components/seatLayout/TrainSeatLayout";


const AppRoutes = () => {
  return (
    // <Layout>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/user-home" element={<UserHome />} />
      <Route path="/seat" element={<TrainSeatLayout />} />


      {/* Nested routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/user-dashboard/*" element={<UserRoutes />} />
      <Route path="/deo/*" element={<DEORoutes />} />
    </Routes>
    // </Layout>
  );
};

export default AppRoutes;
