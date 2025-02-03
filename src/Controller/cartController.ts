import { Request, Response } from "express";
import {
  addCartService,
  deleteCartService,
  getCartDataService,
} from "../Service/cartService";

export const addCartController = async (req: Request, res: Response) => {
  try {
    const { productId = "", userName = "" } = req.body;
    await addCartService(userName, Number(productId));
    res.status(200).send({ flag: "Success", message: "Added Successfully" });
  } catch (e) {
    res.status(500).send({ flag: "Error", error: (e as Error).message });
  }
};
export const deleteCartController = async (req: Request, res: Response) => {
  try {
    const { productId = "" } = req.params;
    await deleteCartService(productId);
    res.status(200).send({ flag: "Success", message: "Deleted Successfully" });
  } catch (e) {
    res.status(500).send({ flag: "Error", error: (e as Error).message });
  }
};

export const getCartDataController = async (req: Request, res: Response) => {
  try {
    const { userName = "" } = req.params;
    const data = await getCartDataService(userName);
    res.status(200).send({ flag: "Success", data });
  } catch (e) {
    res.status(500).send({ flag: "Error", error: (e as Error).message });
  }
};
