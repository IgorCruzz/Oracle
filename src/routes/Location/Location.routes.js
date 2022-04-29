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

const routes = Router();

routes.post(
  '/locations',
  authenticator,
  createLocationValidator,
  new CreateLocationController().handle
);

routes.delete(
  '/locations/:id_location',
  authenticator,
  deleteLocationValidator,
  new DeleteLocationController().handle
);

routes.patch(
  '/locations/:id_location',
  authenticator,
  updateLocationValidator,
  new UpdateLocationController().handle
);

routes.get(
  '/locations',
  authenticator,
  findLocationsValidator,
  new FindLocationsController().handle
);

routes.get(
  '/location/:id_location',
  authenticator,
  findLocationValidator,
  new FindLocationController().handle
);

export default routes;
