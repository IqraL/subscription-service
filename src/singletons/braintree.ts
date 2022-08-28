import braintree from "braintree";
import dotenv from "dotenv";
dotenv.config();

export class PaymentGatewayInit {
  static paymentGateway: braintree.BraintreeGateway;

  static setPaymentGateway(): braintree.BraintreeGateway {
    if (this.paymentGateway) {
      return this.paymentGateway;
    }

    this.paymentGateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox,
      merchantId: process.env.braintree_merchantId,
      publicKey: process.env.braintree_publicKey,
      privateKey: process.env.braintree_privateKey,
    });

    return this.paymentGateway;
  }

  static getPaymentGateway() {
    return this.setPaymentGateway();
  }
}
