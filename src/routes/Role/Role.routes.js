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

const routes = Router();

routes.post('/roles', createRoleValidator, new CreateRoleController().handle);

routes.delete(
  '/roles/:id_role',
  deleteRoleValidator,
  new DeleteRoleController().handle
);

routes.patch(
  '/roles/:id_role',
  updateRoleValidator,
  new UpdateRoleController().handle
);

routes.get('/roles', new FindRolesController().handle);

routes.get(
  '/role/:id_role',
  findRoleValidator,
  new FindRoleController().handle
);

export default routes;
