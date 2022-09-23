import { Router } from 'express';
import {
  DeleteCategoryController,
  CreateCategoryController,
  UpdateCategoryController,
  FindCategoriesController,
  FindCategoryController,
} from '../../data/controllers';
import {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
  findCategoriesValidator,
  findCategoryValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0];

const routes = Router();

routes.post(
  '/categories',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createCategoryValidator,
  new CreateCategoryController().handle
);

routes.delete(
  '/categories/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteCategoryValidator,
  new DeleteCategoryController().handle
);

routes.patch(
  '/categories/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateCategoryValidator,
  new UpdateCategoryController().handle
);

routes.get(
  '/categories',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findCategoriesValidator,
  new FindCategoriesController().handle
);

routes.get(
  '/category/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findCategoryValidator,
  new FindCategoryController().handle
);

export default routes;
