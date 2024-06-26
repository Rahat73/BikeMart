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
    const { searchTerm } = req.query;

    if (searchTerm && typeof searchTerm !== 'string') {
      res.status(400).json({
        status: false,
        message: 'Invalid search term',
        data: null,
      });
      return;
    }

    const result = await ProductService.getAllProductsFromDB(
      searchTerm as string,
    );

    if (result.length === 0) {
      res.status(400).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }

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

    if (result.matchedCount === 0) {
      res.status(400).json({
        status: false,
        message: 'Product not found',
        data: null,
      });
      return;
    }

    const updatedProduct = await ProductService.getProductByIDFromDB(productId);

    res.status(200).json({
      status: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
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

    if (result.deletedCount === 0) {
      res.status(400).json({
        status: false,
        message: 'Product not found',
        data: null,
      });
      return;
    }

    const deletedProduct = await ProductService.getProductByIDFromDB(productId);

    res.status(200).json({
      status: true,
      message: 'Product deleted successfully!',
      data: deletedProduct,
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
