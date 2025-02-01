import mongoose, { Document, Schema } from "mongoose";

export interface ProductData {
  productId: number;
  productName: string;
  productDescription: string;
  category: string;
  brand: string;
  costPrice: number;
  sellingPrice: number;
  discount: number;
  stockQuantity: number;
  stockStatus: "In Stock" | "Out of Stock";
  deliveryTime: string;
  shippingCost: number;
  freeShipping: "Yes" | "No";
  returnPolicy: string;
  specifications: string;
  tags: string;
  ratings: number;
  reviewsCount: number;
  frequentlyBoughtTogether: string;
}

interface ProductModel extends ProductData, Document {}

const productSchema: Schema = new Schema(
  {
    productId: { type: Number, required: true, unique: true },
    productName: { type: String, required: true },
    productDescription: { type: String },
    category: { type: String, required: true },
    brand: { type: String },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stockQuantity: { type: Number, required: true },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      required: true,
    },
    deliveryTime: { type: String },
    shippingCost: { type: Number, default: 0 },
    freeShipping: { type: String, enum: ["Yes", "No"], default: "No" },
    returnPolicy: { type: String },
    specifications: { type: String },
    tags: { type: String },
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    frequentlyBoughtTogether: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<ProductModel>(
  "productsModel",
  productSchema,
  "products"
);
