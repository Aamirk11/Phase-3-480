import { Request, Response } from "express";
import { client } from "../../db/client";

export const getClientThatRentedFromC1ByDriverC2 = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { city1, city2 } = req.query;

  const clients = await client.query(
    `SELECT DISTINCT c.name, c.email
      FROM client c
      JOIN clientAddress ca ON c.client_id = ca.client_id
      JOIN address a1 ON ca.address_id = a1.address_id
      JOIN rent r ON c.client_id = r.client_id
      JOIN driver d ON r.driver_id = d.driver_id
      JOIN address a2 ON d.address_id = a2.address_id
      WHERE a1.city = $1
      AND a2.city = $2;`,
    [city1, city2]
  );
  res.status(200).json({ data: clients.rows });
};

export const getTopKClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  const topKClients = await client.query(
    `SELECT c.email, c.name, COUNT(c.client_id) as total_rent FROM Client as c 
        JOIN rent as r ON c.client_id = r.client_id
        GROUP BY c.email, c.name
        ORDER BY COUNT(c.client_id) DESC
        LIMIT $1;`,
    [req.params.topK]
  );

  res.status(200).json({ data: topKClients.rows });
};
