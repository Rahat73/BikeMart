import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().trim().min(1, 'Type is required'),
  value: z.string().trim().min(1, 'Value is required'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().min(1, 'Description is required'),
  price: z.number().nonnegative(),
  category: z.string().trim().min(1, 'Category is required'),
  tags: z.array(z.string().trim().min(1, 'Tags is required')),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});
