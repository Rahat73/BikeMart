import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const product = new Product();
  const product_available = await product.isProductAvailable(
    orderData.productId,
    orderData.quantity,
  );

  if (!product_available) {
    throw new Error('Insufficient quantity available in inventory');
  }

  const result = await Order.create(orderData);
  return result;
};

const getAllOrdersFromDB = async (email: string) => {
  const result = email ? await Order.find({ email }) : await Order.find();
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
