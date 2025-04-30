import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DrivableModels from "./DrivableModels";
import DeclareDrivableModels from "./DeclareDrivableModels";
import UpdateAddress from "./UpdateAddress";

const DriverDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Driver Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <nav className="mb-4">
        <div className="nav nav-pills">
          <Link className="nav-link" to="/driver/models">
            View Car Models
          </Link>
          <Link className="nav-link" to="/driver/declare-models">
            Declare Drivable Models
          </Link>
          <Link className="nav-link" to="/driver/update-address">
            Update Address
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="models" element={<DrivableModels />} />
        <Route path="declare-models" element={<DeclareDrivableModels />} />
        <Route path="update-address" element={<UpdateAddress />} />
      </Routes>
    </div>
  );
};

export default DriverDashboard;
