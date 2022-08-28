import { braintreeAddPaymentMethod } from "../../common-braintree";
import { paymentGateway } from "../../index";
import {
  CancelSubscriptionRequest,
  CancelSubscriptionResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  UpdateSubscriptionPaymentMethodRequest,
  UpdateSubscriptionPaymentMethodResponse,
} from "../../types";
import { findPaymentMethodForCard } from "../utils";

export const createSubscription =
  (req: CreateSubscriptionRequest) => async (): CreateSubscriptionResponse => {
    const { planId, paymentMethodNonce, customerId, cardUsedForPayment } =
      req.body;

    const customer = await braintreeAddPaymentMethod({
      customerId,
      paymentMethodNonce,
    });

    const customerPaymentMethod = findPaymentMethodForCard({
      paymentMethods: customer.paymentMethods,
      match: cardUsedForPayment,
    });

    if (!customerPaymentMethod) {
      throw new Error("Create new subscription: payment method not founds");
    }

    const { subscription, success } = await paymentGateway.subscription.create({
      planId,
      paymentMethodToken: customerPaymentMethod.token,
    });

    if (!success) {
      throw Error("error creating subscription ");
    }

    return subscription;
  };

export const updateSubscriptionPaymentMethod =
  (req: UpdateSubscriptionPaymentMethodRequest) =>
  async (): UpdateSubscriptionPaymentMethodResponse => {
    const { customerId, subscriptionId, newPaymentNonce, cardUsedForPayment } =
      req.body;

    const customer = await braintreeAddPaymentMethod({
      customerId,
      paymentMethodNonce: newPaymentNonce,
    });

    const newPaymentMethod = findPaymentMethodForCard({
      paymentMethods: customer.paymentMethods,
      match: cardUsedForPayment,
    });

    if (!newPaymentMethod) {
      throw new Error("Unable to update you card");
    }

    const { planId: currentPlanId } = await paymentGateway.subscription.find(
      subscriptionId
    );
    
    const { token: newPaymentMethodToken } = newPaymentMethod;

    const { success } = await paymentGateway.subscription.update(
      subscriptionId,
      {
        paymentMethodToken: newPaymentMethodToken,
        planId: currentPlanId,
      }
    );
    if (!success) {
      throw new Error("unable to update subscription payment method");
    }
  };

export const cancelSubscription =
  (req: CancelSubscriptionRequest) => async (): CancelSubscriptionResponse => {
    const { subscriptionId } = req.body;
    await paymentGateway.subscription.cancel(subscriptionId);
  };
