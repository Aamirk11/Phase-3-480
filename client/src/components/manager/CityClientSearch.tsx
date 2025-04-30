import { useState } from "react";
import { getClientAddressFromC1AndDriverAddressFromC2 } from "./api/managerApi";

export default function CityClientSearch() {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [clients, setClients] = useState<{ name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city1 || !city2) return;
    setLoading(true);
    try {
      const {data} = await getClientAddressFromC1AndDriverAddressFromC2(city1, city2);
      setClients(data.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Search Clients Between Two Cities</h4>
      <div className="row g-3 mb-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="City 1"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="City 2"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-warning w-100"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {clients.length > 0 && (
        <div>
          <h5>Matching Clients:</h5>
          <ul className="list-group">
            {clients.map((client, idx) => (
              <li key={idx} className="list-group-item">
                <strong>{client.name}</strong> - {client.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {clients.length === 0 && !loading && (
        <p>No matching clients found.</p>
      )}
    </div>
  );
}
