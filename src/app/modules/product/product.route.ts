import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);

export const ProductRoutes = router;
