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

routes.post('/cities', createCityValidator, new CreateCityController().handle);

routes.delete(
  '/cities/:id',
  deleteCityValidator,
  new DeleteCityController().handle
);

routes.patch(
  '/cities/:id',
  updateCityValidator,
  new UpdateCityController().handle
);

routes.get('/cities', findCitiesValidator, new FindCitiesController().handle);

routes.get('/city/:id', findCityValidator, new FindCityController().handle);

export default routes;
