import mongoose, { Document, Schema } from "mongoose";

export interface orderData {
  productId: number;
  quantity: number;
  deliveryTime: string;
  sellingPrice: number;
  shippingCost: number;
  delivered: boolean;
}

interface ordersModel extends Document {
  userName: string;
  orders: orderData[];
}

const ordersSchema: Schema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    orders: { type: Array },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<ordersModel>(
  "ordersModel",
  ordersSchema,
  "orders"
);
