import React from "react";
import DatePicker from "react-datepicker"; // Import DatePicker directly, not from `{ }`
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  return (
    <div className="flex p-0 flex-col lg:flex-row h-screen mt-18">
      {/* Left Column */}
      <div
        className="relative w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/Main/MainPhoto.svg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-8xl lg:text-8xl font-bold text-white text-center">
            ON TRAIN
          </h1>
          {/* <img src="/Main/logo-no-background.png" alt="logo" className="w-32 h-16 mt-4" /> */}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6 lg:p-12">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">
            Search for a Train
          </h2>
          <form className="space-y-4">
            {/* Date and Time Picker */}
            <div className="flex justify-centre space-x-1">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <DatePicker
                  id="date"
                  selected={new Date()}
                  onChange={(date) => console.log(date)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="passengers"
                className="block text-sm font-medium text-gray-700"
              >
                Passengers
              </label>
              <input
                type="number"
                id="passengers"
                min="1"
                defaultValue="1"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold text-lg"
            >
              Find
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
