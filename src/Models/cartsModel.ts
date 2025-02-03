import mongoose, { Document, Schema } from "mongoose";

export interface CartData {
  quantity: number;
  productId: number;
}

interface cartModel extends Document {
  cartId: number;
  userName: string;
  cartData: CartData[];
}

const cartSchema: Schema = new Schema(
  {
    cartId: { type: Number, required: true, unique: true },
    cartData: { type: Array },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<cartModel>("cartsModel", cartSchema, "carts");
