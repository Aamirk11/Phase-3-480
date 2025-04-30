import { Router, Request, Response } from "express";
import { client } from "../../db/client";

export const getModels = async (req: Request, res: Response): Promise<void> => {
  const queryRes = await client.query("SELECT * FROM Model");
  res.json({ data: queryRes.rows });
};

export const insertCarModel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    model_id,
    car_id,
    color,
    construction_year,
    transmission,
    brand = null,
  } = req.body;

  const carExists = await client.query(
    "SELECT * FROM Car WHERE car_id = ($1)",
    [car_id]
  );
  if (carExists.rowCount === 0) {
    // insert a new car
    await client.query("INSERT INTO Car (car_id, brand) VALUES ($1, $2)", [
      car_id,
      brand,
    ]);
  }
  const queryRes = await client.query(
    "INSERT INTO Model (model_id, car_id, color, construction_year, transmission) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [model_id, car_id, color, construction_year, transmission]
  );
  res.status(201).json(queryRes.rows[0]);
};

export const deleteCarModel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await client.query("DELETE FROM Model WHERE model_id = ($1)", [
      req.params.modelId,
    ]);

    res.json({ message: "Model deleted!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const usedModelsInRents = async (req: Request, res: Response) => {
  const usedModelInRents = await client.query(
    `SELECT 
        c.brand,
        m.model_id, 
        m.color, 
        m.construction_year, 
        m.transmission, 
        COUNT(r.rent_id) as total_rent 
     FROM model AS m
     INNER JOIN car AS c ON m.car_id = c.car_id
     LEFT JOIN rent AS r ON m.model_id = r.model_id
     GROUP BY 
        c.brand,
        m.model_id, 
        m.color, 
        m.construction_year, 
        m.transmission;`
  );
  res.json({ data: usedModelInRents.rows });
};
