import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./setup/routes/AppRoutes";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <div>
        <Layout>
          <Navbar />
          <AppRoutes />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
