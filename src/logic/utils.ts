import {
  CreditCard,
  MasterpassCard,
  PaymentMethod,
  VisaCheckoutCard,
} from "braintree";

export const findPaymentMethodForCard = ({
  paymentMethods,
  match,
}: {
  paymentMethods: PaymentMethod[];
  match: {
    lastFour: string;
    expirationMonth: string;
    expirationYear: string;
    cardType: string;
  };
}): PaymentMethod | undefined => {
  return paymentMethods
    .filter(isCreditCardPaymentType)
    .find((paymentMethod) => {
      const { last4, expirationMonth, expirationYear, cardType } =
        paymentMethod;
      return (
        match.lastFour === last4 &&
        match.expirationMonth === expirationMonth &&
        match.expirationYear === expirationYear &&
        match.cardType === cardType
      );
    });
};

const isCreditCardPaymentType = (
  paymentMethod: PaymentMethod
): paymentMethod is CreditCard | MasterpassCard | VisaCheckoutCard =>
  !("sourceDescription" in paymentMethod);
