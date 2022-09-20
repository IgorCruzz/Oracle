import { Router } from 'express';

import {
  GetProjectsCoordinatesController,
  GetProjectsDataLocationController,
  GetProjectsDataTimelapseController,
  GetProjectsCoordinatesFromCityController,
} from '../../data/controllers';

const routes = Router();

routes.get(
  '/map/projects/coordinates',
  new GetProjectsCoordinatesController().handle
);

routes.get(
  '/map/projects/timelapse',
  new GetProjectsDataTimelapseController().handle
);

routes.get(
  '/map/projects/location',
  new GetProjectsDataLocationController().handle
);

routes.get(
  '/map/projects/:id_city/coordinates',
  new GetProjectsCoordinatesFromCityController().handle
);

export default routes;
