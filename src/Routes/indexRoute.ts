import { Router } from "express";
import productsRouter from "./productsRoute";
import cartRouter from "./cartRoutes";

const indexRouter = Router();

indexRouter.use("/products", productsRouter);
indexRouter.use("/cart", cartRouter);
indexRouter.use("/orders", cartRouter);

export default indexRouter;
