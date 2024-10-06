import React from "react";
import { Link } from "react-router-dom";
import { UserGlobalState } from "./Layout/UserGlobalState";
import { useNavigate } from "react-router-dom";
// Import Heroicons
import {
  MagnifyingGlassIcon,
  TicketIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Navbar = ({ profilePic }) => {
  const { currentUserData } = UserGlobalState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignin = () => {
    navigate("/sign");
  };

  return (
    <div className="navbar bg-gradient-to-r from-blue-800 to-purple-800 h-18 ">
      <div className="flex-1">
        <Link to="/" className="">
          <h1 className="text-3xl ml-4 font-semibold font-serif text-white">
            On Train
          </h1>
        </Link>
      </div>
      <div className="flex-none">
        {currentUserData?.username ? (
          <>
            {/* Search with MagnifyingGlassIcon */}
            <Link
              to="/booking"
              className="btn btn-outline px-4 text-lg font-semibold hover:text-blue-700 text-white flex items-center"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-1" /> Search
            </Link>
            {/* Bookings with TicketIcon */}
            <Link
              to="/user/booking-history"
              className="btn btn-outline mx-4 text-lg hover:text-blue-700 font-semibold text-white flex items-center"
            >
              <TicketIcon className="h-5 w-5 mr-1" /> Bookings
            </Link>
          </>
        ) : (
          <>
            {/* Sign Up with UserPlusIcon */}
            <button
              onClick={handleSignin}
              className="btn btn-outline px-4 text-lg font-semibold hover:text-blue-700 text-white flex items-center"
            >
              <UserPlusIcon className="h-5 w-5 mr-1" /> Sign up
            </button>
            {/* Login with ArrowRightOnRectangleIcon */}
            <button
              onClick={handleLogin}
              className="btn  btn-success pl-4 mx-3 mr-20 text-lg hover:text-blue-700 font-semibold text-white flex items-center"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Sign in
            </button>
          </>
        )}
        {currentUserData?.username ? (
          <div className="dropdown dropdown-end mt-1 pr-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-28 rounded-full hover:scale-110">
                <img alt="User Profile" src={profilePic || "/Landing Page/image.png"} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-700 font-semibold rounded-box z-[1] text-white mt-3 w-52 p-2 "
            >
              <>
                <li>
                  {currentUserData?.role === "Admin" ? (
                    <Link to="/admin">Admin Dashboard</Link>
                  ) : currentUserData?.role === "Data Entry Operator" ? (
                    <Link to="/deo">DEO Dashboard</Link>
                  ) : (
                    <Link to="/user/user-details">My Profile</Link>
                  )}
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Log out</button>
                </li>
              </>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
