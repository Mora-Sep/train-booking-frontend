import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const Login = () => {
  return (
    <div className="flex p-0 flex-col lg:flex-row h-screen mt-18">
      {/* Left Column */}
      <div className="relative w-full lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/Main/Login.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-8xl lg:text-8xl font-bold text-white text-center">
            Welcome Back
          </h1>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6 lg:p-12">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">Login to Your Account</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold text-lg"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
