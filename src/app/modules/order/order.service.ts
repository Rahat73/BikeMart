import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
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
