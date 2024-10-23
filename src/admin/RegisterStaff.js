import { useState } from "react";
import AddAdmin from "./../components/admin/AddAdmin";
import AddDEO from "./../components/admin/AddDEO";

function RegisterStaff() {
  const [activeTab, setActiveTab] = useState("admin"); // Default active tab

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "admin":
        return <AddAdmin />;
      case "deo":
        return <AddDEO />;
      default:
        return <AddAdmin />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("admin")}
          className={`flex-1 p-3 rounded-md transition duration-300 ease-in-out border-2 border-blue-500 ${
            activeTab === "admin"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-500 hover:bg-blue-100"
          }`}
        >
          Register Admin
        </button>
        <button
          onClick={() => setActiveTab("deo")}
          className={`flex-1 p-3 rounded-md transition duration-300 ease-in-out border-2 border-blue-500 ${
            activeTab === "deo"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-500 hover:bg-blue-100"
          }`}
        >
          Register DEO
        </button>
      </div>

      {/* Render the active component */}
      <div>{renderActiveComponent()}</div>
    </div>
  );
}

export default RegisterStaff;
