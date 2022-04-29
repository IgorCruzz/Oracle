import { Router } from 'express';
import {
  FindUserController,
  FindUsersController,
  CreateUserController,
  DeleteUserController,
  UpdateUserController,
} from '../../data/controllers';
import {
  findUserValidator,
  findUsersValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/users',
  authenticator,
  createUserValidator,
  new CreateUserController().handle
);

routes.delete(
  '/users/:id_user',
  authenticator,
  deleteUserValidator,
  new DeleteUserController().handle
);

routes.patch(
  '/users/:id_user',
  authenticator,
  updateUserValidator,
  new UpdateUserController().handle
);

routes.get(
  '/users',
  authenticator,
  findUsersValidator,
  new FindUsersController().handle
);

routes.get(
  '/user/:id_user',
  authenticator,
  findUserValidator,
  new FindUserController().handle
);

export default routes;
