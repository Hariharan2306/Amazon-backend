import productsModels from "../Models/productsModels";

export const getProductsService = async () => {
  try {
    const data = await productsModels.find({}, { _id: 0 }).lean();
    return data;
  } catch (e) {
    console.log(`Failed fetching products data ${e}`);
    throw new Error(`Failed fetching products data ${e}`);
  }
};
