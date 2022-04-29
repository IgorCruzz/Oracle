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
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/products',
  authenticator,
  createProductValidator,
  new CreateProductController().handle
);

routes.delete(
  '/products/:id_product',
  authenticator,
  deleteProductValidator,
  new DeleteProductController().handle
);

routes.patch(
  '/products/:id_product',
  authenticator,
  updateProductValidator,
  new UpdateProductController().handle
);

routes.get(
  '/products',
  authenticator,
  findProductsValidator,
  new FindProductsController().handle
);

routes.get(
  '/product/:id_product',
  authenticator,
  findProductValidator,
  new FindProductController().handle
);

export default routes;
