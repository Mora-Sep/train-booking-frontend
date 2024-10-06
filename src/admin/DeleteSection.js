import { useEffect, useState } from "react";
import axios from "axios";
import AdminSection from "./../components/admin/AdminSection";
import Cookies from "js-cookie";

function DeleteSection() {
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const [routes, setRoutes] = useState([]);
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [models, setModels] = useState([]);
  const [activeSection, setActiveSection] = useState("routes"); // New state to track the active section

  function formatDuration(durationInMinutes) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const routesRes = await axios.get(`${baseUrl}/get/routes`);
        setRoutes(routesRes.data);

        const trainsRes = await axios.get(`${baseUrl}/get/trains`);
        setTrains(trainsRes.data);

        const stationsRes = await axios.get(`${baseUrl}/get/stations`);
        setStations(stationsRes.data);

        const modelsRes = await axios.get(`${baseUrl}/get/models`);
        setModels(modelsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`${baseUrl}/admin/${type}?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the state after deletion
      if (type === "route")
        setRoutes(routes.filter((route) => route.Route_ID !== id));
      if (type === "train")
        setTrains(trains.filter((train) => train.Number !== id));
      if (type === "station")
        setStations(stations.filter((station) => station.Code !== id));
      if (type === "model")
        setModels(models.filter((model) => model.Model_ID !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 text-slate-800">
      {/* Buttons to toggle sections */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`btn ${activeSection === "routes" ? "btn-info" : "btn-outline"}`}
          onClick={() => setActiveSection("routes")}
        >
          Routes
        </button>
        <button
          className={`btn ${activeSection === "trains" ? "btn-info" : "btn-outline"}`}
          onClick={() => setActiveSection("trains")}
        >
          Trains
        </button>
        <button
          className={`btn ${activeSection === "stations" ? "btn-info" : "btn-outline"}`}
          onClick={() => setActiveSection("stations")}
        >
          Stations
        </button>
        <button
          className={`btn ${activeSection === "models" ? "btn-info" : "btn-outline"}`}
          onClick={() => setActiveSection("models")}
        >
          Models
        </button>
      </div>

      {/* Conditionally render based on the active section */}
      {activeSection === "routes" && (
        <AdminSection
          title="Routes"
          items={routes.map((route) => ({
            ID: route.Route_ID,
            name: `${route.Origin} - ${route.Destination} (${formatDuration(route.Duration_Minutes)})`,
          }))}
          onDelete={(id) => handleDelete(id, "route")}
        />
      )}

      {activeSection === "trains" && (
        <AdminSection
          title="Trains"
          items={trains.map((train) => ({
            ID: train.Number,
            name: train.Name,
          }))}
          onDelete={(id) => handleDelete(id, "train")}
        />
      )}

      {activeSection === "stations" && (
        <AdminSection
          title="Stations"
          items={stations.map((station) => ({
            ID: station.Code,
            name: station.Name,
          }))}
          onDelete={(id) => handleDelete(id, "station")}
        />
      )}

      {activeSection === "models" && (
        <AdminSection
          title="Models"
          items={models.map((model) => ({
            ID: model.Model_ID,
            name: model.Name,
          }))}
          onDelete={(id) => handleDelete(id, "model")}
        />
      )}
    </div>
  );
}

export default DeleteSection;
