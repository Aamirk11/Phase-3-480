import { useEffect, useState } from "react";
import { getModelRents } from "./api/managerApi";
import { CarModel } from "../../types/types";

export default function ModelRentsReport() {
  const [models, setModels] = useState<{ model: string; rents: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getModelRents();
        console.log(data);

        const newData: { model: string; rents: number }[] = [];
        data.data.map((d: CarModel) => {
          const model: string = `${d.brand} => ${d.color}, ${d.construction_year}, ${d.transmission}`;
          newData.push({ model, rents: d.total_rent as number });
        });
        setModels(newData);
      } catch (err) {
        console.error("Failed to fetch model rents", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Car Models Rent Report</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Model</th>
            <th>Number of Rents</th>
          </tr>
        </thead>
        <tbody>
          {models.map((item, index) => (
            <tr key={index}>
              <td>{item.model}</td>
              <td>{item.rents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
