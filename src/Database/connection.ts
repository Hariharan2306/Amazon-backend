import mongoose from "mongoose";
import csvParser from "csv-parser";
import fs from "fs";
import get from "lodash/get";
import size from "lodash/size";
import isEmpty from "lodash/isEmpty";
import productsModels, { ProductData } from "../Models/productsModels";
const csvFilePath = "src/Configs/ecommerce_real_products.csv";

export const connectToDatabase = async () => {
  try {
    const url = process.env.DB_HOST || "";
    await mongoose.connect(url);
    if (process.env.SERVER_STARTUP === "true") await extractFromCsv();
    console.log("Database connection Success ");
  } catch (e) {
    console.log(`Failed while connecting database ${e}`);
    process.exit(1);
  }
};

const extractFromCsv = async () => {
  try {
    let productsBatch: ProductData[] = [];

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", async (row) => {
        productsBatch.push({
          productId: Number(get(row, "Product ID", 0)),
          productName: get(row, "Product Name", ""),
          productDescription: get(row, "Product Description", ""),
          category: get(row, "Category", ""),
          brand: get(row, "Brand", ""),
          costPrice: parseFloat(get(row, "Cost Price", "0")),
          sellingPrice: parseFloat(get(row, "Selling Price", "0")),
          discount: parseInt(get(row, "Discount (%)", 0)),
          stockQuantity: parseInt(get(row, "Stock Quantity", 0)),
          stockStatus: get(row, "Stock Status", ""),
          deliveryTime: get(row, "Delivery Time", ""),
          shippingCost: parseFloat(get(row, "Shipping Cost", "0")),
          freeShipping: get(row, "Free Shipping", ""),
          returnPolicy: get(row, "Return Policy", ""),
          specifications: get(row, "Specifications", ""),
          tags: get(row, "Tags/Keywords", ""),
          ratings: parseFloat(get(row, "Ratings", "0")),
          reviewsCount: parseInt(get(row, "Reviews Count", 0)),
          frequentlyBoughtTogether: get(row, "Frequently Bought Together", ""),
        });

        if (size(productsBatch) === 10) {
          await productsModels.insertMany(productsBatch);
          console.log("Working on Extracting CSV Data...");
          productsBatch = [];
        }
      });

    if (!isEmpty(productsBatch)) await productsModels.insertMany(productsBatch);
    console.log("CSV Extraction Complete");
  } catch (e) {
    console.log(`Failed while extracting data from CSV ${e}`);
    throw new Error(`Failed while extracting data from CSV ${e}`);
  }
};
