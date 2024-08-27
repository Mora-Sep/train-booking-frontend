import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function DeoDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access-token");
    navigate("/admin-portal");
    window.location.reload();
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4">DEO Dashboard</h2>
          <ul className="space-y-2 p-4">
            <li>
              <NavLink
                to="user-details"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "block p-2 hover:bg-gray-700 rounded"
                }
              >
                User Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="schedule-trip"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "block p-2 hover:bg-gray-700 rounded"
                }
              >
                Schedule A New Trip
              </NavLink>
            </li>
            <li>
              <NavLink
                to="add-section"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "block p-2 hover:bg-gray-700 rounded"
                }
              >
                Add Section
              </NavLink>
            </li>
            <li>
              <NavLink
                to="update-delay"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "block p-2 hover:bg-gray-700 rounded"
                }
              >
                Update Delay
              </NavLink>
            </li>
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 w-full p-2 rounded"
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default DeoDashboard;
