import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import {
  FaBars,
  FaUser,
  FaCalendarAlt,
  FaMapSigns,
  FaClock,
} from "react-icons/fa";

function DeoDashboard() {
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
          isCollapsed ? "w-16" : "w-1/5"
        }`}
      >
        <div>
          <button
            className="text-2xl p-4 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>

          <h2
            className={`text-2xl font-bold p-4 transition-all duration-300 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            DEO Dashboard
          </h2>

          <ul className="space-y-2 p-4">
            <li>
              <NavLink
                to="user-details"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "flex items-center p-2 hover:bg-gray-700 rounded"
                }
              >
                <FaUser className="text-lg" />
                <span
                  className={`ml-4 transition-all duration-300 ${
                    isCollapsed ? "hidden" : ""
                  }`}
                >
                  User Details
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="schedule-trip"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "flex items-center p-2 hover:bg-gray-700 rounded"
                }
              >
                <FaCalendarAlt className="text-lg" />
                <span
                  className={`ml-4 transition-all duration-300 ${
                    isCollapsed ? "hidden" : ""
                  }`}
                >
                  Schedule A New Trip
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="add-section"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "flex items-center p-2 hover:bg-gray-700 rounded"
                }
              >
                <FaMapSigns className="text-lg" />
                <span
                  className={`ml-4 transition-all duration-300 ${
                    isCollapsed ? "hidden" : ""
                  }`}
                >
                  Add Section
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="update-delay"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "flex items-center p-2 hover:bg-gray-700 rounded"
                }
              >
                <FaClock className="text-lg" />
                <span
                  className={`ml-4 transition-all duration-300 ${
                    isCollapsed ? "hidden" : ""
                  }`}
                >
                  Update Delay
                </span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Conditionally hide the logout button when collapsed */}
        <div
          className={`p-4 transition-all duration-300 ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          <button
            onClick={handleLogout}
            className="bg-red-600 w-full p-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto hide-scrollbar bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default DeoDashboard;
