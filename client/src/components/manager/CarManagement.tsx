import React, { useEffect, useState } from 'react';
import {
  getCarsWithModels,
  addCarModel,
  deleteCar,
  deleteModel,
} from './api/managerApi';
import { CarModel, GroupedCar } from '../../types/types';

export default function CarManagement() {
  const [cars, setCars] = useState<GroupedCar[]>([]);
  const [form, setForm] = useState<CarModel>({
    car_id: 0,
    brand: '',
    model_id: 0,
    color: '',
    construction_year: new Date().getFullYear(),
    transmission: 'automatic',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getCarsWithModels();
    const grouped = groupByCarId(res.data.data as CarModel[]);
    setCars(grouped);
  };

  const groupByCarId = (data: CarModel[]): GroupedCar[] => {
    const map = new Map<number, GroupedCar>();

    data.forEach((car) => {
      const key = car.car_id;
      if (!map.has(key)) {
        map.set(key, {
          car_id: car.car_id,
          brand: car.brand,
          color: car.color,
          construction_year: car.construction_year,
          transmission: car.transmission,
          models: [car.model_id],
        });
      } else {
        map.get(key)?.models.push(car.model_id);
      }
    });

    return Array.from(map.values());
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'car_id' || name === 'model_id' || name === 'construction_year'
        ? Number(value)
        : value,
    });
  };

  const handleAdd = async () => {
    await addCarModel(form);
    fetchData();
    setForm({
      car_id: 0,
      brand: '',
      model_id: 0,
      color: '',
      construction_year: new Date().getFullYear(),
      transmission: 'automatic',
    });
  };

  const handleDeleteCar = async (car_id: number) => {
    await deleteCar(car_id);
    fetchData();
  };

  const handleDeleteModel = async (model_id: number) => {
    await deleteModel(model_id);
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h2>Car Management</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add Car / Model</h5>
          <div className="row g-2">
            {[
              { name: 'car_id', type: 'number' },
              { name: 'brand', type: 'text' },
              { name: 'model_id', type: 'number' },
              { name: 'color', type: 'text' },
              { name: 'construction_year', type: 'number' },
            ].map(({ name, type }) => (
              <div className="col-md-4" key={name}>
                <input
                  className="form-control"
                  name={name}
                  type={type}
                  value={(form as any)[name]}
                  onChange={handleInputChange}
                  placeholder={name.replace(/_/g, ' ').toUpperCase()}
                />
              </div>
            ))}
            <div className="col-md-4">
              <select
                className="form-control"
                name="transmission"
                value={form.transmission}
                onChange={handleInputChange}
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div className="col-12">
              <button className="btn btn-warning mt-2" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {cars.map((car) => (
        <div className="card mb-3" key={car.car_id}>
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between">
              {car.brand} (Car ID: {car.car_id})
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteCar(car.car_id)}
              >
                Delete Car
              </button>
            </h5>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Year:</strong> {car.construction_year}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <div>
              <strong>Models:</strong>
              <ul className="list-group list-group-flush">
                {car.models.map((modelId) => (
                  <li
                    key={modelId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    Model ID: {modelId}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteModel(modelId)}
                    >
                      Remove Model
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
