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

const routes = Router();

routes.post(
  '/categories',
  authenticator,
  createCategoryValidator,
  new CreateCategoryController().handle
);

routes.delete(
  '/categories/:id',
  authenticator,
  deleteCategoryValidator,
  new DeleteCategoryController().handle
);

routes.patch(
  '/categories/:id',
  authenticator,
  updateCategoryValidator,
  new UpdateCategoryController().handle
);

routes.get(
  '/categories',
  authenticator,
  findCategoriesValidator,
  new FindCategoriesController().handle
);

routes.get(
  '/category/:id',
  authenticator,
  findCategoryValidator,
  new FindCategoryController().handle
);

export default routes;
