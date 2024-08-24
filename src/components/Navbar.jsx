import React from "react";
import { Link } from "react-router-dom";
import { UserGlobalState } from "./Layout/UserGlobalState";
import { useNavigate } from "react-router-dom";

const Navbar = ({ profilePic }) => {
  const { currentUserData } = UserGlobalState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignin = () => {
    navigate("/sign");
  };

  return (
    <div className="navbar  bg-blue-50   h-18 rounded-md">
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
        <Link
          to="/about"
          className=" px-4 text-lg font-semibold hover:text-blue-700 text-black"
        >
          Book a Ticket
        </Link>
        <Link
          to="/about"
          className="pl-4 pr-20 text-lg hover:text-blue-700 font-semibold text-black"
        >
          Orders
        </Link>
        <div className="dropdown dropdown-end pr-10">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-28 rounded-full hover:scale-110">
              <img
                alt="User Profile"
                src={
                  currentUserData?.username
                    ? profilePic
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-blue-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {currentUserData?.username ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Log out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={handleSignin}>Sign in</button>
                </li>
                <li>
                  <button onClick={handleLogin}>Log in</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
