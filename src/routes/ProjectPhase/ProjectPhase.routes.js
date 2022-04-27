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

const routes = Router();

routes.post(
  '/projectPhases',
  createProjectPhaseValidator,
  new CreateProjectPhaseController().handle
);

routes.delete(
  '/projectPhases/:id_project_phase',
  deleteProjectPhaseValidator,
  new DeleteProjectPhaseController().handle
);

routes.patch(
  '/projectPhases/:id_project_phase',
  updateProjectPhaseValidator,
  new UpdateProjectPhaseController().handle
);

routes.get(
  '/projectPhases',
  findProjectPhasesValidator,
  new FindProjectPhasesController().handle
);

routes.get(
  '/projectPhase/:id_project_phase',
  findProjectPhaseValidator,
  new FindProjectPhaseController().handle
);

export default routes;
