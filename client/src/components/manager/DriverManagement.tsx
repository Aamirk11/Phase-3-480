import React, { useEffect, useState } from "react";
import { getDrivers, addDriver, deleteDriver, updateDriver } from "./api/managerApi";
import { Driver } from "../../types/types";

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [form, setForm] = useState<Driver>({
    name: "",
    road_name: "",
    number: "",
    city: "",
  });
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const { data: res } = await getDrivers();
    const newData: Driver[] = res.data.map((d: any) => ({
      id: d.driver_id,
      name: d.name,
      road_name: d.road_name,
      number: d.number,
      city: d.city,
    }));
    setDrivers(newData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateDriver(form.driver_id as number, form);
    } else {
      await addDriver(form);
    }
    setForm({ driver_id: 0, name: "", road_name: "", number: "", city: "" });
    setEditing(false);
    fetchDrivers();
  };

  const handleEdit = (driver: Driver) => {
    setForm(driver);
    setEditing(true);
  };

  const handleDelete = async (id: number) => {
    await deleteDriver(id);
    fetchDrivers();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{editing ? "Edit Driver" : "Add Driver"}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Road Name"
              name="road_name"
              value={form.road_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Number"
              name="number"
              value={form.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-auto">
            <button type="submit" className="btn btn-warning">
              {editing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      <h3>Driver List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Road</th>
            <th>Number</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driver_id}>
              <td>{driver.name}</td>
              <td>{driver.road_name}</td>
              <td>{driver.number}</td>
              <td>{driver.city}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(driver)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(driver.driver_id as number)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
