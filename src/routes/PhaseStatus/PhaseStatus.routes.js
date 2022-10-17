import { Router } from 'express';
import {
  FindPhaseStatusController,
  CreatePhaseStatusController,
  DeletePhaseStatusController,
  UpdatePhaseStatusController,
  FindPhasesStatusController,
} from '../../data/controllers';
import {
  findPhaseStatusValidator,
  createPhaseStatusValidator,
  deletePhaseStatusValidator,
  updatePhaseStatusValidator,
  findPhasesStatusValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/phaseStatus',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createPhaseStatusValidator,
  new CreatePhaseStatusController().handle
);

routes.delete(
  '/phaseStatus/:id_status',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deletePhaseStatusValidator,
  new DeletePhaseStatusController().handle
);

routes.patch(
  '/phaseStatus/:id_status',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updatePhaseStatusValidator,
  new UpdatePhaseStatusController().handle
);

routes.get(
  '/phaseStatus',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findPhasesStatusValidator,
  new FindPhasesStatusController().handle
);

routes.get(
  '/phaseStatus/:id_status',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findPhaseStatusValidator,
  new FindPhaseStatusController().handle
);

export default routes;
