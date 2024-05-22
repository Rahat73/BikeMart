import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParsedData = orderValidationSchema.parse(order);
    const result = await OrderService.createOrderIntoDB(zodParsedData);

    res.status(200).json({
      status: true,
      message: 'Order created successfully!',
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

export const OrderController = {
  createOrder,
};
