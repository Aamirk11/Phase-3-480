import { Request, Response } from "express";
import { client } from "../../db/client";

export const getCars = async (req: Request, res: Response): Promise<void> => {
  const queryRes = await client.query("SELECT * FROM Car");
  res.json({ data: queryRes.rows });
};

export const getCarsWithModels = async (req: Request, res: Response): Promise<void> => {
  const queryRes = await client.query(`
    SELECT * FROM Car as c
    JOIN Model m ON c.car_id = m.car_id
    `)

  res.json({ data: queryRes.rows });
}

export const insertNewCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { brand } = req.body;
  const queryRes = await client.query(
    "INSERT INTO Car (brand) VALUES ($1) RETURNING *",
    [brand]
  );

  res.send(queryRes.rows);
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  await client.query("DELETE FROM Car WHERE car_id = ($1)", [req.params.carId]);

  res.json({ message: "Car deleted!" });
};
