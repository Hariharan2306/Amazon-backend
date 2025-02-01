import { Router } from "express";
import productsRouter from "./productsRoute";

const indexRouter = Router();

indexRouter.use("/products", productsRouter);

export default indexRouter;
