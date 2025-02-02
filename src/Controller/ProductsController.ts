import { Request, Response } from "express";
import {
  getProductsDetailsService,
  listProductsService,
} from "../Service/productsService";

export const getProductsDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { productName = "" } = req.params;
    const data = await getProductsDetailsService(productName);
    res.status(200).send({ flag: "Success", data });
  } catch (e) {
    res.status(500).send({ flag: "Error", error: (e as Error).message });
  }
};
export const listProductsController = async (req: Request, res: Response) => {
  try {
    const { search = "" } = req.params;
    const data = await listProductsService(search);
    res.status(200).send({ flag: "Success", data });
  } catch (e) {
    res.status(500).send({ flag: "Error", error: (e as Error).message });
  }
};
