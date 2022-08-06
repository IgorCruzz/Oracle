import { Router } from 'express';
import {
  CreateProjectController,
  DeleteProjectController,
  FindProjectController,
  FindProjectsController,
  UpdateProjectController,
  CreateCopyProjectController,
} from '../../data/controllers';
import {
  findProjectValidator,
  createProjectValidator,
  deleteProjectValidator,
  findProjectsValidator,
  updateProjectValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2, 3, 4];

const routes = Router();

routes.post(
  '/projectCopy/:id_project',
  createProjectValidator,
  new CreateCopyProjectController().handle
);

routes.post(
  '/projects',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createProjectValidator,
  new CreateProjectController().handle
);

routes.delete(
  '/projects/:id_project',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteProjectValidator,
  new DeleteProjectController().handle
);

routes.patch(
  '/projects/:id_project',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateProjectValidator,
  new UpdateProjectController().handle
);

routes.get(
  '/projects',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findProjectsValidator,
  new FindProjectsController().handle
);

routes.get(
  '/project/:id_project',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findProjectValidator,
  new FindProjectController().handle
);

export default routes;
