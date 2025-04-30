import { Router, Request, Response } from "express";
import { client } from "../../db/client";

export const registerManger = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, ssn, email } = req.body;

  const managerExists = await client.query(
    "SELECT * FROM Manager WHERE email = ($1)",
    [email]
  );
  if (managerExists.rowCount === 0) {
    res.status(400).json({
      message: "You can not register a manager with duplicate email",
    });
  }

  const result = await client.query(
    "INSERT INTO Manager (name, ssn, email) VALUES ($1, $2, $3) RETURNING *",
    [name, ssn, email]
  );

  res.status(201).json(result.rows[0]);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { ssn } = req.body;

  const manager = await client.query("SELECT * FROM Manager WHERE ssn = $1", [
    ssn,
  ]);

  if (manager.rows.length === 0) {
    res.status(401).json({ message: "No Manager found" });
    return;
  }

  res.status(200).json(manager.rows);
};
