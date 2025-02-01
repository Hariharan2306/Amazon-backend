import { Router } from "express";
import { getProductsController } from "../Controller/ProductsController";

const productsRouter = Router();

productsRouter.get("/data", getProductsController);

export default productsRouter;
