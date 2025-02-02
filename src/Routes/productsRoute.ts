import { Router } from "express";
import {
  getProductsDetailsController,
  listProductsController,
} from "../Controller/ProductsController";

const productsRouter = Router();

productsRouter.get("/data/:productName", getProductsDetailsController);
productsRouter.get("/productNames/:search", listProductsController);

export default productsRouter;
