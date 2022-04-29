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

const routes = Router();

routes.post('/users', createUserValidator, new CreateUserController().handle);

routes.delete(
  '/users/:id_user',
  deleteUserValidator,
  new DeleteUserController().handle
);

routes.patch(
  '/users/:id_user',
  updateUserValidator,
  new UpdateUserController().handle
);

routes.get('/users', findUsersValidator, new FindUsersController().handle);

routes.get(
  '/user/:id_user',
  findUserValidator,
  new FindUserController().handle
);

export default routes;
