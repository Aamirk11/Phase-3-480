import { Router } from "express";
import { catchAsync } from "../../utils/until";
import {
  getClientThatRentedFromC1ByDriverC2,
  getTopKClients,
} from "../../controller/manager.controller/client.controller";

const router = Router();

router.get(
  "/clientAddressFromC1AndDriverAddressFromC2",
  catchAsync(getClientThatRentedFromC1ByDriverC2)
);
router.get("/:topK", catchAsync(getTopKClients));

export default router;
