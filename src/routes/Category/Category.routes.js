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

const routes = Router();

routes.post(
  '/categories',
  createCategoryValidator,
  new CreateCategoryController().handle
);

routes.delete(
  '/categories/:id',
  deleteCategoryValidator,
  new DeleteCategoryController().handle
);

routes.patch(
  '/categories/:id',
  updateCategoryValidator,
  new UpdateCategoryController().handle
);

routes.get(
  '/categories',
  findCategoriesValidator,
  new FindCategoriesController().handle
);

routes.get(
  '/category/:id',
  findCategoryValidator,
  new FindCategoryController().handle
);

export default routes;
