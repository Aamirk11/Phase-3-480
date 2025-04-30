import { Request, Response } from "express";
import {client} from '../../db/client'

export const loginDriver = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
  
    try {
      const result = await client.query("SELECT * FROM Driver WHERE name = $1", [name]);
  
      if (result.rows.length === 0) {
        res.status(401).json({ message: "No driver found with this name" });
        return;
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error logging in driver:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const updateDriverAddress = async (req: Request, res: Response) => {
    const driverId = parseInt(req.params.id);
    const { road_name, number, city } = req.body;
  
    if (!road_name || !number || !city) {
      return res.status(400).json({ message: "Missing address fields" });
    }
  
    try {
      const addressResult = await client.query(
        `INSERT INTO Address (road_name, number, city)
         VALUES ($1, $2, $3)
         RETURNING address_id`,
        [road_name, number, city]
      );
  
      const addressId = addressResult.rows[0].address_id;
  
      await client.query(
        `UPDATE Driver SET address_id = $1 WHERE driver_id = $2`,
        [addressId, driverId]
      );
  
      res.status(200).json({ message: "Address updated successfully", address_id: addressId });
    } catch (error) {
      console.error("Failed to update address:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
export const getAllModels = async (_: Request, res: Response) => {
try {
  const result = await client.query(`
    SELECT m.model_id, m.car_id, m.color, m.construction_year, m.transmission, c.brand
    FROM Model m
    JOIN Car c ON m.car_id = c.car_id
  `);
    res.json(result.rows);
} catch (error) {
    res.status(500).json({ error });
}
};

export const declareDrivableModels = async (req: Request, res: Response) => {
const driverId = parseInt(req.params.id);
const models = req.body.models; // [{ model_id: 1, car_id: 2 }, ...]
try {
    for (const m of models) {
    await client.query(
        'INSERT INTO DriverCanDriveModel(driver_id, model_id, car_id) VALUES ($1, $2, $3)',
        [driverId, m.model_id, m.car_id]
    );
    }
    res.json({ message: 'Drivable models updated' });
} catch (error) {
    res.status(500).json({ error });
}
};