import { isEmpty } from "lodash";
import cartModel, { CartData } from "../Models/cartsModel";

export const addCartService = async (userName: string, productId: number) => {
  try {
    const data = await cartModel
      .findOne({ userName }, { _id: 0, cartData: 1 })
      .lean();

    const cartItem = data?.cartData.find(
      (item: CartData) => item.productId === productId
    );
    const quantity = cartItem ? cartItem.quantity + 1 : 1;

    await cartModel.findOneAndUpdate(
      { userName },
      { $push: { cartData: { productId, quantity } } },
      { upsert: true, new: true }
    );
  } catch (e) {
    console.log(`Failed adding products to cart ${e}`);
    throw new Error(`Failed adding products to cart ${e}`);
  }
};
export const deleteCartService = async (
  productId: number,
  userName: string
) => {
  try {
    const cartDetails = await cartModel.findOne(
      { userName },
      { _id: 0, cartData: 1 }
    );

    const updatedCart = cartDetails?.cartData.map((e) => {
      return productId === e.productId ? { ...e, quantity: e.quantity - 1 } : e;
    });
    const filterCart = updatedCart?.filter(
      ({ quantity }: CartData) => quantity > 0
    );
    if (isEmpty(filterCart)) return await cartModel.deleteOne({ userName });
    await cartModel.findOneAndUpdate({ userName }, { cartData: filterCart });
  } catch (e) {
    console.log(`Failed deleting products from cart ${e}`);
    throw new Error(`Failed deleting products from cart ${e}`);
  }
};

export const getCartDataService = async (userName: string) => {
  try {
    const cartDetails = await cartModel.aggregate([
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
          quantity: "$cartData.quantity",
          productId: "$cartData.productId",
          productName: "$productDetails.productName",
          sellingPrice: "$productDetails.sellingPrice",
          stockQuantity: "$productDetails.stockQuantity",
          stockStatus: "$productDetails.stockStatus",
          productDescription: "$productDetails.productDescription",
          freeShipping: "$productDetails.freeShipping",
        },
      },
    ]);

    return cartDetails;
  } catch (e) {
    console.log(`Failed fetching cart data ${e}`);
    throw new Error(`Failed fetching cart data ${e}`);
  }
};
