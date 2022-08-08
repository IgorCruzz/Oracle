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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1];

const routes = Router();

routes.post(
  '/products',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createProductValidator,
  new CreateProductController().handle
);

routes.delete(
  '/products/:id_product',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteProductValidator,
  new DeleteProductController().handle
);

routes.patch(
  '/products/:id_product',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateProductValidator,
  new UpdateProductController().handle
);

routes.get(
  '/products',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findProductsValidator,
  new FindProductsController().handle
);

routes.get(
  '/product/:id_product',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findProductValidator,
  new FindProductController().handle
);

export default routes;
