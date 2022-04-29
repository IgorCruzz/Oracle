import { Router } from 'express';
import {
  CreateRegionController,
  FindRegionsController,
  DeleteRegionController,
  UpdateRegionController,
  FindRegionController,
} from '../../data/controllers';
import {
  createRegionValidator,
  deleteRegionValidator,
  findRegionsValidator,
  updateRegionValidator,
  findRegionValidator,
} from '../../data/validators';

const routes = Router();

routes.post(
  '/regions',
  createRegionValidator,
  new CreateRegionController().handle
);

routes.delete(
  '/regions/:id',
  deleteRegionValidator,
  new DeleteRegionController().handle
);

routes.patch(
  '/regions/:id',
  updateRegionValidator,
  new UpdateRegionController().handle
);

routes.get(
  '/regions',
  findRegionsValidator,
  new FindRegionsController().handle
);

routes.get(
  '/region/:id',
  findRegionValidator,
  new FindRegionController().handle
);

export default routes;
