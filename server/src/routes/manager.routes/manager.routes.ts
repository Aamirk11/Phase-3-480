import { Router} from "express";
import {
  login,
  registerManger,
} from "../../controller/manager.controller/auth.controller";
import { catchAsync } from "../../utils/until";

const router = Router();

router.post("/register", catchAsync(registerManger));
router.post("/login", catchAsync(login));

export default router;
