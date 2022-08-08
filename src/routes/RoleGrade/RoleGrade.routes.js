import { Router } from 'express';
import {
  FindRoleGradeController,
  FindRoleGradiesController,
  CreateRoleGradeController,
  DeleteRoleGradeController,
  UpdateRoleGradeController,
} from '../../data/controllers';
import {
  findRoleGradeValidator,
  findRoleGradiesValidator,
  deleteRoleGradeValidator,
  createRoleGradeValidator,
  updateRoleGradeValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0];

const routes = Router();

routes.post(
  '/roleGradies',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createRoleGradeValidator,
  new CreateRoleGradeController().handle
);

routes.delete(
  '/roleGradies/:id_role_grade',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteRoleGradeValidator,
  new DeleteRoleGradeController().handle
);

routes.patch(
  '/roleGradies/:id_role_grade',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateRoleGradeValidator,
  new UpdateRoleGradeController().handle
);

routes.get(
  '/roleGradies',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findRoleGradiesValidator,
  new FindRoleGradiesController().handle
);

routes.get(
  '/roleGrade/:id_role_grade',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findRoleGradeValidator,
  new FindRoleGradeController().handle
);

export default routes;
