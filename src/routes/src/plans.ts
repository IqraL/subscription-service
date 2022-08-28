import express from "express";
import { getPlans } from "../../logic";
import { responseWrapper } from "../utils";
import {
  GetPlansRequest,
  WrapperResponse,
  GetPlansResponse,
} from "../../types";

const plansRouter = express.Router();

plansRouter.post(
  "/get-plans",
  async (
    req: GetPlansRequest,
    res: WrapperResponse<GetPlansResponse>
  ) => await responseWrapper(getPlans(req), res)
);

export { plansRouter };
