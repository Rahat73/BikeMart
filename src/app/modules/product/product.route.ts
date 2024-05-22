import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.post('/products', ProductController.createProduct);

router.get('/products', ProductController.getAllProducts);

router.get('/products/:productId', ProductController.getProductByID);

router.put('/products/:productId', ProductController.updateProductInfo);

router.delete('/products/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
