import { Router } from 'express';

import {
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

export default routes;
