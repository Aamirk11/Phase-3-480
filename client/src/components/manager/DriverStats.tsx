import React, { useEffect, useState } from "react";
import { getDriverTotalRentWithAvgReviews } from "./api/managerApi";

export default function DriverStats() {
  const [stats, setStats] = useState<
    { name: string; totalRents: number; averageRating: number | null }[]
  >([]);

  useEffect(() => {
    const fetchDriverStats = async () => {
      try {
        const {data} = await getDriverTotalRentWithAvgReviews();
        const cleanedData = data.data.map((driver: any) => ({
          name: driver.name,
          totalRents: parseInt(driver.total_rent),
          averageRating: driver.avg_review !== null ? parseFloat(driver.avg_review) : null,
        }));
        setStats(cleanedData);
      } catch (err) {
        console.error("Error fetching driver stats:", err);
      }
    };

    fetchDriverStats();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Driver Statistics</h3>
      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Total Rents</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((driver, index) => (
            <tr key={index}>
              <td>{driver.name}</td>
              <td>{driver.totalRents}</td>
              <td>{driver.averageRating !== null ? driver.averageRating.toFixed(2) : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
