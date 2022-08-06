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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2, 3, 4];

const routes = Router();

routes.post(
  '/cities',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createCityValidator,
  new CreateCityController().handle
);

routes.delete(
  '/cities/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteCityValidator,
  new DeleteCityController().handle
);

routes.patch(
  '/cities/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateCityValidator,
  new UpdateCityController().handle
);

routes.get(
  '/cities',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findCitiesValidator,
  new FindCitiesController().handle
);

routes.get(
  '/city/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findCityValidator,
  new FindCityController().handle
);

export default routes;
