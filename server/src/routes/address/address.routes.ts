// import { Router } from "express";
// import { client } from "../../db/client";

// const router = Router();

// router.post("/", async (req, res) => {
//   const { road_name, number, city } = req.body;

//   if (!road_name || !number || !city) {
//     return res.status(400).json({ message: "Missing address fields." });
//   }

//   try {
//     const result = await client.query(
//       `INSERT INTO Address (road_name, number, city)
//        VALUES ($1, $2, $3)
//        RETURNING address_id`,
//       [road_name, number, city]
//     );

//     return res.status(201).json({ address_id: result.rows[0].address_id });
//   } catch (err) {
//     console.error("Insert address error:", err);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// });

// export default router;
