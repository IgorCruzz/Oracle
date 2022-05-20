import { Router } from 'express';
import {
  CreateAllocationController,
  DeleteAllocationController,
  UpdateAllocationController,
  FindAllocationsController,
  FindAllocationController,
} from '../../data/controllers';
import {
  findAllocationValidator,
  createAllocationValidator,
  updateAllocationValidator,
  deleteAllocationValidator,
  findAllocationsValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/allocations',
  authenticator,
  createAllocationValidator,
  new CreateAllocationController().handle
);

routes.delete(
  '/allocations/:id_allocation',
  authenticator,
  deleteAllocationValidator,
  new DeleteAllocationController().handle
);

routes.patch(
  '/allocations/:id_allocation',
  authenticator,
  updateAllocationValidator,
  new UpdateAllocationController().handle
);

routes.get(
  '/allocations',
  authenticator,
  findAllocationsValidator,
  new FindAllocationsController().handle
);

routes.get(
  '/allocation/:id_allocation',
  authenticator,
  findAllocationValidator,
  new FindAllocationController().handle
);

export default routes;
