import productsModels from "../Models/productsModels";

export const getProductsDetailsService = async (productId: string) => {
  try {
    const data = await productsModels.findOne({ productId }, { _id: 0 }).lean();
    return data;
  } catch (e) {
    console.log(`Failed fetching products data ${e}`);
    throw new Error(`Failed fetching products data ${e}`);
  }
};

export const listProductsService = async (search: string) => {
  try {
    const match = {
      $match: {
        $or: [
          { productId: { $regex: search, $options: "i" } },
          { productName: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { tags: { $regex: search, $options: "i" } },
          { discount: { $regex: search, $options: "i" } },
          { costPrice: { $regex: search, $options: "i" } },
        ],
      },
    };
    const data = await productsModels.aggregate([
      match,
      { $project: { _id: 0, productName: 1, productId: 1 } },
      { $project: { label: "$productName", value: "$productId" } },
    ]);
    return data;
  } catch (e) {
    console.log(`Failed fetching products data ${e}`);
    throw new Error(`Failed fetching products data ${e}`);
  }
};
