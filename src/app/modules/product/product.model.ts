import { Schema, model, UpdateWriteOpResult } from 'mongoose';
import {
  ProductMethods,
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface';

const variantSchema = new Schema<TVariant>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const inventorySchema = new Schema<TInventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const productSchema = new Schema<TProduct, ProductModel, ProductMethods>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    variants: {
      type: [variantSchema],
      required: true,
    },
    inventory: {
      type: inventorySchema,
      required: true,
    },
  },
  { versionKey: false },
);

productSchema.index({ name: 'text' });

//checking the ordered quantity of product is available in inventory or not
//updating a product inventory after order is placed
productSchema.methods.isProductAvailable = async function (
  id: string,
  quantity: number,
) {
  const productToOrder = await Product.findOne({ _id: id });
  const productsInInventory: number = productToOrder?.inventory.quantity || 0;

  let updatedInfo: UpdateWriteOpResult;

  if (productsInInventory > quantity) {
    updatedInfo = await Product.updateOne(
      { _id: id },
      { $inc: { 'inventory.quantity': -quantity } },
    );
  } else if (productsInInventory === quantity) {
    updatedInfo = await Product.updateOne(
      { _id: id },
      {
        $set: {
          'inventory.quantity': 0,
          'inventory.inStock': false,
        },
      },
    );
  } else return false;

  if (updatedInfo.modifiedCount === 0) throw new Error('Something went wrong');

  return true;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
