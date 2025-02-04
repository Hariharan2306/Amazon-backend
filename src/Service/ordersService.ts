import { get } from "lodash";
import ordersModel from "../Models/ordersModel";
import cartsModel from "../Models/cartsModel";

export const getOrderDetailService = async (userName: string) => {
  try {
    const data = await ordersModel
      .findOne({ userName }, { _id: 0, orderData: 1 })
      .lean();

    return get(data, "orderData", []).filter(({ delivered }) => delivered);
  } catch (e) {
    console.log(`Failed while fetching Ordersdata ${e}`);
    throw new Error(`Failed while fetching Ordersdata ${e}`);
  }
};

export const placeOrderService = async (userName: string) => {
  try {
    const cartDetails = await cartsModel.aggregate([
      { $match: { userName } },
      { $unwind: "$cartData" },
      {
        $lookup: {
          from: "products",
          localField: "cartData.productId",
          foreignField: "productId",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          productId: "$cartData.productId",
          quantity: "$cartData.quantity",
          deliveryTime: "$productDetails.deliveryTime",
          sellingPrice: "$productDetails.sellingPrice",
          shippingCost: "$productDetails.shippingCost",
        },
      },
    ]);
    await ordersModel.findOneAndUpdate(
      { userName },
      { $push: { orderData: cartDetails } },
      { upsert: true, new: true }
    );
    await cartsModel.deleteOne({ userName });
  } catch (e) {
    console.log(`Failed while placing Order ${e}`);
    throw new Error(`Failed while placing Order ${e}`);
  }
};
