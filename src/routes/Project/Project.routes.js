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
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/projects',
  authenticator,
  createProjectValidator,
  new CreateProjectController().handle
);

routes.delete(
  '/projects/:id_project',
  authenticator,
  deleteProjectValidator,
  new DeleteProjectController().handle
);

routes.patch(
  '/projects/:id_project',
  authenticator,
  updateProjectValidator,
  new UpdateProjectController().handle
);

routes.get(
  '/projects',
  authenticator,
  findProjectsValidator,
  new FindProjectsController().handle
);

routes.get(
  '/project/:id_project',
  authenticator,
  findProjectValidator,
  new FindProjectController().handle
);

export default routes;
