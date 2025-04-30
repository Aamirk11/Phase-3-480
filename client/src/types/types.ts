export enum Roles {
  MANAGER = "manager",
  DRIVER = "driver",
  CLIENT = "client",
}

export interface Manager {
  ssn: string;
  name: string;
  email: string;
}

export interface Driver {
  driver_id?: number;
  name: string;
  road_name: string;
  number: string;
  city: string;
}

export interface Client {
  clientId: number;
  name: string;
  email: string;
}

export interface CarModel {
  car_id: number;
  brand: string;
  model_id: number;
  color: string;
  construction_year: number;
  transmission: string;
  total_rent?: number;
}

export interface GroupedCar {
  car_id: number;
  brand: string;
  color: string;
  construction_year: number;
  transmission: string;
  models: number[];
}