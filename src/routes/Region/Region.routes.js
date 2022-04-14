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

// Body name
routes.post(
  '/regions',
  createRegionValidator,
  new CreateRegionController().handle
);

// Param :id && Body name
routes.delete(
  '/regions/:id',
  deleteRegionValidator,
  new DeleteRegionController().handle
);

// Param :id && Body name
routes.patch(
  '/regions/:id',
  updateRegionValidator,
  new UpdateRegionController().handle
);

// Query ?limit &&  ?page
routes.get(
  '/regions',
  findRegionsValidator,
  new FindRegionsController().handle
);

// Param :id
routes.get(
  '/region/:id',
  findRegionValidator,
  new FindRegionController().handle
);

export default routes;
