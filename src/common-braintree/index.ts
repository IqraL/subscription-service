import { PaymentGatewayInit } from "../singletons";

export const braintreeGetCustomer = async (customerId: string) =>
  await PaymentGatewayInit.getPaymentGateway().customer.find(customerId);

export const braintreeClientToken = async (customerId?: string) => {
  const params = customerId ? { customerId } : {};

  const { clientToken, success } =
    await PaymentGatewayInit.getPaymentGateway().clientToken.generate(params);

  if (!success) {
    throw new Error(
      `Error getting token for payment ${
        customerId ? `customerId:${customerId}` : ``
      }`
    );
  }

  return clientToken;
};

export const braintreeAddPaymentMethod = async ({
  customerId,
  paymentMethodNonce,
}: {
  customerId: string;
  paymentMethodNonce: string;
}): Promise<braintree.Customer> => {
  const { customer, success } =
    await PaymentGatewayInit.getPaymentGateway().customer.update(customerId, {
      paymentMethodNonce,
    });

  if (!success) {
    throw new Error("Unable to add payment method");
  }
  return customer;
};
