import { Request, Response } from "express";
import { client } from "../../db/client";

export const getDriver = async (req: Request, res: Response): Promise<void> => {
  const queryRes = await client.query(
    "SELECT * FROM Driver AS d JOIN Address a ON d.address_id = a.address_id"
  );
  res.json({ data: queryRes.rows });
};

export const insertDriver = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, road_name, number, city } = req.body;

  const driverExists = await client.query(
    "SELECT * FROM Driver WHERE name = ($1)",
    [name]
  );

  if (driverExists.rowCount !== 0) {
    res
      .status(400)
      .json({ message: "Driver with the same name already exists" });
    return;
  }

  const createAddress = await client.query(
    "INSERT INTO Address (road_name, number, city) VALUES ($1, $2, $3) RETURNING *",
    [road_name, number, city]
  );

  const insertDriver = await client.query(
    "INSERT INTO Driver (name, address_id) VALUES ($1, $2) RETURNING *",
    [name, createAddress.rows[0].address_id]
  );
  res.status(201).json(insertDriver.rows);
};

export const deleteDriver = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await client.query("DELETE FROM Driver WHERE driver_id = ($1)", [
      req.params.driverId,
    ]);

    res.json({ message: "Driver deleted!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const driverWithRentingAvgReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  const driverTotalRentWithAveReviews = await client.query(
    `SELECT d.name, COUNT(DISTINCT r.rent_id) as total_rent,  AVG(rw.driver_id) as avg_review from Driver as d
          LEFT JOIN rent as r ON d.driver_id = r.driver_id
          LEFT JOIN review as rw ON d.driver_id = rw.driver_id
          GROUP BY d.name`
  );

  res.status(200).json({ data: driverTotalRentWithAveReviews.rows });
};

export const updateDriver = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, road_name, number, city } = req.body;
  const driverId = parseInt(req.params.driverId);

  try {
    const result = await client.query(
      "SELECT address_id FROM Driver WHERE driver_id = $1",
      [driverId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Driver not found" });
      return;
    }

    const addressId = result.rows[0].address_id;

    await client.query(
      "UPDATE Driver SET name = $1 WHERE driver_id = $2",
      [name, driverId]
    );

    await client.query(
      `UPDATE Address 
       SET road_name = $1, number = $2, city = $3 
       WHERE address_id = $4`,
      [road_name, number, city, addressId]
    );

    res.status(200).json({ message: "Driver and address updated successfully" });

  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



