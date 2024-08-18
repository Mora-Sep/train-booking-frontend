import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Sign from "../../pages/Sign";
import Layout from "../../components/Layout/Layout";
import AdminPortal from "../../pages/AdminPortal";
import DEOPortal from "../../pages/DEOPortal";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/deo-portal" element={<DEOPortal />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
