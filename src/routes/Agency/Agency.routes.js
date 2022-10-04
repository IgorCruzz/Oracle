import { Router } from 'express';
import {
  FindAgenciesController,
  CreateAgencyController,
  DeleteAgencyController,
  UpdateAgencyController,
  FindAgencyController,
} from '../../data/controllers';
import {
  findAgenciesValidator,
  createAgencyValidator,
  deleteAgencyValidator,
  updateAgencyValidator,
  findAgencyValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/agencies',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createAgencyValidator,
  new CreateAgencyController().handle
);

routes.delete(
  '/agencies/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteAgencyValidator,
  new DeleteAgencyController().handle
);

routes.patch(
  '/agencies/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateAgencyValidator,
  new UpdateAgencyController().handle
);

routes.get(
  '/agencies',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findAgenciesValidator,
  new FindAgenciesController().handle
);

routes.get(
  '/agency/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findAgencyValidator,
  new FindAgencyController().handle
);

export default routes;
