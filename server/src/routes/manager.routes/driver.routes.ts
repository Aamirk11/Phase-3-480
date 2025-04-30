import { Router, Request, Response } from "express";
import { client } from "../../db/client";
import {
  deleteDriver,
  driverWithRentingAvgReviews,
  getDriver,
  insertDriver,
  updateDriver
} from "../../controller/manager.controller/driver.controller";
import { catchAsync } from "../../utils/until";

const router = Router();

router.get("/", catchAsync(getDriver));
router.post("/", catchAsync(insertDriver));
router.put('/:driverId', catchAsync(updateDriver));
router.delete("/:driverId", catchAsync(deleteDriver));
router.get(
  "/driverTotalRentWithAvgReviews",
  catchAsync(driverWithRentingAvgReviews)
);

export default router;
