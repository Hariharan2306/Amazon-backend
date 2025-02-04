import { Router } from "express";
import {
  getOrderDataController,
  placeOrderController,
} from "../Controller/ordersController";

const ordersRouter = Router();

ordersRouter.get("/get/:userName", getOrderDataController);
ordersRouter.get("/place-order/:userName", placeOrderController);

export default ordersRouter;
