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

const routes = Router();

routes.post(
  '/projectPhases',
  authenticator,
  createProjectPhaseValidator,
  new CreateProjectPhaseController().handle
);

routes.delete(
  '/projectPhases/:id_project_phase',
  authenticator,
  deleteProjectPhaseValidator,
  new DeleteProjectPhaseController().handle
);

routes.patch(
  '/projectPhases/:id_project_phase',
  authenticator,
  updateProjectPhaseValidator,
  new UpdateProjectPhaseController().handle
);

routes.get(
  '/projectPhases',
  authenticator,
  findProjectPhasesValidator,
  new FindProjectPhasesController().handle
);

routes.get(
  '/projectPhase/:id_project_phase',
  authenticator,
  findProjectPhaseValidator,
  new FindProjectPhaseController().handle
);

export default routes;
