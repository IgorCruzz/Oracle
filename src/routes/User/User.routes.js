import { Router } from 'express';
import {
  FindUserController,
  FindUsersController,
  CreateUserController,
  DeleteUserController,
  UpdateUserController,
  ProvisoryPasswordController,
  CreatePasswordAndLoginController,
  UpdatePasswordController,
} from '../../data/controllers';
import {
  findUsersValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0];

const routes = Router();

routes.post('/users', createUserValidator, new CreateUserController().handle);

routes.post(
  '/users/newPassword',
  new CreatePasswordAndLoginController().handle
);

routes.post(
  '/users/:id_user/provisoryPassword',
  new ProvisoryPasswordController().handle
);

routes.delete(
  '/users/:id_user',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteUserValidator,
  new DeleteUserController().handle
);

routes.patch(
  '/user/changePassword',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  new UpdatePasswordController().handle
);

routes.patch(
  '/users/:id_user',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateUserValidator,
  new UpdateUserController().handle
);

routes.get(
  '/users',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findUsersValidator,
  new FindUsersController().handle
);

routes.get(
  '/user',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  new FindUserController().handle
);

export default routes;
