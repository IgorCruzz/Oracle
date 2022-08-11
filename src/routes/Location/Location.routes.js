import { Router } from 'express';
import {
  FindLocationController,
  CreateLocationController,
  DeleteLocationController,
  FindLocationsController,
  UpdateLocationController,
} from '../../data/controllers';
import {
  findLocationValidator,
  findLocationsValidator,
  createLocationValidator,
  deleteLocationValidator,
  updateLocationValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1];

const routes = Router();

routes.post(
  '/locations',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createLocationValidator,
  new CreateLocationController().handle
);

routes.delete(
  '/locations/:id_location',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteLocationValidator,
  new DeleteLocationController().handle
);

routes.patch(
  '/locations/:id_location',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateLocationValidator,
  new UpdateLocationController().handle
);

routes.get(
  '/locations',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findLocationsValidator,
  new FindLocationsController().handle
);

routes.get(
  '/location/:id_location',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findLocationValidator,
  new FindLocationController().handle
);

export default routes;
