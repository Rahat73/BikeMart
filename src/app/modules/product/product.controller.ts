import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { productValidationSchema } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodParsedData = productValidationSchema.parse(product);
    const result = await ProductService.createProductIntoDB(zodParsedData);

    res.status(200).json({
      status: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductsFromDB();

    res.status(200).json({
      status: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductByIDFromDB(productId);

    res.status(200).json({
      status: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const updateProductInfo = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedDoc = req.body;
    const zodParsedData = productValidationSchema.parse(updatedDoc);
    const result = await ProductService.updateProductInfoIntoDB(
      productId,
      zodParsedData,
    );

    res.status(200).json({
      status: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteProductFromDB(productId);

    res.status(200).json({
      status: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProductInfo,
  deleteProduct,
};
