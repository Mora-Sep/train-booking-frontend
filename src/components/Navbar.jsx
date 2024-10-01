import React from "react";
import { Link } from "react-router-dom";
import { UserGlobalState } from "./Layout/UserGlobalState";
import { useNavigate } from "react-router-dom";

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
    <div className="navbar bg-gradient-to-r from-blue-600 to-purple-800 h-18 rounded-md">
      <div className="flex-1">
        <Link to="/" className="">
          <img
            src="/Main/logo-no-background.png"
            alt="logo"
            width={120}
            height={50}
          />
        </Link>
      </div>
      <div className="flex-none">
        {currentUserData?.username ? (
          <>
            <Link
              to="/booking"
              className="px-4 text-lg font-semibold hover:text-blue-700 text-white"
            >
              Search for a Train
            </Link>
            <Link
              to="/user/order-history"
              className="pl-4 pr-20 text-lg hover:text-blue-700 font-semibold text-white"
            >
              Bookings
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleSignin}
              className="px-4 text-lg font-semibold hover:text-blue-700 text-white"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              className="pl-4 pr-20 text-lg hover:text-blue-700 font-semibold text-white"
            >
              Login
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
                <img alt="User Profile" src={profilePic || "/Main/image.png"} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
