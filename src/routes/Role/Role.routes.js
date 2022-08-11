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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0];

const routes = Router();

routes.post(
  '/roles',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createRoleValidator,
  new CreateRoleController().handle
);

routes.delete(
  '/roles/:id_role',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteRoleValidator,
  new DeleteRoleController().handle
);

routes.patch(
  '/roles/:id_role',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateRoleValidator,
  new UpdateRoleController().handle
);

routes.get(
  '/roles',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  new FindRolesController().handle
);

routes.get(
  '/role/:id_role',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findRoleValidator,
  new FindRoleController().handle
);

export default routes;
