import { Request, Response } from "express";
import * as core from "express-serve-static-core";

import { SubscriptionCreateRequest } from "braintree";

export type GetCustomer = {
  customerId: string;
};
export type CreateCustomer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type UpdateCustomer = {
  customerId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type AddPaymentMethod = {
  customerId: string;
  paymentMethodNonce: string;
};

export type DeletePaymentMethod = {
  paymentMethodToken: string;
};

export type GetCustomerClientToken = {
  customerId: string;
};
export type PaymentMethodQueryDetails = {
  expirationMonth: string; //01
  expirationYear: string; //2025
  lastFour: string; //last four
  cardType: string;
};

export type CreateSubscription = {
  customerId: string;
  cardUsedForPayment: PaymentMethodQueryDetails;
} & SubscriptionCreateRequest;

export type UpdateSubscriptionPaymentMethod = {
  customerId: string;
  subscriptionId: string;
  newPaymentNonce: string;
  cardUsedForPayment: PaymentMethodQueryDetails;
};

export type CancelSubscription = {
  subscriptionId: string;
};

export type GetPlans = {};
/*
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
*/


type ExpressPostRequest<T> = Request<{}, {}, T, {}>;
type ExpressQueryRequest<T = {}> = Request<{}, {}, {}, T>;

/*
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
*/

export type GetCustomerRequest = ExpressPostRequest<GetCustomer>;

export type CreateCustomerRequest = ExpressPostRequest<CreateCustomer>;

export type UpdateCustomerRequest = ExpressPostRequest<UpdateCustomer>;

export type AddPaymentMethodRequest = ExpressPostRequest<AddPaymentMethod>;

export type DeletePaymentMethodRequest =
  ExpressPostRequest<DeletePaymentMethod>;

export type GetCustomerClientTokenRequest =
  ExpressPostRequest<GetCustomerClientToken>;

export type GetAnonClientTokenRequest = ExpressPostRequest<{}>;

export type CreateSubscriptionRequest = ExpressPostRequest<CreateSubscription>;

export type UpdateSubscriptionPaymentMethodRequest =
  ExpressPostRequest<UpdateSubscriptionPaymentMethod>;

export type CancelSubscriptionRequest = ExpressPostRequest<CancelSubscription>;

export type GetPlansRequest = ExpressPostRequest<GetPlans>;

/*
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
*/

export type GetCustomerResponse = Promise<braintree.Customer>;
export type CreateCustomerResponse = Promise<braintree.Customer>;
export type UpdateCustomerResponse = Promise<braintree.Customer>;

export type AddPaymentMethodResponse = Promise<braintree.Customer>;
export type DeletePaymentMethodResponse = Promise<void>;

export type GetCustomerClientTokenResponse = Promise<braintree.ClientToken>;
export type GetAnonClientTokenResponse = Promise<braintree.ClientToken>;

export type CreateSubscriptionResponse = Promise<braintree.Subscription>;
export type UpdateSubscriptionPaymentMethodResponse = Promise<void>;
export type CancelSubscriptionResponse = Promise<void>;

export type GetPlansResponse = Promise<braintree.Plan[]>;


/*
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
*/

export type SuccessResponseWrapper<T = null> = {
  success: true;
  error: false;
  data: T;
};

export type ErrorResponseWrapper<T = null> = {
  success: false;
  error: {
    message: string;
    stack?: string;
  };
  metaData?: T;
};

export type WrapperResponse<T = null> = Response<
  {},
  SuccessResponseWrapper<T> | ErrorResponseWrapper<T>
>;
