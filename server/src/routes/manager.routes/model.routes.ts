import { Router, Request, Response } from "express";
import { client } from "../../db/client";
import { catchAsync } from "../../utils/until";
import {
  deleteCarModel,
  getModels,
  insertCarModel,
  usedModelsInRents,
} from "../../controller/manager.controller/model.controller";

const router = Router();

router.get("/", catchAsync(getModels));
router.post("/", catchAsync(insertCarModel));
router.delete("/:modelId", catchAsync(deleteCarModel));
router.get("/usedModelsInRents", catchAsync(usedModelsInRents));

export default router;
