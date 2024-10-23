import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaUser, FaBars, FaTrain, FaTrash } from "react-icons/fa"; // Importing icons
import { FaBookOpen } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa"; // Importing the bar chart icon

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access-token");
    navigate("/admin-portal");
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col justify-between shadow-lg transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col">
          <button
            className="text-2xl p-4 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>

          {!isCollapsed && (
            <h2 className="text-2xl font-bold p-6 text-center border-b border-gray-700">
              Admin Dashboard
            </h2>
          )}

          <ul
            className={`space-y-4 p-4 w-full ${
              isCollapsed ? "items-center" : ""
            }`}
          >
            <li className="w-full">
              <NavLink
                to="summery"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 hover:bg-gray-700 rounded-lg bg-gray-700 transition duration-300"
                    : "flex items-center p-3 hover:bg-gray-700 rounded-lg transition duration-300"
                }
              >
                <FaChartBar /> {/* Changed icon to bar chart */}
                {!isCollapsed && <span className="ml-4">Summary</span>}{" "}
                {/* Corrected text to "Summary" */}
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="user-details"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 hover:bg-gray-700 rounded-lg bg-gray-700 transition duration-300"
                    : "flex items-center p-3 hover:bg-gray-700 rounded-lg transition duration-300"
                }
              >
                <FaUser />
                {!isCollapsed && <span className="ml-4">User Details</span>}
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                to="register-staff"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 hover:bg-gray-700 rounded-lg bg-gray-700 transition duration-300"
                    : "flex items-center p-3 hover:bg-gray-700 rounded-lg transition duration-300"
                }
              >
                <FaUser />
                {!isCollapsed && (
                  <span className="ml-4">Register New Staff</span>
                )}
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="activate-trip"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 hover:bg-gray-700 rounded-lg bg-gray-700 transition duration-300"
                    : "flex items-center p-3 hover:bg-gray-700 rounded-lg transition duration-300"
                }
              >
                <FaTrain />
                {!isCollapsed && (
                  <span className="ml-4">Active/Deactivate Trips</span>
                )}
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="reports"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 hover:bg-gray-700 rounded-lg bg-gray-700 transition duration-300"
                    : "flex items-center p-3 hover:bg-gray-700 rounded-lg transition duration-300"
                }
              >
                <FaBookOpen />
                {!isCollapsed && <span className="ml-4">Reports</span>}
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="delete-section"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 hover:bg-gray-700 rounded-lg bg-gray-700 transition duration-300"
                    : "flex items-center p-3 hover:bg-gray-700 rounded-lg transition duration-300"
                }
              >
                <FaTrash />
                {!isCollapsed && <span className="ml-4">Delete Section</span>}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Conditionally hide the logout button when collapsed */}
        <div
          className={`p-6 transition-all duration-300 ${
            isCollapsed ? "hidden" : "w-full"
          }`}
        >
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold w-full p-3 rounded-lg transition duration-300 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto bg-gray-100 hide-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
