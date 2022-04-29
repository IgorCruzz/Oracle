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
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/regions',
  authenticator,
  createRegionValidator,
  new CreateRegionController().handle
);

routes.delete(
  '/regions/:id',
  authenticator,
  deleteRegionValidator,
  new DeleteRegionController().handle
);

routes.patch(
  '/regions/:id',
  authenticator,
  updateRegionValidator,
  new UpdateRegionController().handle
);

routes.get(
  '/regions',
  authenticator,
  findRegionsValidator,
  new FindRegionsController().handle
);

routes.get(
  '/region/:id',
  authenticator,
  findRegionValidator,
  new FindRegionController().handle
);

export default routes;
