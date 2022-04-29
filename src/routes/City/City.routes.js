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
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/cities',
  authenticator,
  createCityValidator,
  new CreateCityController().handle
);

routes.delete(
  '/cities/:id',
  authenticator,
  deleteCityValidator,
  new DeleteCityController().handle
);

routes.patch(
  '/cities/:id',
  authenticator,
  updateCityValidator,
  new UpdateCityController().handle
);

routes.get(
  '/cities',
  authenticator,
  findCitiesValidator,
  new FindCitiesController().handle
);

routes.get(
  '/city/:id',
  authenticator,
  findCityValidator,
  new FindCityController().handle
);

export default routes;
