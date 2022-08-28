import express from "express";
import {
  cancelSubscription,
  createSubscription,
  updateSubscriptionPaymentMethod,
} from "../../logic";
import {
  CancelSubscriptionRequest,
  CancelSubscriptionResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  UpdateSubscriptionPaymentMethodRequest,
  UpdateSubscriptionPaymentMethodResponse,
  WrapperResponse,
} from "../../types";
import { responseWrapper } from "../utils";

const subscriptionRouter = express.Router();

subscriptionRouter.post(
  "/create-subscription",
  async (
    req: CreateSubscriptionRequest,
    res: WrapperResponse<CreateSubscriptionResponse>
  ) => await responseWrapper(createSubscription(req), res)
);

subscriptionRouter.post(
  "/update-subscription-payment",
  async (
    req: UpdateSubscriptionPaymentMethodRequest,
    res: WrapperResponse<UpdateSubscriptionPaymentMethodResponse>
  ) => await responseWrapper(updateSubscriptionPaymentMethod(req), res)
);

subscriptionRouter.post(
  "/cancel-subscription",
  async (
    req: CancelSubscriptionRequest,
    res: WrapperResponse<CancelSubscriptionResponse>
  ) => await responseWrapper(cancelSubscription(req), res)
);

export { subscriptionRouter };
