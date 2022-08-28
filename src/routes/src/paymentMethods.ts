import express from "express";
import {
  addPaymentMethod,
  deletePaymentMethod,
  getAnonClientToken,
  getCustomerClientToken,
} from "../../logic/src/paymentMethods";
import {
  AddPaymentMethodRequest,
  AddPaymentMethodResponse,
  DeletePaymentMethodRequest,
  DeletePaymentMethodResponse,
  GetAnonClientTokenRequest,
  GetAnonClientTokenResponse,
  GetCustomerClientTokenRequest,
  GetCustomerClientTokenResponse,
  WrapperResponse,
} from "../../types";
import { responseWrapper } from "../utils";
const paymentMethodRouter = express.Router();

paymentMethodRouter.post(
  "/add-payment-method",
  async (
    req: AddPaymentMethodRequest,
    res: WrapperResponse<AddPaymentMethodResponse>
  ) => await responseWrapper(addPaymentMethod(req), res)
);

paymentMethodRouter.post(
  "/delete-payment-method",
  async (
    req: DeletePaymentMethodRequest,
    res: WrapperResponse<DeletePaymentMethodResponse>
  ) => await responseWrapper(deletePaymentMethod(req), res)
);

paymentMethodRouter.post(
  "/get-customer-clientToken-token",
  async (
    req: GetCustomerClientTokenRequest,
    res: WrapperResponse<GetCustomerClientTokenResponse>
  ) => await responseWrapper(getCustomerClientToken(req), res)
);

paymentMethodRouter.post(
  "/get-anon-clientToken-token",
  async (
    req: GetAnonClientTokenRequest,
    res: WrapperResponse<GetAnonClientTokenResponse>
  ) => await responseWrapper(getAnonClientToken(req), res)
);

export { paymentMethodRouter };
