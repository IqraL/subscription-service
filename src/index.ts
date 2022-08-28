import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { PaymentGatewayInit } from "./singletons";
import {
  customerRouter,
  paymentMethodRouter,
  subscriptionRouter,
  plansRouter,
} from "./routes";

dotenv.config();
const PORT = 3001;
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(customerRouter);
app.use(paymentMethodRouter);
app.use(subscriptionRouter);
app.use(plansRouter);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});

export const paymentGateway = PaymentGatewayInit.getPaymentGateway();

app.get("/ping", async (req, res) => {
  res.send({ msg: "pong" });
});
