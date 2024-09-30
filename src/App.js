// src/App.js
import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./setup/routes/AppRoutes";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./components/Layout/AuthContext";

const AppWrapper = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppWrapper />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
