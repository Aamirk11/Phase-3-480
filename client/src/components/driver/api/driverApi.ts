import axios from "axios";
import { Driver, CarModel } from "../../../types/types";

// Đăng nhập tài xế
export const loginDriver = (data: { name: string }) => 
    axios.post<Driver>("/api/driver/auth/login", data);

// Lấy danh sách model xe hiện có
export const getAllModels = () =>
  axios.get<CarModel[]>("/api/driver/models");

// Gửi danh sách các model mà tài xế có thể lái
export const declareDrivableModels = (
  driverId: number,
  models: { model_id: number; car_id: number }[]
) =>
  axios.post(`/api/driver/${driverId}/models`, { models });

// Cập nhật địa chỉ tài xế
export const updateDriverAddress = (driverId: number, address_id: number) =>
  axios.put(`/api/driver/${driverId}/address`, { address_id });
