import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  GetCustomerRequest,
  GetCustomerResponse,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
} from "../../types";
import { braintreeGetCustomer } from "../../common-braintree";
import { paymentGateway } from "../../index";

export const getCustomer =
  (req: GetCustomerRequest) => async (): GetCustomerResponse => {
    const { customerId } = req.body;
    const customer = await braintreeGetCustomer(customerId);
    return customer;
  };

export const createCustomer =
  (req: CreateCustomerRequest) => async (): CreateCustomerResponse => {
    const { id, email, firstName, lastName } = req.body;
    const { customer, success } = await paymentGateway.customer.create({
      id,
      email,
      firstName,
      lastName,
    });

    if (!success) {
      throw new Error("Unable to create customer");
    }

    return customer;
  };

export const updateCustomer =
  (req: UpdateCustomerRequest) => async (): UpdateCustomerResponse => {
    const { customerId, email, firstName, lastName } = req.body;
    const {
      email: currentEmail,
      firstName: currentFirstName,
      lastName: currentLastName,
    } = await braintreeGetCustomer(customerId);

    const { customer, success } = await paymentGateway.customer.update(
      customerId,
      {
        email: email ?? currentEmail,
        firstName: firstName ?? currentFirstName,
        lastName: lastName ?? currentLastName,
      }
    );

    if (!success) {
      throw new Error("Unable to update customer");
    }

    return customer;
  };
