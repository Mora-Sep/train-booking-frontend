import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Sign from "../../pages/Sign";
import Layout from "../../components/Layout/Layout";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
