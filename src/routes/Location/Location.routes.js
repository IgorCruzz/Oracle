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

const routes = Router();

routes.post(
  '/locations',
  createLocationValidator,
  new CreateLocationController().handle
);

routes.delete(
  '/locations/:id_location',
  deleteLocationValidator,
  new DeleteLocationController().handle
);

routes.patch(
  '/locations/:id_location',
  updateLocationValidator,
  new UpdateLocationController().handle
);

routes.get(
  '/locations',
  findLocationsValidator,
  new FindLocationsController().handle
);

routes.get(
  '/location/:id_location',
  findLocationValidator,
  new FindLocationController().handle
);

export default routes;
