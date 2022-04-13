import { Router } from 'express';
import {
  CreateCityController,
  FindCitiesController,
  DeleteCityController,
  UpdateCityController,
} from '../../data/controllers';
import {
  findCityValidator,
  createCityValidator,
  deleteCityValidator,
  updateCityValidator,
} from '../../data/validators';

const routes = Router();

// Body name, regionId
routes.post('/cities', createCityValidator, new CreateCityController().handle);

// Param :id && Body name
routes.delete(
  '/cities/:id',
  deleteCityValidator,
  new DeleteCityController().handle
);

// Param :id && Body name
routes.patch(
  '/cities/:id',
  updateCityValidator,
  new UpdateCityController().handle
);

// Query ?limit &&  ?page
routes.get('/cities', findCityValidator, new FindCitiesController().handle);

export default routes;
