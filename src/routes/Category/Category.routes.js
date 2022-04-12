import { Router } from 'express';
import {
  DeleteCategoryController,
  CreateCategoryController,
  UpdateCategoryController,
  FindCategoriesController,
} from '../../data/controllers';
import {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
  findCategoriesValidator,
} from '../../data/validators';

const routes = Router();

// Body name
routes.post(
  '/categories',
  createCategoryValidator,
  new CreateCategoryController().handle
);

// Param :id && Body name
routes.delete(
  '/categories/:id',
  deleteCategoryValidator,
  new DeleteCategoryController().handle
);

// Param :id && Body name
routes.put(
  '/categories/:id',
  updateCategoryValidator,
  new UpdateCategoryController().handle
);

// Query ?limit &&  ?page
routes.get(
  '/categories',
  findCategoriesValidator,
  new FindCategoriesController().handle
);

export default routes;
