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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0];

const routes = Router();

routes.post(
  '/regions',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createRegionValidator,
  new CreateRegionController().handle
);

routes.delete(
  '/regions/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteRegionValidator,
  new DeleteRegionController().handle
);

routes.patch(
  '/regions/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateRegionValidator,
  new UpdateRegionController().handle
);

routes.get(
  '/regions',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findRegionsValidator,
  new FindRegionsController().handle
);

routes.get(
  '/region/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findRegionValidator,
  new FindRegionController().handle
);

export default routes;
