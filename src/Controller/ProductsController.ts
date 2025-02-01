import { Request, Response } from "express";
import { getProductsService } from "../Service/productsService";

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const data = await getProductsService();
    res.status(200).send({ flag: "Success", data });
  } catch (e) {
    res.status(500).send({ flag: "Error", error: (e as Error).message });
  }
};
