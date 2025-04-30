import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CarManagement from "./CarManagement";
import DriverManagement from "./DriverManagement";
import TopClients from "./TopClients";
import ModelRentsReport from "./ModelRentsReport";
import DriverStats from "./DriverStats";
import CityClientSearch from "./CityClientSearch";
import RegisterManager from "./RegisterManager";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manager Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <nav className="mb-4">
        <div className="nav nav-pills">
          <Link className="nav-link" to="/manager/register-manager">
            Register New Manager
          </Link>
          <Link className="nav-link" to="/manager/cars">
            Manage Cars
          </Link>
          <Link className="nav-link" to="/manager/drivers">
            Manage Drivers
          </Link>
          <Link className="nav-link" to="/manager/top-clients">
            Top Clients
          </Link>
          <Link className="nav-link" to="/manager/model-rents">
            Model Rents Report
          </Link>
          <Link className="nav-link" to="/manager/driver-stats">
            Driver Stats
          </Link>
          <Link className="nav-link" to="/manager/city-client-search">
            City-Client Query
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="cars" element={<CarManagement />} />
        <Route path="drivers" element={<DriverManagement />} />
        <Route path="top-clients" element={<TopClients />} />
        <Route path="model-rents" element={<ModelRentsReport />} />
        <Route path="driver-stats" element={<DriverStats />} />
        <Route path="city-client-search" element={<CityClientSearch />} />
        <Route path="register-manager" element={<RegisterManager />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
