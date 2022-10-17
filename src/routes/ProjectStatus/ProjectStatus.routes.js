import { Router } from 'express';
import {
  CreateProjectStatusController,
  FindProjectStatusController,
  DeleteProjectStatusController,
  UpdateProjectStatusController,
  FindProjectsStatusController,
} from '../../data/controllers';
import {
  findProjectStatusValidator,
  createProjectStatusValidator,
  deleteProjectStatusValidator,
  updateProjectStatusValidator,
  findProjectsStatusValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/projectStatus',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createProjectStatusValidator,
  new CreateProjectStatusController().handle
);

routes.delete(
  '/projectStatus/:id_status',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteProjectStatusValidator,
  new DeleteProjectStatusController().handle
);

routes.patch(
  '/projectStatus/:id_status',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateProjectStatusValidator,
  new UpdateProjectStatusController().handle
);

routes.get(
  '/projectStatus',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findProjectsStatusValidator,
  new FindProjectsStatusController().handle
);

routes.get(
  '/projectStatus/:id_status',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findProjectStatusValidator,
  new FindProjectStatusController().handle
);

export default routes;
