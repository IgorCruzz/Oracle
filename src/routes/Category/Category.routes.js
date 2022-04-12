import { Router } from 'express';
import {
  DeleteCategoryController,
  CreateCategoryController,
} from '../../data/controllers';
import {
  createCategoryValidator,
  deleteCategoryValidator,
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

export default routes;
