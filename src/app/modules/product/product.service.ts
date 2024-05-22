import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getProductByIDFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  return result;
};

const updateProductInfoIntoDB = async (
  productId: string,
  updatedDoc: TProduct,
) => {
  const result = await Product.updateOne({ _id: productId }, updatedDoc);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIDFromDB,
  updateProductInfoIntoDB,
};
