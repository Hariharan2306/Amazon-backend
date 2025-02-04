import { Request, Response } from "express";
import {
  getOrderDetailService,
  placeOrderService,
} from "../Service/ordersService";

export const getOrderDataController = async (req: Request, res: Response) => {
  try {
    const { userName = "" } = req.params;
    const data = await getOrderDetailService(userName);
    res.status(200).send({ flag: "Success", data });
  } catch (e) {
    res.status(500).send({ flag: "Error", error: (e as Error).message });
  }
};

export const placeOrderController = async (req: Request, res: Response) => {
  try {
    const { userName = "" } = req.params;
    const data = await placeOrderService(userName);
    res.status(200).send({ flag: "Success", data });
  } catch (e) {
    res.status(500).send({ flag: "Error", error: (e as Error).message });
  }
};
