import React from "react";
import { Routes, Route } from "react-router-dom";
// import Layout from '../../components/Layout/Layout';

import ProtectedRoute from "./ProtectedRoute";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Sign from "../../pages/Sign";
import UserHome from "../../pages/UserHome";

import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import DEORoutes from "./DEORoutes";

import TrainSeatLayout from "../../components/seatLayout/TrainSeatLayout";
import Unauthorized from "../../pages/Unauthorized";
import AdminPortal from "../../pages/AdminPortal";
import DEOPortal from "./../../pages/DEOPortal";
import Payment from "../../pages/Payment";

const AppRoutes = () => {
  return (
    // <Layout>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/user-home" element={<UserHome />} />
      <Route path="/admin-portal" element={<AdminPortal />} />
      <Route path="/deo-portal" element={<DEOPortal />} />
      <Route path="/seat" element={<TrainSeatLayout />} />
      <Route path="/checkout" element={<Payment />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Nested routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-dashboard/*"
        element={
          <ProtectedRoute requiredRole="user">
            <UserRoutes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deo/*"
        element={
          <ProtectedRoute requiredRole="deo">
            <DEORoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
    // </Layout>
  );
};

export default AppRoutes;
