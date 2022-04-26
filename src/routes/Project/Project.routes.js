import { Router } from 'express';
import {
  CreateProjectController,
  DeleteProjectController,
  FindProjectController,
  FindProjectsController,
  UpdateProjectController,
} from '../../data/controllers';
import {
  findProjectValidator,
  createProjectValidator,
  deleteProjectValidator,
  findProjectsValidator,
  updateProjectValidator,
} from '../../data/validators';

const routes = Router();

routes.post(
  '/projects',
  createProjectValidator,
  new CreateProjectController().handle
);

routes.delete(
  '/projects/:id_project',
  deleteProjectValidator,
  new DeleteProjectController().handle
);

routes.patch(
  '/projects/:id_project',
  updateProjectValidator,
  new UpdateProjectController().handle
);

routes.get(
  '/projects',
  findProjectsValidator,
  new FindProjectsController().handle
);

routes.get(
  '/project/:id_project',
  findProjectValidator,
  new FindProjectController().handle
);

export default routes;
