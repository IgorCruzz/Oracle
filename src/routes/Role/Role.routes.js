import { Router } from 'express';
import {
  FindRoleController,
  FindRolesController,
  CreateRoleController,
  DeleteRoleController,
  UpdateRoleController,
} from '../../data/controllers';
import {
  findRoleValidator,
  createRoleValidator,
  deleteRoleValidator,
  updateRoleValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/roles',
  authenticator,
  createRoleValidator,
  new CreateRoleController().handle
);

routes.delete(
  '/roles/:id_role',
  authenticator,
  deleteRoleValidator,
  new DeleteRoleController().handle
);

routes.patch(
  '/roles/:id_role',
  authenticator,
  updateRoleValidator,
  new UpdateRoleController().handle
);

routes.get('/roles', authenticator, new FindRolesController().handle);

routes.get(
  '/role/:id_role',
  authenticator,
  findRoleValidator,
  new FindRoleController().handle
);

export default routes;
