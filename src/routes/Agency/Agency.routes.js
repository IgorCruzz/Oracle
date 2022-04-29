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

const routes = Router();

routes.post(
  '/agencies',
  authenticator,
  createAgencyValidator,
  new CreateAgencyController().handle
);

routes.delete(
  '/agencies/:id',
  authenticator,
  deleteAgencyValidator,
  new DeleteAgencyController().handle
);

routes.patch(
  '/agencies/:id',
  authenticator,
  updateAgencyValidator,
  new UpdateAgencyController().handle
);

routes.get(
  '/agencies',
  authenticator,
  findAgenciesValidator,
  new FindAgenciesController().handle
);

routes.get(
  '/agency/:id',
  authenticator,
  findAgencyValidator,
  new FindAgencyController().handle
);

export default routes;
