import { Router } from "express";
import { catchAsync } from "../../utils/until";
import {
  deleteCar,
  getCars,
  insertNewCard,
  getCarsWithModels
} from "../../controller/manager.controller/car.controller";

const router = Router();

router.get("/", catchAsync(getCars));
router.get('/withModels', catchAsync(getCarsWithModels))
router.post("/", catchAsync(insertNewCard));
router.delete("/:carId", catchAsync(deleteCar));

export default router;
