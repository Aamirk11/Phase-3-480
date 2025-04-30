import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NotFound from "./components/errors/_404";
import Dashboard from "./components/manager/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import CarManagement from "./components/manager/CarManagement";
import DriverManagement from "./components/manager/DriverManagement";
import TopClients from "./components/manager/TopClients";
import ModelRentsReport from "./components/manager/ModelRentsReport";
import DriverStats from "./components/manager/DriverStats";
import CityClientSearch from "./components/manager/CityClientSearch";
import RegisterManager from "./components/manager/RegisterManager";

import DriverDashboard from "./components/driver/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manager" element={<Dashboard />}>
            <Route path="cars" element={<CarManagement />} />
            <Route path="drivers" element={<DriverManagement />} />
            <Route path="top-clients" element={<TopClients />} />
            <Route path="model-rents" element={<ModelRentsReport />} />
            <Route path="driver-stats" element={<DriverStats />} />
            <Route path="city-client-search" element={<CityClientSearch />} />
            <Route path='register-manager' element={<RegisterManager/>}/>
          </Route>
          <Route path="/driver/*" element={<DriverDashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
