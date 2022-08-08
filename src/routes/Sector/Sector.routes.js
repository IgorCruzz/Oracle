import { Router } from 'express';
import {
  FindSectorController,
  FindSectoriesController,
  CreateSectorController,
  DeleteSectorController,
  UpdateSectorController,
} from '../../data/controllers';
import {
  findSectorValidator,
  findSectoriesValidator,
  createSectorValidator,
  deleteSectorValidator,
  updateSectorValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0];

const routes = Router();

routes.post(
  '/sectories',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createSectorValidator,
  new CreateSectorController().handle
);

routes.delete(
  '/sectories/:id_sector',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteSectorValidator,
  new DeleteSectorController().handle
);

routes.patch(
  '/sectories/:id_sector',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateSectorValidator,
  new UpdateSectorController().handle
);

routes.get(
  '/sectories',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findSectoriesValidator,
  new FindSectoriesController().handle
);

routes.get(
  '/sector/:id_sector',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findSectorValidator,
  new FindSectorController().handle
);

export default routes;
