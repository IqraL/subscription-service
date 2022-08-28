import express from "express";
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  GetCustomerRequest,
  GetCustomerResponse,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
  WrapperResponse,
} from "../../types";
import { createCustomer, getCustomer, updateCustomer } from "../../logic";
import { responseWrapper } from "../utils";

const customerRouter = express.Router();

customerRouter.post(
  "/get-customer",
  async (req: GetCustomerRequest, res: WrapperResponse<GetCustomerResponse>) =>
    await responseWrapper(getCustomer(req), res)
);

customerRouter.post(
  "/create-customer",
  async (
    req: CreateCustomerRequest,
    res: WrapperResponse<CreateCustomerResponse>
  ) => await responseWrapper(createCustomer(req), res)
);

customerRouter.post(
  "/update-customer",
  async (
    req: UpdateCustomerRequest,
    res: WrapperResponse<UpdateCustomerResponse>
  ) => await responseWrapper(updateCustomer(req), res)
);

export { customerRouter };
