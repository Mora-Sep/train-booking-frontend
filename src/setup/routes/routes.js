import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Sign from "../../pages/Sign";
import Layout from "../../components/Layout/Layout";
import AdminPortal from "../../pages/AdminPortal";
import DEOPortal from "../../pages/DEOPortal";

import AdminDashboard from "../../admin/AdminDashboard";
import UserDetails from "../../admin/UserDetails";
import TrainDetails from "../../admin/TrainDetails";

import UserDashboard from "../../user/UserDashboard";
import BuyTicket from "../../user/BuyTicket";
import OrderDetails from "../../user/OrderHistory";
import Complain from "../../user/Complain";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />

        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/deo-portal" element={<DEOPortal />} />


        {/* Admin Dashboard paths */}
        <Route path="/AdminDashboard/*" element={<AdminDashboard />} />
        <Route path="user-details" element={<UserDetails />} />
        <Route path="train-details" element={<TrainDetails />} />

        <Route path="/UserDashboard/*" element={<UserDashboard />} />
        <Route path="buy-ticket" element={<BuyTicket />} />
        <Route path="complain" element={<Complain />} />
        <Route path="order-history" element={<OrderDetails />} />

      </Routes>
    </Layout>
  );
};

export default AppRoutes;
