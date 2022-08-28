import { paymentGateway } from "../../index";
import { GetPlansRequest, GetPlansResponse } from "../../types";

export const getPlans =
  (req: GetPlansRequest) => async (): GetPlansResponse => {
    const { plans } = await paymentGateway.plan.all();
    return plans;
  };
