import { Router } from 'express';
import {
  FindUserController,
  FindUsersController,
  CreateUserController,
  DeleteUserController,
  UpdateUserController,
  ProvisoryPasswordController,
} from '../../data/controllers';
import {
  findUsersValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post('/users', createUserValidator, new CreateUserController().handle);

routes.post(
  '/users/:id_user/provisoryPassword',
  new ProvisoryPasswordController().handle
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

routes.get('/user', authenticator, new FindUserController().handle);

export default routes;
