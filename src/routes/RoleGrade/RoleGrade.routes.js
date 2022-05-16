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

const routes = Router();

routes.post(
  '/roleGradies',
  authenticator,
  createRoleGradeValidator,
  new CreateRoleGradeController().handle
);

routes.delete(
  '/roleGradies/:id_role_grade',
  authenticator,
  deleteRoleGradeValidator,
  new DeleteRoleGradeController().handle
);

routes.patch(
  '/roleGradies/:id_role_grade',
  authenticator,
  updateRoleGradeValidator,
  new UpdateRoleGradeController().handle
);

routes.get(
  '/roleGradies',
  authenticator,
  findRoleGradiesValidator,
  new FindRoleGradiesController().handle
);

routes.get(
  '/roleGrade/:id_role_grade',
  authenticator,
  findRoleGradeValidator,
  new FindRoleGradeController().handle
);

export default routes;
