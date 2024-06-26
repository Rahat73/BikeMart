import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string) => {
  const result = searchTerm
    ? await Product.find({ $text: { $search: searchTerm } })
    : await Product.find();
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

const deleteProductFromDB = async (productId: string) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIDFromDB,
  updateProductInfoIntoDB,
  deleteProductFromDB,
};
