import { Router } from 'express';
import {
  DeleteCategoryController,
  CreateCategoryController,
  UpdateCategoryController,
} from '../../data/controllers';
import {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} from '../../data/validators';

const routes = Router();

routes.post(
  '/categories',
  createCategoryValidator,
  new CreateCategoryController().handle
);

routes.delete(
  '/categories/:name',
  deleteCategoryValidator,
  new DeleteCategoryController().handle
);

routes.put(
  '/categories/:id',
  updateCategoryValidator,
  new UpdateCategoryController().handle
);

export default routes;
