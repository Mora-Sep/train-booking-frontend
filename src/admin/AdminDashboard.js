import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4">Admin Dashboard</h2>
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
                to="activate-trip"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "block p-2 hover:bg-gray-700 rounded"
                }
              >
                Active/Deactivate Trips
              </NavLink>
            </li>
            <li>
              <NavLink
                to="delete-section"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 hover:bg-gray-700 rounded bg-gray-700"
                    : "block p-2 hover:bg-gray-700 rounded"
                }
              >
                Delete Section
              </NavLink>
            </li>
            <div className="p-4">
              <button className="bg-red-600 w-full p-2 rounded">Logout</button>
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
};

export default AdminDashboard;
