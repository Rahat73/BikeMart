import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { orderValidationSchema } from './order.validation';

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
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (email && typeof email !== 'string') {
      res.status(400).json({
        status: false,
        message: 'Invalid email',
        data: null,
      });
      return;
    }
    const result = await OrderService.getAllOrdersFromDB(email as string);

    if (result.length === 0) {
      res.status(400).json({
        status: false,
        message: 'Order not found',
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'Orders fetched successfully!',
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
  getAllOrders,
};
