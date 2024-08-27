import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './setup/routes/AppRoutes';
import Navbar from './components/Navbar';
import Layout from './components/Layout/Layout';

const AppWrapper = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

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
      <Layout>
        <AppWrapper />
      </Layout>
    </Router>
  );
}

export default App;
