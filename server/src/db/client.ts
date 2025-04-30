import { Client } from "pg";

export const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "taxi_rental",
  // password: "password",
  password: "password",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => console.error("Connection error", err.stack));


