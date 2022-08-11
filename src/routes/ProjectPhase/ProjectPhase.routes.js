import { Router } from 'express';
import {
  FindProjectPhaseController,
  FindProjectPhasesController,
  CreateProjectPhaseController,
  DeleteProjectPhaseController,
  UpdateProjectPhaseController,
} from '../../data/controllers';
import {
  findProjectPhaseValidator,
  findProjectPhasesValidator,
  createProjectPhaseValidator,
  deleteProjectPhaseValidator,
  updateProjectPhaseValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1];

const routes = Router();

routes.post(
  '/projectPhases',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createProjectPhaseValidator,
  new CreateProjectPhaseController().handle
);

routes.delete(
  '/projectPhases/:id_project_phase',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteProjectPhaseValidator,
  new DeleteProjectPhaseController().handle
);

routes.patch(
  '/projectPhases/:id_project_phase',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateProjectPhaseValidator,
  new UpdateProjectPhaseController().handle
);

routes.get(
  '/projectPhases',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findProjectPhasesValidator,
  new FindProjectPhasesController().handle
);

routes.get(
  '/projectPhase/:id_project_phase',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findProjectPhaseValidator,
  new FindProjectPhaseController().handle
);

export default routes;
