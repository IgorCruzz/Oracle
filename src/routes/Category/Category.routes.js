import { Router } from 'express';
import { CreateCategoryController } from '../../data/controllers';
import { createCategoryValidator } from '../../data/validators';

const routes = Router();

routes.post(
  '/categories',
  createCategoryValidator,
  new CreateCategoryController().handle
);

export default routes;
