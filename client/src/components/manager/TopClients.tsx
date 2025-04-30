import React, { useState } from "react";
import { getTopKClients } from "./api/managerApi";

export default function TopClients() {
  const [k, setK] = useState<number>(0);
  const [clients, setClients] = useState<{ name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTopClients = async () => {
    setLoading(true);
    try {
      const {data} = await getTopKClients(k);
      setClients(data.data);
    } catch (err) {
      console.error("Failed to fetch top clients", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Top {k || ""} Clients by Rent Count</h3>

      <div className="input-group mb-3">
        <input
          // type="number"
          className="form-control"
          placeholder="Enter number k"
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
        />
        <button className="btn btn-warning" onClick={fetchTopClients}>
          Get Top Clients
        </button>
      </div>

      {loading ? (
        <div className="text-muted">Loading...</div>
      ) : (
        <ul className="list-group">
          {clients.map((client, index) => (
            <li className="list-group-item" key={index}>
              <strong>{client.name}</strong> — {client.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
