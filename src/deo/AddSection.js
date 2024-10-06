import React, { useState } from "react";
import AddTrain from "./../components/deo/AddTrain";
import AddModel from "./../components/deo/AddModel";
import AddStation from "./../components/deo/AddStation";
import AddRoute from "./../components/deo/AddRoute";

function AddSection() {
  const [activeTab, setActiveTab] = useState("model"); // Default active tab

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "model":
        return <AddModel />;
      case "train":
        return <AddTrain />;
      case "station":
        return <AddStation />;
      case "route":
        return <AddRoute />;
      default:
        return <AddModel />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("model")}
          className={`flex-1 p-3 rounded-md transition duration-300 ease-in-out border-2 border-blue-500 ${activeTab === "model"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
        >
          Add Model
        </button>
        <button
          onClick={() => setActiveTab("train")}
          className={`flex-1 p-3 rounded-md transition duration-300 ease-in-out border-2 border-blue-500 ${activeTab === "train"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
        >
          Add Train
        </button>
        <button
          onClick={() => setActiveTab("station")}
          className={`flex-1 p-3 rounded-md transition duration-300 ease-in-out border-2 border-blue-500 ${activeTab === "station"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
        >
          Add Station
        </button>
        <button
          onClick={() => setActiveTab("route")}
          className={`flex-1 p-3 rounded-md transition duration-300 ease-in-out border-2 border-blue-500 ${activeTab === "route"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
        >
          Add Route
        </button>
      </div>

      {/* Render the active component */}
      <div>
        {renderActiveComponent()}
      </div>
    </div>
  );
}

export default AddSection;
