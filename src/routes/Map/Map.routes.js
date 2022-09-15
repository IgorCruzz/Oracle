import { Router } from 'express';

import {
  GetProjectsController,
  GetProjectsCoordinatesController,
  GetProjectsDataLocationController,
  GetProjectsDataTimelapseController,
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

routes.get('/map/projects', new GetProjectsController().handle);

export default routes;
