import { Router } from 'express';
import {
  FindProductController,
  FindProductsController,
  CreateProductController,
  DeleteProductController,
  UpdateProductController,
} from '../../data/controllers';
import {
  findProductValidator,
  findProductsValidator,
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from '../../data/validators';

const routes = Router();

routes.post(
  '/products',
  createProductValidator,
  new CreateProductController().handle
);

routes.delete(
  '/products/:id_product',
  deleteProductValidator,
  new DeleteProductController().handle
);

routes.patch(
  '/products/:id_product',
  updateProductValidator,
  new UpdateProductController().handle
);

routes.get(
  '/products',
  findProductsValidator,
  new FindProductsController().handle
);

routes.get(
  '/product/:id_product',
  findProductValidator,
  new FindProductController().handle
);

export default routes;
