import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().trim().email(),
  productId: z.string().trim().min(1, 'Product ID is required'),
  price: z.number().nonnegative('Price must be a non-negative number'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});
