import express, { Request, Response, NextFunction } from "express";
import managerRoutes from "./routes/manager.routes/manager.routes";
import managerCarRoutes from "./routes/manager.routes/car.routes";
import managerModelRoutes from "./routes/manager.routes/model.routes";
import managerDriverRoutes from "./routes/manager.routes/driver.routes";
import managerClientRoutes from "./routes/manager.routes/client.routes";

import driveRoutes from "./routes/driver/driver.routes";
// import addressRoutes from "./routes/address/address.routes";

const app = express();

app.use(express.json());

// manager 
app.use("/api/manager/auth", managerRoutes);
app.use("/api/manager/car", managerCarRoutes);
app.use("/api/manager/model", managerModelRoutes);
app.use("/api/manager/driver", managerDriverRoutes);
app.use("/api/manager/client", managerClientRoutes);

//driver
app.use("/api/driver", driveRoutes)
// app.use("/api/address", addressRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error!" });
});

app.listen(4989, () => console.log("Server is running on 4989"));
