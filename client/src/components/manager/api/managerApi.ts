import axios from "axios";
import { CarModel, Driver, Manager } from "../../../types/types";

export const loginManager =  (data: { ssn: string }) => axios.post("/api/manager/auth/login", data);

export const registerManager = (data: Manager) => axios.post("/api/manager/auth/register", data);

export const getCarsWithModels = () => axios.get("/api/manager/car/withModels");

export const addCarModel = (data: CarModel) => axios.post("/api/manager/model", data);

export const deleteCar = (car_id: number) => axios.delete(`/api/manager/car/${car_id}`);

export const deleteModel = (model_id: number) => axios.delete(`/api/manager/model/${model_id}`);

export const getDrivers = () => axios.get('/api/manager/driver')

export const addDriver = (driver: Driver) => axios.post("/api/manager/driver", driver);

export const deleteDriver = (driverId: number) => axios.delete(`/api/manager/driver/${driverId}`);

export const updateDriver = (driverId: number, data: Driver) => axios.put(`/api/manager/driver/${driverId}`, data)

export const getTopKClients = (k: number) => axios.get(`/api/manager/client/${k}`);

export const getModelRents = () => axios.get('/api/manager/model/usedModelsInRents');

export const getDriverTotalRentWithAvgReviews = () => axios.get('/api/manager/driver/driverTotalRentWithAvgReviews');

export const getClientAddressFromC1AndDriverAddressFromC2 = (city1: string, city2: string) => 
    axios.get('/api/manager/client/clientAddressFromC1AndDriverAddressFromC2', {
      params: { city1, city2 }
    });
  