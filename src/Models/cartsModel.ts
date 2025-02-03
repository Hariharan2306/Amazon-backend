import mongoose, { Document, Schema } from "mongoose";

export interface CartData {
  quantity: number;
  productId: number;
}

interface cartModel extends Document {
  userName: string;
  cartData: CartData[];
}

const cartSchema: Schema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    cartData: { type: Array },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<cartModel>("cartsModel", cartSchema, "carts");
