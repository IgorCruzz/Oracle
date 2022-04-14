import { Router } from 'express';
import {
  CreateCityController,
  FindCitiesController,
  DeleteCityController,
  UpdateCityController,
  FindCityController,
} from '../../data/controllers';
import {
  findCityValidator,
  createCityValidator,
  deleteCityValidator,
  updateCityValidator,
  findCitiesValidator,
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
routes.get('/cities', findCitiesValidator, new FindCitiesController().handle);

routes.get('/city/:id', findCityValidator, new FindCityController().handle);

export default routes;
