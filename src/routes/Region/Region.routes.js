import { Router } from 'express';
import {
  CreateRegionController,
  FindRegionController,
  DeleteRegionController,
  UpdateRegionController,
} from '../../data/controllers';
import {
  createRegionValidator,
  deleteRegionValidator,
  findRegionsValidator,
  updateRegionValidator,
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
routes.get('/regions', findRegionsValidator, new FindRegionController().handle);

export default routes;
