import { Router } from 'express';

import {
  GetProjectsCoordinatesController,
  GetProjectsDataLocationController,
  GetProjectsDataTimelapseController,
  GetProjectsCoordinatesFromCityController,
  FindCategoriesController,
} from '../../data/controllers';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get(
  '/map/categories',
  authenticator,
  new FindCategoriesController().handle
);

routes.get(
  '/map/projects/coordinates',
  authenticator,
  new GetProjectsCoordinatesController().handle
);

routes.get(
  '/map/projects/timelapse',
  authenticator,
  new GetProjectsDataTimelapseController().handle
);

routes.get(
  '/map/projects/location',
  authenticator,
  new GetProjectsDataLocationController().handle
);

routes.get(
  '/map/projects/:id_city/coordinates',
  authenticator,
  new GetProjectsCoordinatesFromCityController().handle
);

export default routes;
