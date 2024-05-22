import { Model } from 'mongoose';

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
};

export type ProductMethods = {
  isProductAvailable(id: string, quantity: number): Promise<boolean | null>;
  updateProductInventory(id: string, quantity: number): Promise<boolean | null>;
};

export type ProductModel = Model<
  TProduct,
  Record<string, never>,
  ProductMethods
>;
