import { Router } from "express";
import {
  addCartController,
  deleteCartController,
  getCartDataController,
} from "../Controller/cartController";

const cartRouter = Router();

cartRouter.put("/add", addCartController);
cartRouter.delete("/remove", deleteCartController);
cartRouter.get("/get/:userName", getCartDataController);

export default cartRouter;
