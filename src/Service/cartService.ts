import cartModel, { CartData } from "../Models/cartsModel";
import productsModels from "../Models/productsModels";

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
    console.log(`Failed fetching products data ${e}`);
    throw new Error(`Failed fetching products data ${e}`);
  }
};
export const deleteCartService = async (productId: string) => {
  try {
    await cartModel.deleteOne({ productId });
  } catch (e) {
    console.log(`Failed fetching products data ${e}`);
    throw new Error(`Failed fetching products data ${e}`);
  }
};

export const getCartDataService = async (userName: string) => {
  try {
    const data = await cartModel.findOne({ userName }, { _id: 0, cartData: 1 });
    if (!data) return [];
    const { cartData } = data;
    const cartDetails = await Promise.all(
      cartData.map(({ quantity, productId }: CartData) => {
        const productDetails = productsModels
          .findOne(
            { productId },
            {
              _id: 0,
              productName: 1,
              sellingPrice: 1,
              stockQuantity: 1,
              stockStatus: 1,
              productDescription: 1,
              freeShipping: 1,
            }
          )
          .lean();
        return { ...productDetails, quantity };
      })
    );
    return cartDetails;
  } catch (e) {
    console.log(`Failed fetching products data ${e}`);
    throw new Error(`Failed fetching products data ${e}`);
  }
};
