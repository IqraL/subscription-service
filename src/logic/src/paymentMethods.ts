import {
  AddPaymentMethodRequest,
  AddPaymentMethodResponse,
  DeletePaymentMethodRequest,
  DeletePaymentMethodResponse,
  GetAnonClientTokenRequest,
  GetAnonClientTokenResponse,
  GetCustomerClientTokenRequest,
  GetCustomerClientTokenResponse,
} from "../../types";
import { paymentGateway } from "../../index";
import {
  braintreeAddPaymentMethod,
  braintreeClientToken,
} from "../../common-braintree";

export const addPaymentMethod =
  (req: AddPaymentMethodRequest) => async (): AddPaymentMethodResponse => {
    const { customerId, paymentMethodNonce } = req.body;
    const customer = await braintreeAddPaymentMethod({
      customerId,
      paymentMethodNonce,
    });
    return customer;
  };

export const deletePaymentMethod =
  (req: DeletePaymentMethodRequest) =>
  async (): DeletePaymentMethodResponse => {
    const { paymentMethodToken } = req.body;
    await paymentGateway.paymentMethod.delete(paymentMethodToken);
  };

export const getCustomerClientToken =
  (req: GetCustomerClientTokenRequest) =>
  async (): GetCustomerClientTokenResponse => ({
    clientToken: await braintreeClientToken(req.body.customerId),
  });

export const getAnonClientToken =
  (req: GetAnonClientTokenRequest) => async (): GetAnonClientTokenResponse => ({
    clientToken: await braintreeClientToken(),
  });
